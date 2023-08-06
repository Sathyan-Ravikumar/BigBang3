import './App.css';
import MiniDrawer from './Navbar/Navbar';
import React, { useState } from 'react';
import axios from 'axios';
import Hotel from './Package/Hotels';
import Book from './Package/Booking'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Define your routes using the Route component */}
          <Route exact path="/" element={<MiniDrawer />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/book" element={<Book />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
