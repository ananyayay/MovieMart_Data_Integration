import csv
import mysql.connector
import os

# MySQL database connection
mydb = mysql.connector.connect(
    host="localhost",
    database="iia_project", 
    user="root",
    password="Haider@2001"  
)

mycursor = mydb.cursor()

# Define the paths to your CSV files
# csv_files = {
#     "movies.csv": "MovieLens_movie",
#     "ratings.csv": "MovieLens_ratings",
#     "tags.csv": "MovieLens_tags"
# }

csv_files = {
    "movies.csv": "newSource_movie",
    "ratings.csv": "newSource_ratings",
    "tags.csv": "newSource_tags"
}

# Get the current directory (where the script is located)
script_dir = os.path.dirname(os.path.abspath(__file__))

# Define the path to the "Extracted Data" directory
data_dir = os.path.join(script_dir, "Extracted Data")

for file_name, table_name in csv_files.items():
    # Construct the full path to the CSV file
    csv_file_path = os.path.join(data_dir, file_name)
    
    print(f"Loading data from {csv_file_path} into table {table_name}...")

    if(table_name != 'MovieLens_movie' and table_name !="newSource_movie"):
        continue
    # print("Coming here")
    with open(csv_file_path, "r", encoding="utf-8") as csv_file:
        csv_reader = csv.reader(csv_file)
        headers = next(csv_reader)  # Read the headers

        # Prepare the SQL INSERT statement without quotes around placeholders
        insert_query = f"INSERT INTO {table_name} ({', '.join(headers)}) VALUES ({', '.join(['%s'] * len(headers))})"
        
        count = 0
        for row in csv_reader:
            count +=1
            if(count==1001): #For demo purposes
                break

            values = tuple(row)
            try:
                # print(insert_query,values)
                mycursor.execute(insert_query, values)
            except mysql.connector.Error as err:
                print(f"Error inserting data into {table_name}: {err}")

mydb.commit()
mydb.close()
