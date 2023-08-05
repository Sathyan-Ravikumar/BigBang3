import React, { useState, useEffect } from 'react';
import axios from '../axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Package() {
  const [file, setFile] = useState();
  const [uploadedFileData, setUploadedFileData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getpack = async () => {
    try {
      const res = await axios.get('/Packages', {
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
    getpack();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {uploadedFileData.map((item) => (
        <Card key={item.packageId} sx={{ flex: '0 1 345px', margin: '20px' }}>
          <CardMedia
            sx={{ height: 140 }}
            image={`data:image/jpeg;base64,${item.placeImage}`}
            title={item.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.place} 
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.duration}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.packagePrice}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Select</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default Package;
