-- Drop table if it exists for IMDb datasets
DROP TABLE IF EXISTS IMDB_name_basics;
DROP TABLE IF EXISTS IMDB_title_akas;
DROP TABLE IF EXISTS IMDB_title_basics;
DROP TABLE IF EXISTS IMDB_title_crew;
DROP TABLE IF EXISTS IMDB_title_episode;
DROP TABLE IF EXISTS IMDB_title_principals;
DROP TABLE IF EXISTS IMDB_title_ratings;


-- Create tables for IMDb datasets
CREATE TABLE IMDB_name_basics (
    nconst VARCHAR(20) PRIMARY KEY,
    primaryName VARCHAR(255),
    birthYear INT,
    deathYear INT,
    primaryProfession VARCHAR(255),
    knownForTitles TEXT
);

CREATE TABLE IMDB_title_akas (
    titleId VARCHAR(20),
    ordering INT,
    title VARCHAR(255),
    region VARCHAR(10),
    language VARCHAR(10),
    types VARCHAR(255),
    attributes VARCHAR(255),
    isOriginalTitle BOOLEAN,
    PRIMARY KEY (titleId, ordering)
);

CREATE TABLE IMDB_title_basics (
    tconst VARCHAR(20) PRIMARY KEY,
    titleType VARCHAR(255),
    primaryTitle VARCHAR(255),
    originalTitle VARCHAR(255),
    isAdult BOOLEAN,
    startYear INT,
    endYear INT,
    runtimeMinutes INT,
    genres VARCHAR(255)
);
select * from IMDB_title_basics;
CREATE TABLE IMDB_title_crew (
    tconst VARCHAR(20) PRIMARY KEY,
    directors TEXT,
    writers TEXT
);

CREATE TABLE IMDB_title_episode (
    tconst VARCHAR(20) PRIMARY KEY,
    parentTconst VARCHAR(20),
    seasonNumber INT,
    episodeNumber INT
);

CREATE TABLE IMDB_title_principals (
    tconst VARCHAR(20),
    ordering INT,
    nconst VARCHAR(20),
    category VARCHAR(255),
    job VARCHAR(255),
    characters TEXT,
    PRIMARY KEY (tconst, ordering)
);

CREATE TABLE IMDB_title_ratings (
    tconst VARCHAR(20) PRIMARY KEY,
    averageRating FLOAT,
    numVotes INT
);
