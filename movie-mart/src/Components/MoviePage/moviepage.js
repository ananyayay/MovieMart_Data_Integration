import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios"; // Import axios for making HTTP requests
import ListAmazonProducts from '../AmazonPage/AmazonProducts';

const MoviePage = () => {
  const { title } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);

  const loadPage = () => {
    const apiUrl = `http://127.0.0.1:5000/getMovieDetails`;
    console.log("Came here",title);
    // Fetch movie data from the API
    axios
        .get(apiUrl, { params: { title } })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }

  useEffect(() => {
    // Define the API endpoint for fetching movie information
    const apiUrl = `http://127.0.0.1:5000/getMovieDetails`;
    console.log("Came here");
    // Fetch movie data from the API
    axios
        .get(apiUrl, { params: { title } })
      .then((response) => {
        console.log(response.data);
        setMovieInfo(response.data)
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [title]);

  // Function to render movie information
  const renderMovieInfo = () => {
    if (movieInfo) {
      return (
        <div>
        <div className="movie-info">
          <img src={"https://image.tmdb.org/t/p/original/" +movieInfo[0].image} alt={movieInfo.name} width={500} height={700} />
          <p>Title: {movieInfo[0].Title}</p>
          <p>Synopsis: {movieInfo[0].overview}</p>
        </div>
        <ListAmazonProducts/>
        </div>
      );
    }
    return <div>Loading...
        <button onClick={loadPage}> Reload page</button>
    </div>;
  };

  return (
    <div className="movie-page">
      {renderMovieInfo()}
    </div>
  );
};

export default MoviePage;
