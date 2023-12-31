
import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios"; // Import axios for making HTTP requests
import MovieCard from "./MovieCard"; 
import { Link } from 'react-router-dom';
import { useAuth } from "./Login/AuthContext";


function Home() {
  const {user} = useAuth();
  const [genre, setGenre] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [submittedGenre, setSubmittedGenre] = useState(""); 

  const [isLoadingMovies, setIsLoadingMovies] = useState(false); // Initialize as false
  const [movies, setMovies] = useState([]); // Initialize as an empty array
  
  useEffect(() => {
    // Define the API endpoint for fetching movie information
    const apiUrl = `http://127.0.0.1:5000/getAllGenres`;
    // console.log("Came here");
    // Fetch movie data from the API
    axios
        .get(apiUrl)
      .then((response) => {
        handleGenre(response.data);
        console.log(genreList);
      })
      .catch((error) => console.error('Error fetching data:', error));
  },[]);

  const handleGenre= (array) => {
      const genreArray = [];
      for (var i =0; i < array.length;i++){
        genreArray.push(array[i]["GENRE"]);
      }
      setGenreList(genreArray);
  }
  const handleSubmit = (e) => {
    
    // e.preventDefault();
    if (genre) {
      
      // Only fetch movies when the genre is not empty
      setIsLoadingMovies(true); // Set loading state to true

  
      console.log(genre)

      // axios
      //   .get(" http://127.0.0.1:5000/members")
      //   .then((response) => {
      //     console.log(response.data); // Set loading state to false
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error.message);
      //     setIsLoadingMovies(false); // Set loading state to false in case of an error
      //   });
      // Fetch top_movies data based on the genre
      axios
        .get("http://127.0.0.1:5000/movies", { params: { genre } })
        .then((response) => {
          setMovies(response.data); // Update movies state with fetched data
          setIsLoadingMovies(false); // Set loading state to false
        })
        .catch((error) => {
          console.error("Error:", error.message);
          setIsLoadingMovies(false); // Set loading state to false in case of an error
        });
    }
  };

  return (
    <div className="landing-page">
      <div className="genre-prompt">
        <div className="overlay">
          <header className="header">
            <h1 className="title">The Movie Mart</h1>
            <p className="subtitle" style={{color:"white"}}>Your One-Stop Movie Shop</p>
          </header>
        </div>

        <div className="black-background">
          <h2 >What Genre are you interested in?</h2>
          {/* <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form> */}
          
        </div>

      </div>
        
      <div className="button-container">
  {genreList.map((genre) => (
    <div key={genre}>
      <button
        className="genre-button"
        onClick={() => {
          setGenre(genre);
          handleSubmit();
        }}
      >
        {genre}
      </button>
    </div>
  ))}
</div>


      <div className="movie-display">

      
        {/* <div className="movie-grid">
        {isLoadingMovies ? (
          <p>Loading movies...</p>
        ) : (
          movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))
        )}
      </div> */}

        {/* Display movies */}
        <div className="movies-container">
          {isLoadingMovies ? (
            <p>Loading movies...</p>
          ) : (
            <ul className="movies-grid">
              {movies.map((movie, index) => (
                <div key={index} className="movie-card">
                <Link to={`/movie/${movie.Title}`}>
                <img src={"https://image.tmdb.org/t/p/w500/" + movie.image} alt="Filler" />
                <p style={{color:"white", fontWeight:"bold"}}>{movie.Title}</p>
                </Link>
               
              </div>
              ))}
            </ul>
          )}
        </div>
          {!user ? <h2>Please Login</h2>: <h2></h2>}
      </div>

    </div>
  );
}

export default Home;
