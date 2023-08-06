import React, { useState, useEffect } from 'react';
import axios from '../axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { useLocation } from 'react-router-dom'; // Change to useParams


function Booking(){
    const location = useLocation();
  const { packageId, packagePrice,hotelid,hotelprice } = location.state;
  console.log(hotelprice,hotelid,packagePrice,packageId);
    return(
        <>
           
        </>
    );
}
export default Booking;