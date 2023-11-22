-- View for reviews over time
CREATE OR REPLACE VIEW MovieReviewsByDate AS (
    SELECT
        G.MovieID,
        G.Title,
        R.ReviewID,
        R.ReviewText,
        R.Rating,
        R.ReviewDate
    FROM
        GLOBAL_MOVIE_GENRE G
    JOIN
        MovieReviews R ON G.MovieID = R.MovieID
);

-- Select reviews over time in ascending order
SELECT *
FROM MovieReviewsByDate
ORDER BY ReviewDate ASC;

-- Select reviews over time in descending order
SELECT *
FROM MovieReviewsByDate
ORDER BY ReviewDate DESC;
