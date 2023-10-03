import React, { useState, useEffect } from 'react';

function App() {
  const [membersData, setMembersData] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);

  useEffect(() => {
    // Fetch members data
    fetch("/members")
      .then((response) => response.json())
      .then((data) => {
        setMembersData(data.members);
        setIsLoadingMembers(false);
      })
      .catch((error) => {
        console.error('Error fetching members:', error);
        setIsLoadingMembers(false);
      });

    // Fetch movies data
    fetch("/movies")
      .then((response) => response.json())
      .then((data) => {
        setMoviesData(data);
        setIsLoadingMovies(false);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setIsLoadingMovies(false);
      });
  }, []);

  return (
    <div>
      <div>
        <h2>Members</h2>
        {isLoadingMembers ? (
          <p>Loading members...</p>
        ) : (
          <ul>
            {membersData.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2>Movies</h2>
        {isLoadingMovies ? (
          <p>Loading movies...</p>
        ) : (
          <ul>
            {moviesData.map((movie) => (
              <li key={movie.id}>
                <h3>{movie.title}</h3>
                <p>Release Year: {movie.release_year}</p>
                <p>Genre: {movie.genre}</p>
                <p>Director: {movie.director}</p>
                <p>Rating: {movie.rating}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
