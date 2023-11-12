import mysql.connector

def add_source_to_view(conn, source_schema, source_table):
    # Assuming source_table has columns: MovieID, Title, Genre
    query = f"""
        INSERT INTO GLOBAL_MOVIE_GENRE (MovieID, Title, Genre)
        SELECT MovieID, Title, Genre
        FROM {source_schema}.{source_table}
    """

    with conn.cursor() as cursor:
        cursor.execute(query)
        conn.commit()

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

        # Replace 'new_source_schema' and 'new_source_table' with your actual schema and table names
        add_source_to_view(conn, 'new_source_schema', 'new_source_table')

    except mysql.connector.Error as e:
        print(f"Error: {e}")
    finally:
        # Close the database connection
        if conn:
            conn.close()
            print("Connection closed")
