import React, { useState } from "react";
import "./Home.css"; // Import a CSS file for styling

function Home() {
  const [genre, setGenre] = useState("");

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

      <div className="overlay">

        <div className="content">
          <h2>What genre are you interested in?</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
