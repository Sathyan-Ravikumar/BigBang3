import React, { useState, useEffect } from 'react';
import axios from '../axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

function Itinerary() {
  const [file, setFile] = useState();
  const [uploadedFileData, setUploadedFileData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const gethotel = async () => {
    try {
      const res = await axios.get('/Logic/ItineraryByPackId?packid=1', {
        responseType: 'json',
      });
      console.log(res);
      if (Array.isArray(res.data)) {
        console.log('Data received:', res.data);
        setUploadedFileData(res.data);
        setLoading(false);
      } else {
        console.log('Invalid data format received:', res.data);
        setLoading(false);
        setError('Invalid data format received');
      }
    } catch (ex) {
      console.log('Error fetching data:', ex);
      setLoading(false);
      setError('Error fetching data');
    }
  };

  useEffect(() => {
    gethotel();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      {uploadedFileData.map((item) => (
        
        <Card key={item.hotelId} sx={{ flex: '0 1 345px', margin: '20px' }}>
          <CardMedia
            sx={{ height: 140 }}
            image={`data:image/jpeg;base64,${item.itineraryImage}`}  
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.itineraryPlace} 
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.activities}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.dayNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.time}
            </Typography>
          </CardContent>
          
        </Card>
      ))}
    </div>
  );
}

export default Itinerary;
