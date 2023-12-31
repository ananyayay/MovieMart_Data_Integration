import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios"; // Import axios for making HTTP requests
import ListAmazonProducts from '../AmazonPage/AmazonProducts';
import { Link } from 'react-router-dom';

const MoviePage = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f5f5f5',
    },
    movieInfo: {
      display: 'flex',
      alignItems: 'center',
      maxWidth: '800px',
      margin: '20px',
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      overflow: 'hidden',
    },
    movieImage: {
      width: '50%',
      height: 'auto',
      borderRadius: '10px 0 0 10px',
    },
    movieDetails: {
      padding: '20px',
      flex: '1',
    },
    title: {
      fontSize: '28px',
      margin: '0 0 10px 0',
      color: '#333',
      fontWeight: 'bold',
    },
    synopsis: {
      fontSize: '18px',
      color: '#555',
      lineHeight: '1.5',
    },
  };
  
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
        <div style={styles.container}>
      <div className="movie-info" style={styles.movieInfo}>
        <img
          src={"https://image.tmdb.org/t/p/original/" + movieInfo[0].image}
          alt={movieInfo[0].name}
          width={500}
          height={700}
          style={styles.movieImage}
        />
        <div style={styles.movieDetails}>
          <h2 style={styles.title}>{movieInfo[0].Title}</h2>
          <p style={styles.synopsis}>{movieInfo[0].overview}</p>
        </div>
      </div>
      <button><Link to={`/queries/${movieInfo[0].Title}`}> Queries </Link></button>
      <ListAmazonProducts />
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
