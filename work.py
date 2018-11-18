import re
import pandas as pd
import numpy as np
import dateutil.parser
import time
import matplotlib
import matplotlib.pyplot as plt
from random import randint
%matplotlib inline

import findspark
findspark.init()

from pyspark.sql import *
from pyspark.sql.functions import *
from pyspark.sql.functions import min

from pyspark.sql import SparkSession
from pyspark import SparkConf, SparkContext

spark = SparkSession.builder.getOrCreate()
sc = spark.sparkContext

from datetime import datetime, date
import seaborn as sns
from pyspark.sql.functions import array_contains

DATA_DIR = '/datasets/twitter_internetarchive/2017/06/16/00/'


posts = spark.read.json(DATA_DIR + '*')

# Information of the dataset
posts.show(10)