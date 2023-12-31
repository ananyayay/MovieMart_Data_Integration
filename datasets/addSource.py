import mysql.connector

def insert_data_into_source3(conn, fourth_table_name, source3_table_name):
    # Replace 'FourthTable' and 'source3' with your actual table names
   
    # Generate and execute the SQL INSERT command
    insert_query = f"""
        INSERT INTO {source3_table_name} (MovieID, Title, Genres)
        SELECT MovieID, Title, genres
        FROM {fourth_table_name}
    """

    with conn.cursor() as cursor:
        cursor.execute(insert_query)
        conn.commit()
        print(f"Inserted data from '{fourth_table_name}' into '{source3_table_name}'.")

if __name__ == "__main__":
    # Update these values with your database connection details
    db_params = {
        'host': 'localhost',
        'user': 'root',
        'password': 'Haider@2001',
        'database': 'iia_project'
    }

    # Connect to the database
    try:
        conn = mysql.connector.connect(**db_params)
        print("Connected to the database")

        # Replace 'FourthTable' and 'source3' with your actual table names
        insert_data_into_source3(conn, 'newSource_movie', 'MovieLens_movie')

    except mysql.connector.Error as e:
        print(f"Error: {e}")
    finally:
        # Close the database connection
        if conn:
            conn.close()
            print("Connection closed")
