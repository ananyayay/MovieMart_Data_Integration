import mysql.connector

def remove_source_from_view(conn, source_schema, source_table):
    # Assuming source_table has columns: MovieID, Title, Genre
    query = f"""
        DELETE FROM GLOBAL_MOVIE_GENRE
        WHERE MovieID IN (
            SELECT MovieID
            FROM {source_schema}.{source_table}
        )
    """

    with conn.cursor() as cursor:
        cursor.execute(query)
        conn.commit()

if __name__ == "__main__":
    # Update these values with your database connection details
    db_params = {
        'host': 'your_host',
        'user': 'your_username',
        'password': 'your_password',
        'database': 'your_database_name'
    }

    # Connect to the database
    try:
        conn = mysql.connector.connect(**db_params)
        print("Connected to the database")

        # Replace 'source_schema_to_remove' and 'source_table_to_remove' with your actual schema and table names
        remove_source_from_view(conn, 'source_schema_to_remove', 'source_table_to_remove')

    except mysql.connector.Error as e:
        print(f"Error: {e}")
    finally:
        # Close the database connection
        if conn:
            conn.close()
            print("Connection closed")
