import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';

import Home from './Components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
           
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
