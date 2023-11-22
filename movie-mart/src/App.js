import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';

import Home from './Components/Home';
import Login from './Components/Login/login';
import Navbar from './Components/Navbar/navbar';
import Signup from './Components/Login/signup';
import MoviePage from './Components/MoviePage/moviepage';
import AmazonProductPage from './Components/AmazonPage/AmazonProductPage';
import MoviePageQueries from './Components/MoviePage/moviepageQueries';
import { AuthProvider } from './Components/Login/AuthContext';

function App() {
  return (
    <AuthProvider >
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element ={<Login />}/>
            <Route path="/signup" element = {<Signup />}/>
            <Route path="/movie/:title" element={<MoviePage />} />
            <Route path="/product/:UniqId" element={<AmazonProductPage />} />
            <Route path="/queries/:title" element={<MoviePageQueries/>}/>
          </Routes>
        </main>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
