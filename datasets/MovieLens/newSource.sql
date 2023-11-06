-- Drop MovieLens database tables if they exist
DROP TABLE IF EXISTS newSource_tags;
DROP TABLE IF EXISTS newSource_rating;
DROP TABLE IF EXISTS newSource_movie;


-- Create Table for Movies
CREATE TABLE newSource_movie (
    movieId INT PRIMARY KEY,
    title VARCHAR(255),
    genres VARCHAR(255)
);

-- Create Table for Ratings
CREATE TABLE newSource_rating (
    userId INT,
    movieId INT,
    rating FLOAT,
    timestamp INT,
    PRIMARY KEY (userId, movieId)
   
);

-- Create Table for Tags
CREATE TABLE newSource_tags (
    userId INT,
    movieId INT,
    tag VARCHAR(255),
    timestamp INT,
    PRIMARY KEY (userId, movieId, tag)
   
);
