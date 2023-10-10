show databases;

use iia_project;

show tables;

CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_year INT,
    genre VARCHAR(255),
    director VARCHAR(255),
    rating DECIMAL(3, 1)
);

INSERT INTO movies(title, release_year, genre, director, rating)
VALUES( 'Movie Title 1', 2022, 'Action', 'Director 1', 8.5);

INSERT INTO movies (title, release_year, genre, director, rating)
VALUES
    ('Movie Title 4', 2022, 'Action', 'Director 1', 8.5),
    ('Movie Title 2', 2021, 'Comedy', 'Director 2', 7.8);

INSERT INTO movies (title, genre) VALUES
    ('The Pursuit of Justice', 'thriller'),
    ('Laughing All the Way', 'comedy'),
    ('Code of Valor', 'action'),
    ('Crisis Point', 'thriller'),
    ('Mastermind Heist', 'action');


SELECT * FROM movielens_movies;

drop table movie;


DROP TABLE IF EXISTS MovieLens_tags;
DROP TABLE IF EXISTS MovieLens_ratings;
DROP TABLE IF EXISTS MovieLens_movie;
drop table MovieLens_rating;
drop table MovieLens_rate;
drop table MovieLens_ratings;



-- Create Table for Movies
CREATE TABLE MovieLens_movies (
    movieId INT PRIMARY KEY,
    title VARCHAR(255),
    genres VARCHAR(255)
);



show tables;

-- Create Table for Ratings
CREATE TABLE MovieLens_ratings (
    movieId INT PRIMARY KEY,
    title VARCHAR(255),
    genres VARCHAR(255)
) ;

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

DROP TABLE IF EXISTS movielens_checking;
DROP TABLE IF EXISTS MovieLens_movies;
DROP TABLE  movies;
select * from movies;

DROP TABLE IF EXISTS name_basics;
DROP TABLE IF EXISTS title_akas;
DROP TABLE IF EXISTS title_basics;
DROP TABLE IF EXISTS title_crew;
DROP TABLE IF EXISTS title_episode;
DROP TABLE IF EXISTS title_principals;
DROP TABLE IF EXISTS title_ratings;

