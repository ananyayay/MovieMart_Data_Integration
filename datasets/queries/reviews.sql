CREATE OR REPLACE VIEW MovieAllReviews AS (
    SELECT
        G.MovieID,
        G.Title,
        R.ReviewID,
        R.ReviewText,
        R.Rating
    FROM
        GLOBAL_MOVIE_GENRE G
    JOIN
        MovieReviews R ON G.MovieID = R.MovieID
);


SELECT * FROM MovieAllReviews WHERE MovieID = 1; 
