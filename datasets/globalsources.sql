use iia_project;

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

);



-- Global view for Person
CREATE VIEW Person AS (
    Select t.id, t.name, t.birthday, t.deathday, t.alias_name, t.gender, t.biography, t.profile_path, t.popularity, t.place_of_birth, t.homepage, t.home_country, t.imdb_link,i.primary_profession, i.known_for
    from TMDBPerson t,
        IMDBPerson i
    where t.imdb_link = i.imdb_link
);

-- Global view for Movie
CREATE VIEW Global_Movie_View AS{

    SELECT  T.title, T.genres, T.release_date, T.runtime, T.is_adult, T.rating, 
            T.overview, T.popularity, T.collection_id, T.revenue, T.budget, 
            T.homepage, T.original_language, T.original_title, T.vote_average, T.vote_count,
    FROM TMDB_MOVIE T

    UNION

    SELECT  I.originalTitle , I.genres , NULL, NULL, I.isAdult , IR.averageRating , 
            NULL , NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL , NULL
    FROM IMDBMovie I , IMDB_title_ratings IR
    WHERE I.tconst = IR.tconst

    UNION

    SELECT  mlm.title, mlm.genres, ML.release_date, NULL, ML.is_adult, ML.rating, 
            NULL , NULL , NULL , NULL, NULL, NULL, ML.original_language, NULL, NULL, NULL
    FROM MovieLens ML, MovieLens_movies mlm
    WHERE ML.title = mlm.title

}


SELECT T.title, T.genres, T.release_date, T.runtime, T.is_adult, T.rating, T.overview, T.popularity, T.collection_id, T.revenue, T.budget, T.homepage, T.original_language, T.original_title, T.vote_average, T.vote_count,
FROM (
    -- Union of smaller tables or queries from different sources
    SELECT movie_id, title, genres, release_date, runtime, is_adult, rating, overview, popularity, collection_id, revenue, budget, homepage, original_language, original_title, vote_average, vote_count
    FROM IMDb_Movie
    UNION ALL
    SELECT movie_id, title, genres, release_date, runtime, is_adult, rating, overview, popularity, collection_id, revenue, budget, homepage, original_language, original_title, vote_average, vote_count
    FROM TMDb_Movie
    UNION ALL
    SELECT movieId AS movie_id, title, genres, NULL AS release_date, NULL AS runtime, NULL AS is_adult, NULL AS rating, NULL AS overview, NULL AS popularity, NULL AS collection_id, NULL AS revenue, NULL AS budget, NULL AS homepage, NULL AS original_language, NULL AS original_title, NULL AS vote_average, NULL AS vote_count
    FROM MovieLens_Movies
) AS T;
