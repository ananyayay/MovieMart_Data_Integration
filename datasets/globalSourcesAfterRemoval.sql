use iia_project;

-- Global view to show movies of specific genre

#Removal of a source

DROP VIEW if exists GLOBAL_MOVIE_GENRE_REMOVAL;
CREATE OR REPLACE VIEW  GLOBAL_MOVIE_GENRE_REMOVAL AS(
  
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

);
Select * from GLOBAL_MOVIE_GENRE_REMOVAL;

