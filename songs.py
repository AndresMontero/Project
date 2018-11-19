# import gov.llnl.spark.hdf._

from pyspark.sql import *
from pyspark.sql.functions import *
from pyspark.sql.functions import min

from pyspark.sql import SparkSession, SQLContext
from pyspark import SparkConf, SparkContext


spark = SparkSession.builder.getOrCreate()
sc = spark.sparkContext
sql_context = SQLContext(sc)

DATA_DIR = '/datasets/million-song_untar/A/A/A/'

# songs = sql_context.read.hdf5('hdfs://{dir}{name}'.format(dir=DATA_DIR, name='TRAAAAK128F9318786.h5'))
songs = SQLContext.read.format('gov.llnl.spark.hdf').load('hdfs://{dir}{name}'.format(dir=DATA_DIR, name='TRAAAAK128F9318786.h5'))

# Information of the dataset
print('Number of songs: ')
print(songs.count())
print(songs.take(10))
