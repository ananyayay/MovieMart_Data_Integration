-- Trigger for INSERT operation on IMDB_title_basics
CREATE TRIGGER imdb_title_basics_insert_trigger
AFTER INSERT ON IMDB_title_basics
FOR EACH ROW
BEGIN
    -- Insert the new data into the GLOBAL_MOVIE_GENRE view
    INSERT INTO GLOBAL_MOVIE_GENRE (MovieID, Title, Genre)
    VALUES (NEW.tconst, NEW.primaryTitle, NEW.genres);
END;

-- Trigger for UPDATE operation on IMDB_title_basics
CREATE TRIGGER imdb_title_basics_update_trigger
AFTER UPDATE ON IMDB_title_basics
FOR EACH ROW
BEGIN
    -- Update the corresponding data in the GLOBAL_MOVIE_GENRE view
    UPDATE GLOBAL_MOVIE_GENRE
    SET Title = NEW.primaryTitle, Genre = NEW.genres
    WHERE MovieID = NEW.tconst;
END;

-- Trigger for DELETE operation on IMDB_title_basics
CREATE TRIGGER imdb_title_basics_delete_trigger
AFTER DELETE ON IMDB_title_basics
FOR EACH ROW
BEGIN
    -- Delete the corresponding data from the GLOBAL_MOVIE_GENRE view
    DELETE FROM GLOBAL_MOVIE_GENRE
    WHERE MovieID = OLD.tconst;
END;
