import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';

import Home from './Components/Home';
import Login from './Components/Login/login';
import Navbar from './Components/Navbar/navbar';
import Signup from './Components/Login/signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element ={<Login />}/>
            <Route path="/signup" element = {<Signup />}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
