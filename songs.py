#USING FMA datasets

import pandas as pd
import numpy as np

from pyspark.sql import *
from pyspark.sql.functions import *
from pyspark.sql.functions import min

from pyspark.sql import SparkSession, SQLContext
from pyspark import SparkConf, SparkContext

spark = SparkSession.builder.getOrCreate()
sc = spark.sparkContext
sql_context = SQLContext(sc)


DATA_DIR = './data/fma_metadata'


# songs = sql_context.read.format('gov.llnl.spark.hdf') \
#           .option('dataset', './data') \
#           .load('{spe}{dir}{name}'.format(spe=SPE, dir=DATA_DIR,
#                                           name='TRAAAVO128F93133D4.h5'))

# songs = sc.textFile('data/titles.csv') \
#             .map(lambda line: line.strip().split('|')) \
#             .filter(lambda r: len(r) == 9)

# songs = h5.File('{spe}{dir}{name}'.format(spe=SPE, dir=DATA_DIR,
#                                           name='TRAAAAW128F429D538.h5'), 'r')
#
# for key in songs.keys():
#     print(key)
#
#     group = songs[key]

    #Checkout what keys are inside that group.
#     for key in group.keys():
#         print('\t {}'.format(key))
# print(songs['metadata']['songs'].value)
#
# h5 = hdf5_getters.open_h5_file_read('{spe}{dir}{name}'.format(spe=SPE, dir=DATA_DIR,
#                                                               name='TRAAAAW128F429D538.h5'))
# duration = hdf5_getters.get_duration(h5)

# Information of the dataset
# print('Number of songs: ')
# print(songs.count())
# print(songs.take(10))
