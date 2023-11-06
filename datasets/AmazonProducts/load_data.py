import csv
import mysql.connector
import os

# MySQL database configuration
mydb = mysql.connector.connect(
    host="localhost",
    database="iia_project",
    user="root",
    password="Haider@2001"
)
# Path to your CSV file
csv_file_path = 'data.csv'

# Establish a connection to the MySQL database
cursor = mydb.cursor()

# SQL table name
table_name = 'AmazonProducts'

count = 0
# Read the CSV file and insert data into the database
with open(csv_file_path, 'r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        if count == 0:
            count+=1
            continue
        if count == 2500:
            break
        # Remove spaces from column headers
        cleaned_columns = [col.replace(" ", "") for col in row.keys()]
        # Construct the SQL INSERT query
        insert_query = f'''
            INSERT INTO {table_name} ({', '.join(cleaned_columns)})
            VALUES ({', '.join(['%s'] * len(row))})
        '''
        # Execute the INSERT query with data from the CSV
        print(insert_query,count)
        count+=1
        cursor.execute(insert_query, tuple(row.values()))


# Commit the changes and close the database connection
mydb.commit()
cursor.close()
mydb.close()

print(f'Data from CSV file has been imported into the {table_name} table.')
