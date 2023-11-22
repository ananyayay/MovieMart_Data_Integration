import mysql.connector

def remove_source_from_table(conn, source_table):
    query = f"""
        DELETE FROM {source_table}
        WHERE title IN (
            SELECT Title
            FROM GLOBAL_MOVIE_GENRE
            WHERE Genre IS NOT NULL
        )
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

        # Replace 'source_schema_to_remove' and 'source_table_to_remove' with your actual schema and table names
        remove_source_from_table(conn, 'MovieLens_movie')

    except mysql.connector.Error as e:
        print(f"Error: {e}")
    finally:
        # Close the database connection
        if conn:
            conn.close()
            print("Connection closed")
