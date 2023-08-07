import React, { useState, useEffect } from 'react';
import axios from '../axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';



function Hotel() {
  const location = useLocation();
  const { packageId, packagePrice, duration } = location.state;
  console.log('hotel' + duration);
  const [uploadedFileData, setUploadedFileData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(''); // Step 1: Add search state

  const navigate = useNavigate();

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

  // Step 2: Create a function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearch(event.target.value);
  };

  // Step 3: Use .filter() to filter hotels by hotel name
  const filteredHotels = uploadedFileData.filter((hotel) =>
    hotel.hotelName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectHotel = (hotelId, hotelPrice) => {
    console.log('Selected Duration:', duration);
    navigate('/book', {
      state: {
        packid: packageId,
        packagePrice,
        hotelid: hotelId,
        hotelprice: hotelPrice,
        duration,
      },
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
     
      {/* Step 4: Add the search bar */}
      <TextField
          type="text"
          value={search}
        onChange={handleSearchInputChange}
          placeholder="Search by Hotel name..."
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              
                <SearchIcon style={{color:'blue'}} />
             
            ),
            style: { fontSize: '16px' },
          }}
        />
      
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredHotels.map((item) => (
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
    </div>
  );
}

export default Hotel;
