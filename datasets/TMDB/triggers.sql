-- Trigger for INSERT operation on TMDB_MOVIE
-- Trigger for INSERT operation on TMDB_MOVIE
CREATE TRIGGER tmdb_movie_insert_trigger
AFTER INSERT ON TMDB_MOVIE
FOR EACH ROW
BEGIN
    -- Insert the new data into the GLOBAL_MOVIE_GENRE view
    INSERT INTO GLOBAL_MOVIE_GENRE (MovieID, Title, Genre)
    SELECT NEW.ID, NEW.TITLE, TG.GENRE
    FROM TMDB_MOVIE_GENRE TMG
    JOIN TMDB_GENRE TG ON TMG.GENREID = TG.ID
    WHERE TMG.FILMID = NEW.FILMID;
END;


-- Trigger for UPDATE operation on TMDB_MOVIE
CREATE TRIGGER tmdb_movie_update_trigger
AFTER UPDATE ON TMDB_MOVIE
FOR EACH ROW
BEGIN
    -- Update the corresponding data in the GLOBAL_MOVIE_GENRE view
    UPDATE GLOBAL_MOVIE_GENRE GMG
    SET GMG.Title = NEW.TITLE,
        GMG.Genre = (
            SELECT TG.GENRE
            FROM TMDB_MOVIE_GENRE TMG
            JOIN TMDB_GENRE TG ON TMG.GENREID = TG.ID
            WHERE TMG.FILMID = NEW.FILMID
        )
    WHERE GMG.MovieID = NEW.ID;
END;


-- Trigger for DELETE operation on TMDB_MOVIE
CREATE TRIGGER tmdb_movie_delete_trigger
AFTER DELETE ON TMDB_MOVIE
FOR EACH ROW
BEGIN
    -- Delete the corresponding data from the GLOBAL_MOVIE_GENRE view
    DELETE FROM GLOBAL_MOVIE_GENRE
    WHERE MovieID = OLD.ID;
END;
