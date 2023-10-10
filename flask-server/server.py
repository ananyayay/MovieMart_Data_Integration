from flask import Flask, jsonify , request
import mysql.connector


# Create a Flask web application
app = Flask(__name__)

mydb = mysql.connector.connect(
    host="localhost",
    database="iia_project",
    user="root",
    password="creates"
)

mycursor = mydb.cursor()


# Sample list of members
members_list = ["Alice", "Bob", "Charlie", "David", "Eve"]

# Define a route that returns JSON with a "members" key and a list of members
@app.route("/members")
def get_members():
    response = {"members": members_list}
    return response


@app.route('/movies')
def get_movies():
    cursor = mydb.cursor(dictionary=True)  # Use dictionary cursor for JSON results
    cursor.execute("SELECT * FROM movies")
    movies = cursor.fetchall()
    cursor.close()
    return jsonify(movies)


# Route for movies retrieval by genre
@app.route("/movies", methods=["GET"])
def get_movies_by_genre():
    genre = request.args.get("genre")  # Get the genre from the query parameters

    cursor = mydb.cursor(dictionary=True)  # Use dictionary cursor for JSON results
    cursor.execute("SELECT * FROM movies WHERE genre = %s", (genre,))
    movies = cursor.fetchall()
    cursor.close()

    return jsonify(movies)

@app.route('/top_movies')
def get_top_movies():
    genre = request.args.get('genre')
    cursor = mydb.cursor(dictionary=True)
    
    # Modify the SQL query to retrieve top 10 movies based on genre
    query = "SELECT Title FROM GLOBAL_MOVIE_GENRE WHERE Genre = %s LIMIT 10"
    
    cursor.execute(query, (genre,))
    top_movies = cursor.fetchall()
    cursor.close()
    
    return jsonify(top_movies)


if __name__ == "__main__":
    # Run the Flask app on the local development server
    app.run(debug=True)
