import './App.css';
import MiniDrawer from './Navbar/Navbar';
import React, { useState } from 'react';
import axios from 'axios';
import Hotel from './Package/Hotels';
import Book from './Package/Booking';
import BillPDF from './Package/TotalDetails';
import FeedBack from './Package/feedback';
import  Login from './Login/login';
import Register from './Login/Register';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Admin from './Admin/adminpage';
import Footer from './Navbar/Footer';
import Agent from './AgentPages/agent';
import Request from './Admin/AgentRequest';
import Gallery from './Admin/ImageGallery';
import Package from './Package/Packages';
import PackageAdd from './AgentPages/Packageadd';
import ItineraryAdd from './AgentPages/ItineraryAdd';
import HotelAdd from './AgentPages/Hoteladd';

function App() {
  const decodedToken = JSON.parse(sessionStorage.getItem('decodedToken'));
  const userId = decodedToken ? parseInt(decodedToken.nameid, 10) : null;
  const userRole = decodedToken ? decodedToken.role : null;

  return (
    <>
      <Router>
        <Routes>
          <Route  path="/admin" element={<Admin userId={userId} userRole={userRole} />} />
          <Route  path="/register" element={<Register />} />
          <Route  path="/login" element={<Login />} />
          <Route  path="/" element={<MiniDrawer />} />
          <Route  path="/pack" element={<Package  />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/agent" element={<Agent userId={userId} userRole={userRole}  />} />
          <Route path="/book" element={<Book userId={userId} userRole={userRole}  />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path='/bill' element={<BillPDF/>}/>
          <Route path='/feedback' element={<FeedBack userId={userId} userRole={userRole}  />}/>
          <Route  path="/footer" element={<Footer />} />
          <Route path="/packageadd" element={<PackageAdd/>} />
          <Route path="/itinerary" element={<ItineraryAdd/>} />
          <Route path="/hoteladd" element={<HotelAdd/>} />
<Route path='/agentrequest' element={<Request/>}/>
          </Routes>
      </Router>
    </>
  );
}

export default App;
