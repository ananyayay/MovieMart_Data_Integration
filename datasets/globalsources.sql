use iia_project;

-- Global view to show movies of specific genre
drop view if exists GLOBAL_MOVIE_GENRE;
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
                MovieLens_movie
            WHERE
                genres IS NOT NULL
        ) AS MovieLens
    
    -- next source
);
Select * from GLOBAL_MOVIE_GENRE;

SELECT MovieID, MIN(Title) AS Title
FROM GLOBAL_MOVIE_GENRE
WHERE Title LIKE '%Harry%'
GROUP BY MovieID;



