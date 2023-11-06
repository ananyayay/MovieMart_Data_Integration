
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
Insert into MovieLens_movie values ("0","sds","");