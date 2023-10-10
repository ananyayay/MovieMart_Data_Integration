-- Drop MovieLens database tables if they exist
DROP TABLE IF EXISTS MovieLens_tags;
DROP TABLE IF EXISTS MovieLens_rating;
DROP TABLE IF EXISTS MovieLens_movie;


-- Create Table for Movies
CREATE TABLE MovieLens_movie (
    movieId INT PRIMARY KEY,
    title VARCHAR(255),
    genres VARCHAR(255)
);

-- Create Table for Ratings
CREATE TABLE MovieLens_rating (
    userId INT,
    movieId INT,
    rating FLOAT,
    timestamp INT,
    PRIMARY KEY (userId, movieId),
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (movieId) REFERENCES movies(movieId)
);

-- Create Table for Tags
CREATE TABLE MovieLens_tags (
    userId INT,
    movieId INT,
    tag VARCHAR(255),
    timestamp INT,
    PRIMARY KEY (userId, movieId, tag),
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (movieId) REFERENCES movies(movieId)
);
