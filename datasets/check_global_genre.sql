-- Global view to show movies of specific genre

CREATE OR REPLACE VIEW  GLOBAL_MOVIE_GENRE AS(
    SELECT DISTINCT
        TMDB.MovieID,
        TMDB.Title,
        TMDB.Genre
    FROM
        (
            SELECT
                TM.ID AS MovieID,
                TM.TITLE AS Title,
                TG.GENRE AS Genre
            FROM
                TMDB_MOVIE AS TM
            JOIN
                TMDB_MOVIE_GENRE AS TMG ON TM.FILMID = TMG.FILMID
            JOIN
                TMDB_GENRE AS TG ON TMG.GENREID = TG.ID
        ) AS TMDB

    UNION

    SELECT
        IMDb.MovieID,
        IMDb.Title,
        IMDb.Genre
    FROM
        (
            SELECT
                tconst AS MovieID,
                primaryTitle AS Title,
                genres AS Genre
            FROM
                IMDB_title_basics
            WHERE
                genres IS NOT NULL
        ) AS IMDb


    UNION

    SELECT
        MovieLens.MovieID,
        MovieLens.Title,
        MovieLens.Genre
    FROM
        (
            SELECT
                movieId AS MovieID,
                title AS Title,
                genres AS Genre
            FROM
                MovieLens_movies
            WHERE
                genres IS NOT NULL
        ) AS MovieLens


	-- next source
);


select * from GLOBAL_MOVIE_GENRE where Title = "Othello (1995)";
select * from global_movie_genre where Title = "Movie31";

-- Query to print everything that's in MovieLens but not in any other db.
Select * from MovieLens_movie where movieId not in (
SELECT DISTINCT
        TMDB.MovieID
       
    FROM
        (
            SELECT
                TM.ID AS MovieID
               
            FROM
                TMDB_MOVIE AS TM
            JOIN
                TMDB_MOVIE_GENRE AS TMG ON TM.FILMID = TMG.FILMID
            JOIN
                TMDB_GENRE AS TG ON TMG.GENREID = TG.ID
        ) AS TMDB

    UNION

    SELECT
        IMDb.MovieID
       
    FROM
        (
            SELECT
                tconst AS MovieID
               
            FROM
                IMDB_title_basics
            WHERE
                genres IS NOT NULL
        ) AS IMDb


);