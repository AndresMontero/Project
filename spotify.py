import spotipy
import pandas as pd
import numpy as np
import os.path

from helpers import *
from datetime import datetime, date, time
from spotipy.oauth2 import SpotifyClientCredentials


CLIENT_ID = '4597ea42ab0e4966977010f9b2eda1f8'
CLIENT_SECRET = '69f51248d8b84dc9971615219d07f2d7'

DATA_DIR = './data/'
MUSIC_DIR = '{dir}{file}/'.format(dir=DATA_DIR,
                                  file='fma_metadata')
PKL_DIR = '{dir}{file}/'.format(dir=DATA_DIR,
                               file='pkl')

client_credentials_manager = SpotifyClientCredentials(client_id=CLIENT_ID,
                                                      client_secret=CLIENT_SECRET)

sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

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

track_artist = tracks_df.merge(artists_df,
                               left_on='artist_id',
                               right_on='artist_id')

track_artist_album = track_artist.merge(albums_df,
                                        left_on='album_id',
                                        right_on='album_id')

name_comp = not_eq_ign_case(track_artist_album['artist_name_x'],
                            track_artist_album['artist_name_y'])

no_sent_comp = tracks_df['danceability'].isna() | tracks_df['energy'].isna() | tracks_df['valence'].isna()

track_artist_no_sent = tracks_df[no_sent_comp].merge(artists_df,
                                                     left_on='artist_id',
                                                     right_on='artist_id')

track_artist_album_no_sent = track_artist_no_sent[no_sent_comp].merge(albums_df,
                                                                      left_on='album_id',
                                                                      right_on='album_id')

artist_name_diff = track_artist_album[name_comp]

found = 0

print('Init requests ...')

for index, row in track_artist_album_no_sent.iterrows():
    name = row['track_title']
    query = 'name:{}'.format(name)
    artist_name = row['artist_name_y']
    album_name = row['album_title']

    if type(artist_name) == str and len(artist_name) > 0:
        query = '{query} artist:{name}'.format(query=query, name=artist_name)

    # if type(album_name) == str and len(album_name) > 0:
    #     query = '{query} album:{name}'.format(query=query, name=album_name)

    # print('Query: {}'.format(query))

    results = sp.search(q=query, type='track')

    if len(results['tracks']['items']) > 0:
        found += 1

    for i, t in enumerate(results['tracks']['items']):
        print(' Track: ', i, t['name'])

    if found != 0 and found % 5 == 0:
        print('Found: ', found)

print('Found: ', found)

