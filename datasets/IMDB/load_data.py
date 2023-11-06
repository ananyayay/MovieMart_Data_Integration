import csv
import mysql.connector
import os

# Define the IMDb dataset files and corresponding table names
dataset_files = {
    "name.basics.tsv": "IMDB_name_basics",
    "title.akas.tsv": "IMDB_title_akas",
    "title.basics.tsv": "IMDB_title_basics",
    "title.crew.tsv": "IMDB_title_crew",
    "title.episode.tsv": "IMDB_title_episode",
    "title.principals.tsv": "IMDB_title_principals",
    "title.ratings.tsv": "IMDB_title_ratings",
}

# Get the current directory (where the script is located)
script_dir = os.path.dirname(os.path.abspath(__file__))

# Define the path to the "Extracted Data" directory
data_dir = os.path.join(script_dir, "Extracted Data")

# Connect to the database
mydb = mysql.connector.connect(
    host="localhost",
    database="iia_project",
    user="root",
    password="Haider@2001"
)

mycursor = mydb.cursor()

# Loop through dataset files and insert data into corresponding tables
for file_name, table_name in dataset_files.items():
    # Construct the full path to the data file
    data_file_path = os.path.join(data_dir, file_name)
    
    print(f"Processing file: {file_name}...")

    data_file_path = data_file_path

    with open(data_file_path, "r", encoding="utf-8") as tsv_file:
        tsv_reader = csv.reader(tsv_file, delimiter="\t")
        headers = next(tsv_reader)  # Read the headers

        count = 0
        for row in tsv_reader:

            count +=1

            if(count==1001): # For demo purposes 1000 rows
                break


            # Replace '\N' with None for nullable columns
            row = [None if col == '\\N' else col for col in row]
            
            # Prepare the SQL INSERT statement without quotes around placeholders
            insert_query = f"INSERT INTO {table_name} ({', '.join(headers)}) VALUES ({', '.join(['%s'] * len(headers))})"
            values = tuple(row)
            try:
                mycursor.execute(insert_query, values)
            except mysql.connector.Error as err:
                print(f"Error inserting data into {table_name}: {err}")

# Commit the changes and close the database connection
mydb.commit()
mycursor.close()
mydb.close()

print("Data loading complete.")
