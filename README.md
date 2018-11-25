# “Politics - can you listen?”

## Abstract

The first idea of this project was to work on two different datasets: Million-Song and Twitter, 
and with them try to find out the relation between the depression state of a user with 
the kind of music he shares on social media. However, we found a big problem with this 
approach: how to identify depression on a tweet?.
After discussing with the TAs the idea to change to: which music is associated with 
positive sentiments and sharing positive and uplifting messages on social media. 
However, we encountered the following problems: 

1. Music dataset, it was decided to change from Million-Song dataset to FMA: A Dataset 
For Music Analysis because the later provide more organized information and 
fits better for our analysis purposes.
2. Twitter dataset contained on the cluster does not have labeled data for a possible 
classification into positive/negative tweets, to tackle this issue we decided to use 
labeled data from Kaggle. The new tweet dataset is called Sentiment140, this dataset 
contains 1.6 million tweets.
3. Relate both datasets, find tweets which are linked somehow to music and/or songs. 
The main idea was to find the number of tweets which have a links to songs or have 
the word spotify. The percentage of tweets related to music(spotify) is too low, 0.017% 
fo the total dataset which is the main reason of why this idea is not feasible.

Due to the infeasibility of the initial proposal, we redefined the project and decided 
to focus uniquely on FMA dataset and relate its information with an important event 
of the past years. The new project idea aims to find out the relation of music 
production in terms of genres, energy, danceability and people’s preference with one 
of the major political events of the past years which is 2016 US Election and Donald Trump 
becoming president. We will compare what type of music (genre, energy, danceability, etc)
people listened/produced on the years 2012-2016 ( Pre-Trump) and what people listen 
on 2017-2018, in that sense we would like to also find the trend of what type of music
people will listen in the following years by applying machine learning techniques for
prediction analysis.
For this new approach the datasets that we will be using are ‘FMA songs’ and we will complete/update this dataset with music information from Spotify API and LastFM  API for the last years.


## Research questions

A list of research questions you would like to address during the project.
The questions we would like to address are:

* How reliable are the indicators of “Energy” and  “Valence” of the tracks?
* How did the music evolve throughout in the last decade in terms of genres’ preferences?.
* What are the different genres of music that are the closest related to the political events?
* Does this ‘important’ political event impact music preferences of people? Does it impact the release of new music (differs in terms of genre)?
* What kind (genre) of music will be listened in the following years?

## Dataset

* #### FMA Songs.

1. Exploration and cleaning of data, to find if there are problems with the data 
so that we can handle them.
2. Deal with missing values and decide whether it is convenient to remove them or 
treat them in a different way.

* #### Spotify and LastFM API

1. Obtain more data from the last years so that we can compare with the pre_trump dataset.
2. Exploration and cleaning of data, to find if there are problems with the data so that 
we can handle them.


## A list of internal milestones up until project milestone 3

1. Find insights from FMA dataset: relate variables and understand their behaviour before and after event intervals.
2. Structure Spotify and LastFM data as FMA dataset.
3. Prepare the results for the visualizations.
4. Present the results on a github-page.
5. Prepare the report of the project

## Questions for TAa

Add here some questions you have for us, in general, or project-specific.
Does this project correspond to the “social good “topic?

1. Is the project on the right track? Is it possible to achieve/complete before the 
project deadline?
2. Since we have many missing values, our dataset reduces considerably (e.g. 50%). 
How big should the reduced dataset remain to still consider it as representative?
3. In case we don’t find any effect/relation of this ‘big’ political event with
 music preferences/production, what should we present?
 
## Project Structure

The project has the following structure:

* /
    * main.ipynb
        * Main notebook with all the statistics and analysis regarding FMA and tweets
    * helpers.py 
        * Helper methods: comparison methods
    * README.md
        * Readme of the project
    * spotify.py
        * Script to gather data from Spotify and LastFM API
    * tweets.ipynb
        * Notebook for tweets analysis, just code.
    * tweets.py
        * File to access to tweets dataset on DLAB cluster, for the first approach
    * data/
        * Folder with all datasets and pickle saved dataframes
    
## Contributing

To contribute, look at the project structures, it has files and roles of files well defined. 
In order to reuse the code, those files can be updated with new methods that correspond 
to the same class as the file.

## Authors

* **Andres Montero**
* **Ariel Alba**
* **Diego Iriarte**


