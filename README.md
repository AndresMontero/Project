# Music Evolution: 2000's forward

Link to Data Story:  https://andresmontero.github.io/Project_ADA_2018/

Main jupyter notebook: [main.ipynb]( https://github.com/AndresMontero/Project_ADA_2018/blob/master/src/main.ipynb)

## Abstract
Music is a crucial element of everyday life and human culture. People spend several hours listening to it and lots of money acquiring it. “… Whenever people come together for any reason, music is there,”….weddings, funerals, birthdays, graduations, stadium sporting events, nightlife, prayer, a romantic dinner, mothers singing their infants to sleep and EPFL students studying with music as a background….” History tells that very early man developed primitive flutes from animal bones and used stones and wood as percussion, producing the first types of music. Voice would have been the first and most natural means of expression in our distant ancestors, used to bond socially or comfort a sleepless child. It is from these humble beginnings that the music we enjoy today evolved.

Why is music so important? Because it is a way to communicate with others through songs and melody and convey people's emotions. Music has always been present in every culture around the world, representing their essence, feelings, and beliefs. Music is never stagnant and continues to change and evolve in each time period, where people's preferences behave differently in terms of genres, artists and songs, and this behavior is closely linked with music accessibility. We're now deep in the digital era, with the explosion of the internet, and music Services as Apple Music, Spotify, Tidal and other apps and platforms; it has become easier to share, obtain and have instant access to huge collections of songs. This project aims to analyze the evolution of music since the 2000s in terms of songs/genres/artists popularity and preferences, evaluate the key features of the songs, such as energy, valence, danceability, and others. We aim to show and understand which were the most popular genres in the last years, the most popular songs, the most important artists and what were the trends of the key features of those hits.

For this purpose, we'll work with two datasets:

* FMA: A Dataset For Music Analysis
* Our crawled dataset created using Spotify and LastFM API


## Research questions

The questions we would like to address are:
* How did music/genre/artists preferences evolve in the last decade?
* Do preferred songs/artists (e.g. top 10) for a given year have any similarities in terms of genre, song’s features or others? Or do they completely differ from each other?
* How do song features such as valence/energy/danceability relate to each other? Do they depend on the genre of the songs?
* How do song features such as valence/energy/danceability vary during the year? Do they have any correlation with the season of the year? How do such features vary over the years?
* Are genre/songs popularity related to any specific event or events occurring in the world during the last decade?
* What is the effect/impact of music streaming services on music preferences/popularity?


## Dataset

#### FMA Songs.

1. Exploration and cleaning of data, to find if there are problems with the data so that we can handle them.
2. Deal with missing values and decide whether it is convenient to remove them or treat them in a different way.

#### Spotify and LastFM API

1. Obtain more data from the last years so that we can compare with the FMA dataset.
2. Exploration and cleaning of data, to find if there are problems with the data so that we can handle them.



## Contribution of Group Members
* __Ariel Alba:__ data cleaning, preliminary data analysis, K-means clustering, website creation and visualizations, APIs data collection
* __Andres Montero:__ dataset cleaning, data story, cleaning and merging, visualizations, js and HTML code, topic analysis
* __Diego Iriarte:__ data story, visualizations, data exploration, topic analysis



## Project Structure

The project has the following structure:

* /
* [main.ipynb]( https://github.com/AndresMontero/Project_ADA_2018/blob/master/src/main.ipynb) 
* Main notebook with all the statistics and analysis regarding FMA 
* [data cleaning.ipynb](https://github.com/AndresMontero/Project_ADA_2018/blob/master/src/data_cleaning.ipynb)
* Notebook with all the cleaning and data preprocessing
* [helpers.py](https://github.com/AndresMontero/Project_ADA_2018/blob/master/src/helpers.py)
* Helper methods: comparison methods
* README.md
* Readme of the project
* spotify.py
* Script to gather data from Spotify and LastFM API
* [data/](https://drive.google.com/drive/folders/167qwb1R_FTpEyS3RYS3yyxfetq7ByCY8)
* Folder with all datasets and pickle saved dataframes

## Contributing

To contribute, look at the project structures, it has files and roles of files well defined. 

In order to reuse the code, those files can be updated with new methods that correspond 
to the same class as the file.

## Authors

* **Andres Montero**
* **Ariel Alba**
* **Diego Iriarte**



