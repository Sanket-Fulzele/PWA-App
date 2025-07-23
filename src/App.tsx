import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage/Homepage';
import About from './components/About/About';

function App() {
  return (
    <Router>
      <div>
        <nav style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Home App Center
          </h3>
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            padding: 0
          }}>
            <li>
              <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>Home</Link>
            </li>
            <li>
              <Link to="/about" style={{ textDecoration: 'none', color: '#007bff' }}>About</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
