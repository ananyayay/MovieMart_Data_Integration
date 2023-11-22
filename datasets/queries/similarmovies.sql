
-- View for suggesting similar movies based on shared genres
CREATE OR REPLACE VIEW SimilarMovies AS
SELECT
    G.MovieID AS MovieID1,
    G.Title AS Title1,
    S.MovieID AS MovieID2,
    S.Title AS Title2
FROM
    GLOBAL_MOVIE_GENRE G
JOIN
    GLOBAL_MOVIE_GENRE S ON G.Genre = S.Genre AND G.MovieID <> S.MovieID
ORDER BY
    G.MovieID, S.MovieID
LIMIT 3000;

-- Example: Find similar movies for MovieID = 123
SELECT * FROM SimilarMovies WHERE MovieID1 = 1;


