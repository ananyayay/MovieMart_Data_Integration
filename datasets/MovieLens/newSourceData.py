import mysql.connector

def insert_mock_data(conn, start_id, num_entries):
    # Replace 'newSource_movie' with your actual table name
    table_name = 'newSource_movie'

    # Generate and execute the SQL INSERT command
    insert_query = f"""
        INSERT INTO {table_name} (movieId, title, genres)
        VALUES {', '.join(f'({start_id + i}, "Movie{str(start_id + i)[-2:]}", "comedy")' for i in range(num_entries))}
    """
    
    with conn.cursor() as cursor:
        cursor.execute(insert_query)
        conn.commit()
        print(f"Inserted {num_entries} rows into the '{table_name}' table.")

if __name__ == "__main__":
    # Update these values with your database connection details
    db_params = {
        'host': 'localhost',
        'user': 'root',
        'password': 'Haider@2001',
        'database': 'iia_project'
    }

    # Replace with the starting ID and the number of entries you want
    start_id = 15151530
    num_entries = 30

    # Connect to the database
    try:
        conn = mysql.connector.connect(**db_params)
        print("Connected to the database")

        # Insert mock data into the table
        insert_mock_data(conn, start_id, num_entries)

    except mysql.connector.Error as e:
        print(f"Error: {e}")
    finally:
        # Close the database connection
        if conn:
            conn.close()
            print("Connection closed")
