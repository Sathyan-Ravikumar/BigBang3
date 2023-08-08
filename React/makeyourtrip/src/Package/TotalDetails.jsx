import React, { useState, useEffect, useRef } from 'react';
import {Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from '../axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../Assets/Logonew.png';

function useTotalDetailsPdf() {
  const location = useLocation();
  const { packid, packagePrice, hotelid, hotelprice, duration, bookid, total } = location.state;
  console.log(hotelprice, hotelid, packagePrice, packid, duration, bookid, total);
  const pdfRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hotelData, setHotelData] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [billData, setBillData] = useState(null);

  const getHotelById = async () => {
    try {
      const res = await axios.get('/Hotels/' + hotelid, {
        responseType: 'json',
      });

      if (res.data && typeof res.data === 'object') {
        console.log('Hotel Data received:', res.data);
        setHotelData(res.data);
      } else {
        console.log('Invalid Hotel data format received:', res.data);
        setError('Invalid Hotel data format received');
      }
      setLoading(false);
    } catch (ex) {
      console.log('Error fetching hotel data:', ex);
      setError('Error fetching hotel data');
      setLoading(false);
    }
  };

  useEffect(() => {
    getHotelById();
  }, [hotelid]);


  const getPackageById = async () => {
    try {
      const res = await axios.get('/Packages/' + packid, {
        responseType: 'json',
      });

      if (res.data && typeof res.data === 'object') {
        console.log('Package Data received:', res.data);
        setPackageData(res.data);
      } else {
        console.log('Invalid Package data format received:', res.data);
        setError('Invalid Package data format received');
      }
      setLoading(false);
    } catch (ex) {
      console.log('Error fetching Package data:', ex);
      setError('Error fetching Package data');
      setLoading(false);
    }
  };

  useEffect(() => {
    getPackageById();
  }, [packid]);

  const getBillById = async () => {
    try {
      const res = await axios.get('/TripBookings/' + bookid, {
        responseType: 'json',
      });

      if (res.data && typeof res.data === 'object') {
        console.log('TripBookings Data received:', res.data);
        setBillData(res.data);
      } else {
        console.log('Invalid TripBookings data format received:', res.data);
        setError('Invalid TripBookings data format received');
      }
      setLoading(false);
    } catch (ex) {
      console.log('Error fetching TripBookings data:', ex);
      setError('Error fetching TripBookings data');
      setLoading(false);
    }
  };
  useEffect(() => {
    getBillById();
  }, [bookid]);


  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfwidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgwidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfwidth / imgwidth, pdfHeight / imgHeight);
      const imgX = (pdfwidth - imgwidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgwidth * ratio, imgHeight * ratio);
      pdf.save('Bill.pdf');
    });
  };


  return {
    pdfRef,
    downloadPDF,
    loading, 
    hotelData, 
    packageData, 
    billData,
  };
}

export default function TotalDetailsPdf() {
    const { pdfRef, downloadPDF, loading, hotelData, packageData, billData } = useTotalDetailsPdf();
  
    return (
      <>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div ref={pdfRef}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt="Logo" style={{ maxWidth: '100px', marginRight: '10px' }} />
              <h1>Holidays</h1>
            </div>
            <div style={{ marginTop: '20px' }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><h3>Details Type</h3></TableCell>
                      <TableCell><h3>Details Value</h3></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {hotelData && (
                      <TableRow>
                        <TableCell>Hotel Name</TableCell>
                        <TableCell>{hotelData.hotelName}</TableCell>
                      </TableRow>
                    )}
                    {packageData && (
                      <TableRow>
                        <TableCell>Package Place</TableCell>
                        <TableCell>{packageData.place}</TableCell>
                      </TableRow>
                    )}
                    {billData && (
                      <TableRow>
                        <TableCell>Group size</TableCell>
                        <TableCell>{billData.numberOfPeople}</TableCell>
                      </TableRow>
                      
                    )}
                    {billData && (
                      <TableRow>
                        <TableCell>Trip Type</TableCell>
                        <TableCell>{billData.tripType}</TableCell>
                      </TableRow>
                      
                    )}
                    {billData && (
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>{billData.dateOfTheTrip}</TableCell>
                      </TableRow>
                      
                    )}
                    {billData && (
                      <TableRow>
                        <TableCell>Your Number</TableCell>
                        <TableCell>{billData.contactNumber}</TableCell>
                      </TableRow>
                      
                    )}
                    {billData && (
                      <TableRow>
                        <TableCell>Total Amount</TableCell>
                        <TableCell>{billData.totalAmount}</TableCell>
                      </TableRow>
                      
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            
          </div>
        )}
        <Box display="flex" justifyContent="center" mt={3}>
              <Button variant="contained" color="primary" onClick={downloadPDF}>
                Download
              </Button>
            </Box>
      </>
    );
  }