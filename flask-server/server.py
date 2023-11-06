from flask import Flask, jsonify , request
from flask_cors import CORS, cross_origin
import mysql.connector


# Create a Flask web application
app = Flask(__name__)
cors = CORS(app)

mydb = mysql.connector.connect(
    host="localhost",
    database="iia_project",
    user="root",
    password="Haider@2001"
)

mycursor = mydb.cursor()


# Sample list of members
members_list = ["Alice", "Bob", "Charlie", "David", "Eve"]

# Define a route that returns JSON with a "members" key and a list of members

@app.route("/members")
@cross_origin()
def get_members():
    response = {"members": members_list}
    return response


# @app.route('/movies')
# def get_movies():
#     cursor = mydb.cursor(dictionary=True)  # Use dictionary cursor for JSON results
#     cursor.execute("SELECT * FROM movies")
#     movies = cursor.fetchall()
#     cursor.close()
#     return jsonify(movies)


# Route for movies retrieval by genre
@app.route("/movies", methods=["GET"])
@cross_origin()
def get_movies_by_genre():
    genre = request.args.get("genre")  # Get the genre from the query parameters
    print("this is genre",genre)
    cursor = mydb.cursor(dictionary=True)  # Use dictionary cursor for JSON results
    cursor.execute("SELECT * FROM TMDB_MOVIE_AND_GENRE WHERE genre = %s", (genre,))
    movies = cursor.fetchall()
    cursor.close()

    return jsonify(movies)

@app.route('/top_movies')
@cross_origin()
def get_top_movies():
    genre = request.args.get('genre')
    cursor = mydb.cursor(dictionary=True)
    
    # Modify the SQL query to retrieve top 10 movies based on genre
    query = "SELECT Title FROM GLOBAL_MOVIE_GENRE WHERE Genre = %s LIMIT 10"
    
    cursor.execute(query, (genre,))
    top_movies = cursor.fetchall()
    cursor.close()
    
    return jsonify(top_movies)


@app.route('/signup',methods=["GET"])
@cross_origin()
def userSignup():
    username = request.args.get('username')
    email = request.args.get('email')
    password = request.args.get('password')
    cursor = mydb.cursor(dictionary=True)
    
    # Modify the SQL query to retrieve top 10 movies based on genre
    try:
        # Use placeholders in the SQL query
        query = "INSERT INTO user (USERNAME, EMAILID, PASS) VALUES (%s, %s, %s)"
        values = (username, email, password)

        cursor.execute(query, values)
        mydb.commit()  # Commit the transaction

        response = {"response": "200"}  # Success
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        response = {"response": "401"}  # Error
    finally:
        cursor.close()

    return jsonify(response)
   

@app.route("/getMovieDetails",methods=["GET"])
@cross_origin()
def getMovieInfo():
    title = request.args.get('title')
    cursor = mydb.cursor(dictionary=True)
    
    query = "SELECT * FROM TMDB_MOVIE_AND_GENRE WHERE Title = %s"
    values = (title,)
    cursor.execute(query, values)
    top_movies = cursor.fetchall()
    cursor.close()
    
    return jsonify(top_movies)
   


if __name__ == "__main__":
    # Run the Flask app on the local development server
    app.run(debug=True)
