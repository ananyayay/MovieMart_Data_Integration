import re

def match_entities(imdb_entity, movielens_entity):
    # Extract the movie name and year from IMDb entity
    imdb_moviename = imdb_entity["moviename"]
    imdb_year = imdb_entity["year"]

    # Extract the movie name and year from MovieLens entity
    movielens_moviename = movielens_entity["moviename"]

    # Remove the year from MovieLens entity (within parentheses)
    movielens_info = re.match(r'^(.+) \((\d{4})\)$', movielens_moviename)
    
    if movielens_info:
        movielens_moviename_cleaned, movielens_movieyear_cleaned = movielens_info.groups()
    else:
        movielens_moviename_cleaned = movielens_moviename
        movielens_movieyear_cleaned = ""

    # Compare the cleaned MovieLens movie name and year with IMDb movie name and year
    print(imdb_year,movielens_movieyear_cleaned)
    if imdb_moviename == movielens_moviename_cleaned and (imdb_year == movielens_movieyear_cleaned or not imdb_year):
        return True
    return False

# Example usage:
imdb_entity1 = {"moviename": "Thor", "year": "2012"}
movielens_entity1 = {"moviename": "Thor (2012)"}
result1 = match_entities(imdb_entity1, movielens_entity1)
print(result1)  # Output: True

imdb_entity2 = {"moviename": "Loki", "year": "2010"}
movielens_entity2 = {"moviename": "Loki (1977)"}
result2 = match_entities(imdb_entity2, movielens_entity2)
print(result2)  # Output: False
