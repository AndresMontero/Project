# -*- coding: utf-8 -*-

import sys

from pyspark.sql import *
from pyspark.sql.functions import *
from pyspark.sql.functions import min

from pyspark.sql import SparkSession
from pyspark import SparkConf, SparkContext

spark = SparkSession.builder.getOrCreate()
sc = spark.sparkContext

sys.stdout = open(sys.stdout.fileno(), mode='w', encoding='utf8', buffering=1)

DATA_DIR = '/datasets/twitter_internetarchive/2017/06/16/00/'

posts = spark.read.json('hdfs://{dir}{name}'.format(dir=DATA_DIR, name='*'))

# Information of the dataset
print(posts.show(10))