import React from "react";
import "./MovieCard.css"; 

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.image} alt={movie.title} className="movie-image" />
      <h3 className="movie-title">{movie.title}</h3>
    </div>
  );
}

export default MovieCard;
