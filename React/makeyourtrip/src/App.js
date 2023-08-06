import './App.css';
import MiniDrawer from './Navbar/Navbar';
import React, { useState } from 'react';
import axios from 'axios';
import Hotel from './Package/Hotels';
import Book from './Package/Booking'
import BillPDF from './Package/TotalDetails'
import FeedBack from './Package/feedback'
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
          <Route path='/bill' element={<BillPDF/>}/>
          <Route path='/feedback' element={<FeedBack/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
