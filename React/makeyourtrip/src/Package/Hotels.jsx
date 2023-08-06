import React, { useState, useEffect } from 'react';
import axios from '../axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { useLocation, useNavigate } from 'react-router-dom'; // Change to useParams

function Hotel() {
  const location = useLocation();
  const { packageId, packagePrice } = location.state;

  const [uploadedFileData, setUploadedFileData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Move the useNavigate hook call to the top level

  const gethotel = async () => {
    try {
      const res = await axios.get('/Logic/Hotelbyid?packid=' + packageId, {
        responseType: 'json',
      });
      console.log(res);
      if (Array.isArray(res.data)) {
        console.log('Data received:', res.data);
        setUploadedFileData(res.data);
      } else {
        console.log('Invalid data format received:', res.data);
        setError('Invalid data format received');
      }
    } catch (ex) {
      console.log('Error fetching data:', ex);
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    gethotel();
  }, [packageId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSelectHotel = (hotelId, hotelPrice) => {
    navigate('/book', { state: { packageId, packagePrice, hotelid: hotelId, hotelprice: hotelPrice } });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <h1>Hotels</h1>
      {uploadedFileData.map((item) => (
        <Card key={item.hotelId} sx={{ flex: '0 1 345px', margin: '20px' }}>
          <CardMedia
            sx={{ height: 140 }}
            image={`data:image/jpeg;base64,${item.hotelsImage}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.hotelName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.hotelPrice}
            </Typography>
            <Rating name="read-only" value={item.hotelRating} readOnly />
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => handleSelectHotel(item.hotelId, item.hotelPrice)}
            >
              Select
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default Hotel;
