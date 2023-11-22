import mysql.connector

# Connect to the database
conn = mysql.connector.connect(
    host="localhost",
    database="iia_project",
    user="root",
    password="Haider@2001"
)

# Create a cursor
cursor = conn.cursor()

# Retrieve data from the productForMovie view
query = "SELECT productName, productURL, Image FROM productForMovie"
cursor.execute(query)
product_data = cursor.fetchall()

# Generate IMDb IDs sequentially
imdb_ids = ['tt' + str(i).zfill(7) for i in range(2, 202)]

# Insert data into the productMovie table using a for loop
insert_query = """
    INSERT INTO productMovie (IMDBID, productName, productURL, productImage)
    VALUES (%s, %s, %s, %s)
"""

for i in range(200):
    imdb_id = imdb_ids[i]
    product_info = product_data[i]
    combined_data = (imdb_id, *product_info)
    
    cursor.execute(insert_query, combined_data)

# Commit the changes
conn.commit()

# Close the cursor and connection
cursor.close()
conn.close()
