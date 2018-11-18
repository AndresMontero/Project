# -*- coding: utf-8 -*-

from pyspark.sql import *
from pyspark.sql.functions import *
from pyspark.sql.functions import min

from pyspark.sql import SparkSession
from pyspark import SparkConf, SparkContext

import sys

print(sys.stdout.encoding)

spark = SparkSession.builder.getOrCreate()
sc = spark.sparkContext

DATA_DIR = '/datasets/twitter_internetarchive/2017/06/16/00/'

posts = spark.read.json('hdfs://{dir}{name}'.format(dir=DATA_DIR, name='*'))

# Information of the dataset
print(posts.show(10))