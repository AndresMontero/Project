import spotipy
import pylast
import pandas as pd
import os.path
import sys
import numpy as np

from spotipy.oauth2 import SpotifyClientCredentials


# Spotify
CLIENT_ID = '4597ea42ab0e4966977010f9b2eda1f8'
CLIENT_SECRET = '69f51248d8b84dc9971615219d07f2d7'

# LastFm
API_KEY = "285a47efb6ec196a0ecae711a45e65ce"
API_SECRET = "53ac03181c2a988507eb15d15268917c"

DATA_DIR = './data/'
MUSIC_DIR = '{dir}{file}/'.format(dir=DATA_DIR,
                                  file='fma_metadata')
PKL_DIR = '{dir}{file}/'.format(dir=DATA_DIR,
                               file='pkl')

client_credentials_manager = SpotifyClientCredentials(client_id=CLIENT_ID,
                                                      client_secret=CLIENT_SECRET)

sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

lastfm = pylast.LastFMNetwork(api_key=API_KEY, api_secret=API_SECRET)

TRACK_ATTRS = ['track_id', 'track_title',
               'track_duration', 'artist_id',
               'album_id', 'track_genre_top',
               'track_genres_all','track_language',
               'track_listens', 'track_tags',
               'danceability', 'energy',
               'valence', 'song_currency',
               'song_hotness']

TRACK_SPOTI_ATTRS = TRACK_ATTRS + ['spoti_track_id', 'spoti_album_id',
                                  'spoti_artist_id']

ALBUM_ATTRS = ['album_id', 'album_date_created',
               'album_date_released', 'album_title',
               'album_listens']

ALBUM_SPOTI_ATTRS = ALBUM_ATTRS + ['spoti_album_id']

ARTIST_ATTRS = ['artist_id', 'artist_name_x',
                'artist_latitude_x', 'artist_longitude_x',
                'artist_discovery', 'artist_family',
                'artist_hotness', 'artist_latitude_y',
                'artist_longitude_y', 'artist_name_y']

ARTIST_SPOTI_ATTR = ARTIST_ATTRS + ['spoti_artist_id']

SAVE_EVERY = 2


def load_dataframes():
    # Load pandas datasets
    genres_df_path = '{dir}{file}'.format(dir=PKL_DIR,
                                          file='genres_df.pkl')
    albums_df_path = '{dir}{file}'.format(dir=PKL_DIR,
                                          file='albums_df.pkl')
    artists_df_path = '{dir}{file}'.format(dir=PKL_DIR,
                                           file='artists_df.pkl')
    tracks_df_path = '{dir}{file}'.format(dir=PKL_DIR,
                                          file='tracks_df.pkl')

    if os.path.exists(genres_df_path):
        genres_df = pd.read_pickle(genres_df_path)
    else:
        print('There is no genres pandas data')

    if os.path.exists(albums_df_path):
        albums_df = pd.read_pickle(albums_df_path)
    else:
        print('There is no albums pandas data')

    if os.path.exists(artists_df_path):
        artists_df = pd.read_pickle(artists_df_path)
    else:
        print('There is no artist pandas data')

    if os.path.exists(tracks_df_path):
        tracks_df = pd.read_pickle(tracks_df_path)
    else:
        print('There is no tracks pandas data')

    return tracks_df, albums_df, artists_df, genres_df


