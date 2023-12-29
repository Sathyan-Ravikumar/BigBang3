import './App.css';
import MiniDrawer from './Navbar/Navbar';
import React, { useState } from 'react';
import axios from 'axios';
import Hotel from './Package/Hotels';
import Book from './Package/Booking';
import BillPDF from './Package/TotalDetails';
import FeedBack from './Package/feedback';
import Login from './Login/login';
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
import Agentprotect from './ProtectedRoute/agent'
import AgentProtected from './ProtectedRoute/agent';
import BookProtected from './ProtectedRoute/bookingform'
import AdminProtect from './ProtectedRoute/admin';
import PackProtect from './ProtectedRoute/package';
import packAdding from './ProtectedRoute/packageAdding';
import ItineraryAddprotect from './ProtectedRoute/itineraryadding';
import HotelAddProtect from './ProtectedRoute/hoteladding'
import HotelProtect from './ProtectedRoute/hotel';
import BillProtect from './ProtectedRoute/Billpdf';
import AgentRequestProtect from './ProtectedRoute/agentrequest';
import FeedBackProtect from './ProtectedRoute/feedback';
import GalleryProtect from './ProtectedRoute/gallery';
import Notfound from './notfound';
import AgentHotels from './AgentPages/agentHotels';

function App() {
  const token = JSON.parse(sessionStorage.getItem('decodedToken'));
  const userId = token ? parseInt(token.nameid, 10) : null;
  const userRole = token ? token.role : null;
  console.log("app :", userId, userRole)
  return (
    <>
      <Router>
        <MiniDrawer userId={userId} userRole={userRole} />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Notfound />} />

          <Route path='/yourpackagehotel' element={
            <AgentProtected token={token}>
          <AgentHotels />
          </AgentProtected>
          } />
          <Route path="/admin" element={
            <AdminProtect token={token}>
              <Admin userId={userId} userRole={userRole} />
            </AdminProtect>} />

          <Route path="/pack" element={
            <PackProtect token={token}>
              <Package />
            </PackProtect>
          } />
          <Route path="/hotel" element={
            <HotelProtect token={token}>
              <Hotel />
            </HotelProtect>
          } />
          <Route path="/request" element={
            <AdminProtect token={token}>
              <Request />
            </AdminProtect>
          } />

          <Route path="/agent" element={
            <AgentProtected token={token}>
              <Agent userId={userId} userRole={userRole} />
            </AgentProtected>
          } />

          <Route path="/book" element={
            <BookProtected token={token}>
              <Book userId={userId} userRole={userRole} />
            </BookProtected>
          } />


          <Route path="/gallery" element={
            <GalleryProtect token={token}>
              <Gallery />
            </GalleryProtect>} />


          <Route path='/bill' element={
            <BillProtect token={token}>
              <BillPDF />
            </BillProtect>} />


          <Route path='/feedback' element={
            <FeedBackProtect token={token}>
              <FeedBack userId={userId} userRole={userRole} />
            </FeedBackProtect>
          } />

          <Route path="/packageadd" element={
            <packAdding token={token}>
              <PackageAdd userId={userId} userRole={userRole}  />
            </packAdding>
          } />

          <Route path="/itinerary" element={
            <ItineraryAddprotect token={token} >
              <ItineraryAdd />
            </ItineraryAddprotect>} />

          <Route path="/hoteladd" element={
            <HotelAddProtect token={token} >
              <HotelAdd />
            </HotelAddProtect>} />

          <Route path='/agentrequest' element={
            <AgentRequestProtect token={token}>
              <Request />
            </AgentRequestProtect>
          } />
        </Routes>
        <Footer  userId={userId} userRole={userRole} />
      </Router>
    </>
  );
}

export default App;
