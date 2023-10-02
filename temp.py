from flask import Flask, jsonify
# import mysql.connector


# Create a Flask web application
app = Flask(__name__)

# mydb = mysql.connector.connect(
#     host="localhost",
#     database="iia_project",
#     user="root",
#     password="creates"
# )

# mycursor = mydb.cursor()

# @app.route('/movies')
# def get_movies():
#     mycursor.execute("SELECT * FROM movies")
#     movies = mycursor.fetchall()
#     mycursor.close()
#     return jsonify(movies)

# Sample list of members
members_list = ["Alice", "Bob", "Charlie", "David", "Eve"]

# Define a route that returns JSON with a "members" key and a list of members
@app.route('/members')
def get_members():
    response = {'members': members_list}
    # return jsonify(response)
    return {'members': ["1" , "2 yaar"]}

if __name__ == '__main__':
    # Run the Flask app on the local development server
    app.run(debug=True)
