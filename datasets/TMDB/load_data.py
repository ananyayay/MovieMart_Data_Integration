import os
import pandas as pd
import mysql.connector

# MySQL database connection
mydb = mysql.connector.connect(
    host="localhost",
    database="iia_project",
    user="root",
    password="Haider@2001"
)

mycursor = mydb.cursor()

# Define the paths to your XLSX files and the data directory
data_dir = "Extracted Data"
xlsx_files = {
    "MOVIE.xlsx": "TMDB_MOVIE",
    "MOVIE_GENRE.xlsx": "TMDB_MOVIE_GENRE",
    "GENRE.xlsx": "TMDB_GENRE"
}

# Iterate through XLSX files and load data
for file_name, table_name in xlsx_files.items():
    # Construct the full path to the XLSX file
    xlsx_file_path = os.path.join(data_dir, file_name)

    print(f"Loading data from {xlsx_file_path} into table {table_name}...")

    # Read the XLSX file using pandas
    df = pd.read_excel(xlsx_file_path)
    
    # Prepare the SQL INSERT statement without quotes around placeholders
    insert_query = f"INSERT INTO {table_name} ({', '.join(df.columns)}) VALUES ({', '.join(['%s'] * len(df.columns))})"

    count = 0
    for row in df.itertuples(index=False):
        count += 1
        if count == 1001:  # For demo purposes, loading the first 1000 rows
            break

        values = [None if pd.isna(val) else val for val in row]
        try:
            mycursor.execute(insert_query, values)
        except mysql.connector.Error as err:
            print(f"Error inserting data into {table_name}: {err}")
            print(f"Values: {values}")
            

mydb.commit()
mydb.close()
