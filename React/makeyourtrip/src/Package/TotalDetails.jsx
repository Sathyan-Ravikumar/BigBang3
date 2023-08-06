import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from '../axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../Assets/Logo.png';

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
            <h1>
              <img src={logo} alt="Logo" />
            </h1>
            <div>
              {/* Display Hotel Data */}
              {hotelData && (
                <div>
                  <h2>Hotel Details</h2>
                  <p>Name: {hotelData.hotelName}</p>
                  {/* Add other hotel data fields */}
                </div>
              )}
  
              {/* Display Package Data */}
              {packageData && (
                <div>
                  <h2>Package Details</h2>
                  <p>Name: {packageData.place}</p>
                  {/* Add other package data fields */}
                </div>
              )}
  
              {/* Display Bill Data */}
              {billData && (
                <div>
                  <h2>Bill Details</h2>
                  <p>Total Amount: {billData.totalAmount}</p>
                  {/* Add other bill data fields */}
                </div>
              )}
            </div>
            <div>
              <Button onClick={downloadPDF}>Download</Button>
            </div>
          </div>
        )}
      </>
    );
  }