def process_tracks(tracks, album_id, year, n_track):
    for i, track in enumerate(tracks):
        try:
            track = sp.track(track['id'])
            track_feat = sp.audio_features(track['id'])[0]
            album = sp.album(album_id)
            artist = sp.artist(track['artists'][0]['id'])

            try:
                track_fm = lastfm.get_track(artist['name'], track['name'])
                album_fm = lastfm.get_album(artist['name'], album['name'])
                track_listens = track_fm.get_playcount()
                album_listens = album_fm.get_playcount()
                track_tags = [str(x.item) for x in track_fm.get_top_tags()]

            except pylast.WSError as err:
                print(err)
                if 'album' in str(err).lower():
                    album_listens = np.nan
                else:
                    track_listens = np.nan
                    track_tags = []
                pass

            album_already_exist = dfs[year]['albums']['spoti_album_id'].isin([album['id']]).any()

            old_artist = fma_artists_df[fma_artists_df['artist_name_y'] == artist['name']]['artist_id']
            new_artist = dfs[year]['artists'][dfs[year]['artists']['artist_name_y'] == artist['name']]['spoti_artist_id']

            if old_artist.count() > 0:
                artist_id = old_artist.iloc[0]
            elif new_artist.count() > 0:
                artist_id = new_artist.iloc[0]
            else:
                artist_id = artist['id']

            artist_already_exist = fma_artists_df['artist_name_y'].isin([artist['name']]).any() or \
               dfs[year]['artists']['spoti_artist_id'].isin([artist['id']]).any()

            track_dict = {'track_id': track['id'], 'track_title': track['name'],
                          'track_duration': track['duration_ms'], 'artist_id': artist_id,
                          'album_id': album['id'], 'track_genres_all': album['genres'],
                          'track_listens': track_listens, 'track_tags': track_tags,
                          'danceability': track_feat['danceability'], 'energy': track_feat['energy'],
                          'valence': track_feat['valence'], 'song_hotness': track['popularity'],
                          'spoti_track_id': track['id'], 'spoti_album_id': album['id'],
                          'spoti_artist_id': artist['id']}
            dfs[year]['tracks'] = dfs[year]['tracks'].append([track_dict], ignore_index=True, sort=False)

            if album and not album_already_exist:
                album_dict = {'album_id': album['id'],
                              'album_date_released': album['release_date'],
                              'album_title': album['name'], 'album_listens': album_listens,
                              'spoti_album_id': album['id']}
                dfs[year]['albums'] = dfs[year]['albums'].append([album_dict], ignore_index=True, sort=False)

            if artist and not artist_already_exist:
                artist_dict = {'spoti_artist_id': artist['id'], 'artist_id': artist['id'],
                               'artist_hotness': artist['popularity'],
                               'artist_name_y': artist['name']}
                dfs[year]['artists'] = dfs[year]['artists'].append([artist_dict], ignore_index=True, sort=False)

            n_track += 1

        except:
            print('Unexpected error:', sys.exc_info()[0])
            pass

    return n_track


def save_data(year, n_album, n_track):
    print('{year} - Process album #{album} - Stored track #{track}'.format(year=year,
                                                                           album=n_album,
                                                                           track=n_track))

    dfs[year]['tracks'].to_pickle('{dir}tracks_{year}_df.pkl'.format(dir=PKL_DIR,
                                                                     year=year))
    dfs[year]['albums'].to_pickle('{dir}albums_{year}_df.pkl'.format(dir=PKL_DIR,
                                                                     year=year))
    dfs[year]['artists'].to_pickle('{dir}artists_{year}_df.pkl'.format(dir=PKL_DIR,
                                                                       year=year))


def process_albums(albums, year, n_album, n_track):
    for i, album in enumerate(albums):
        tracks = sp.album_tracks(album['id'], limit=20)
        n_track = process_tracks(tracks['items'], album['id'], year, n_track)

        while tracks['offset'] <= 9980 and tracks['next']:
            tracks = sp.next(tracks)
            n_track = process_tracks(tracks['items'], album['id'], year, n_track)

        n_album += 1

        if n_album % SAVE_EVERY == 0:
            save_data(year, n_album, n_track)

    return n_album, n_track


def get_tracks_by_year(years=[2018], offset=0):
    year_list = []
    if type(years) == int:
        year_list = [years]
    elif type(years) == list:
        year_list = years

    print('Init requests ...')

    for year in year_list:
        n_track = 0
        n_album = 0
        dfs[year] = {'tracks': pd.DataFrame(columns=TRACK_SPOTI_ATTRS),
                     'albums': pd.DataFrame(columns=ALBUM_SPOTI_ATTRS),
                     'artists': pd.DataFrame(columns=ARTIST_SPOTI_ATTR)}

        query = 'year:{}'.format(year)
        results = sp.search(q=query, type='album', limit=20, offset=offset)

        albums = results['albums']
        n_album, n_track = process_albums(albums['items'], year, n_album, n_track)

        while albums['offset'] <= 9980 and albums['next']:
            results = sp.next(albums)
            albums = results['albums']
            n_album, n_track = process_albums(albums['items'], year, n_album, n_track)

        print('FINAL')
        save_data(year, n_album, n_track)
        print('')


dfs = {}
fma_tracks_df, fma_albums_df, fma_artists_df, fma_genres_df = load_dataframes()
get_tracks_by_year([2017, 2018])

