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


def process_tracks(tracks):
    for i, t in enumerate(tracks):
        print(' Track: ', i, t['name'])


def get_tracks_by_year(years=[2018]):
    year_list = []
    if type(years) == int:
        year_list = [years]
    elif type(years) == list:
        year_list = years

    print('Init requests ...')

    for year in year_list:
        query = 'year:{}'.format(year)
        results = sp.search(q=query, type='track', limit=20)

        tracks = results['tracks']
        process_tracks(tracks['items'])

        while tracks['next']:
            results = sp.next(tracks)
            tracks = results['tracks']
            process_tracks(tracks['items'])


get_tracks_by_year(2017)
