
import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios"; // Import axios for making HTTP requests


function Home() {
  const [genre, setGenre] = useState("");
  const [submittedGenre, setSubmittedGenre] = useState(""); 

  const [isLoadingMovies, setIsLoadingMovies] = useState(false); // Initialize as false
  const [movies, setMovies] = useState([]); // Initialize as an empty array

  useEffect(() => {
    if (genre) {
      // Only fetch movies when the genre is not empty
      setIsLoadingMovies(true); // Set loading state to true

      // Fetch movies data based on the genre
      axios
        .get("/movies", { params: { genre } })
        .then((response) => {
          setMovies(response.data); // Update movies state with fetched data
          setIsLoadingMovies(false); // Set loading state to false
        })
        .catch((error) => {
          console.error("Error:", error.message);
          setIsLoadingMovies(false); // Set loading state to false in case of an error
        });
    }
  }, [genre]);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the genre submission here (e.g., send it to the server for movie retrieval)
    // You can implement this part later in your project
  };

  return (
    <div className="landing-page">
      <div className="overlay">
        <header className="header">
          <h1 className="title">The Movie Mart</h1>
          <p className="subtitle">Your One-Stop Movie Shop</p>
        </header>
      </div>

      <div className="black-background">
        <h2>What Genre are you interested in?</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        {/* Display the submitted genre */}
        {submittedGenre && (
          <p>Submitted Genre: {submittedGenre}</p>
        )}
      </div>

      {/* Display movies */}
      <div className="movies">
        {isLoadingMovies ? (
          <p>Loading movies...</p>
        ) : (
          <ul>
            {movies.map((movie, index) => (
              <li key={index}>{movie.title}</li>
              // You can display other movie details here as needed
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}

export default Home;
