-- Trigger for INSERT operation on IMDB_title_basics
use iia_project;

DELIMITER //
CREATE TRIGGER imdb_title_basics_insert_trigger
AFTER INSERT ON IMDB_title_basics
FOR EACH ROW
BEGIN
    INSERT INTO GLOBAL_MOVIE_GENRE (MovieID, Title, Genre)
    VALUES (NEW.tconst, NEW.primaryTitle, NEW.genres);
END;
//
DELIMITER ;


-- Trigger for UPDATE operation on IMDB_title_basics
DELIMITER //
CREATE TRIGGER imdb_title_basics_update_trigger
AFTER UPDATE ON IMDB_title_basics
FOR EACH ROW
BEGIN
    UPDATE GLOBAL_MOVIE_GENRE GMG
    JOIN IMDB_title_basics IMDb
    ON GMG.MovieID = IMDb.tconst
    SET GMG.Title = NEW.primaryTitle,
        GMG.Genre = NEW.genres;
END;
//
DELIMITER ;


-- Trigger for DELETE operation on IMDB_title_basics

DELIMITER //
CREATE TRIGGER imdb_title_basics_delete_trigger
AFTER DELETE ON IMDB_title_basics
FOR EACH ROW
    DELETE FROM GLOBAL_MOVIE_GENRE
    WHERE MovieID = OLD.tconst;
DELIMITER ;
-- Reset the delimiter back to ;


