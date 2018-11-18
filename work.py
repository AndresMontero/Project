from pyspark.sql import *
from pyspark.sql.functions import *
from pyspark.sql.functions import min

from pyspark.sql import SparkSession
from pyspark import SparkConf, SparkContext

spark = SparkSession.builder.getOrCreate()
sc = spark.sparkContext

DATA_DIR = '/datasets/twitter_internetarchive/2017/06/16/00/'

posts = spark.read.json('hdfs://{dir}{name}'.format(dir=DATA_DIR, name='31.json.bz2'))

# Information of the dataset
print('TEST: ')
print(posts.count())
print(posts.take(10))
