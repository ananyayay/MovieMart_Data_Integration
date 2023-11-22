
DELIMITER //
CREATE TRIGGER UpdateGlobalMovieGenre
AFTER INSERT ON MovieLens_movie
FOR EACH ROW
BEGIN
    
    SET SESSION sql_mode = '';
    SET @dummy = NULL;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER UpdateDDGlobalMovieGenre
AFTER UPDATE ON MovieLens_movie
FOR EACH ROW
BEGIN
    
    SET SESSION sql_mode = '';
    SET @dummy = NULL;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER DeletedGlobalMovieGenre
AFTER DELETE ON MovieLens_movie
FOR EACH ROW
BEGIN
    
    SET SESSION sql_mode = '';
    SET @dummy = NULL;
END;
//
DELIMITER ;
Insert into MovieLens_movie values ("0234234234","comeone","");

select * from GLOBAL_MOVIE_GENRE where Title = "comeone";


-- Safe mode needs to turned off for deletion
SET SQL_SAFE_UPDATES = 0;
delete from MovieLens_movie where Title = "comeone";
SET SQL_SAFE_UPDATES = 1;

