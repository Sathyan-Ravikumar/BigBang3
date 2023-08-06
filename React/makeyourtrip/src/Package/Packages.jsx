import React, { useState, useEffect } from 'react';
import axios from '../axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Hotel from './Hotels';
import { useNavigate,useLocation } from 'react-router-dom';

function Package() {
  const [file, setFile] = useState();
  const [uploadedFileData, setUploadedFileData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [additionalData, setAdditionalData] = useState([]); // State to store additional data

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

  const getAnotherData = async (packageId) => {
    try {
      const res = await axios.get(`/Logic/ItineraryByPackId?packid=${packageId}`, {
        responseType: 'json',
      });
      console.log(res);
      if (Array.isArray(res.data)) {
        console.log('Additional data received:', res.data);
        setAdditionalData(res.data); // Set the additional data in the state
      } else {
        console.log('Invalid additional data format received:', res.data);
        setAdditionalData([]); // Clear the state if invalid data format received
      }
    } catch (ex) {
      console.log('Error fetching additional data:', ex);
      setAdditionalData([]); // Clear the state on error
    }
  };

  useEffect(() => {
    getpack();
  }, []);

  const handleChange = (panel) => async (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (isExpanded) {
      const packageId = panel.replace('panel', '');
      await getAnotherData(packageId); // Call the new GET method with the specific packageId
    }
  };



  const navigate = useNavigate();
  const location = useLocation();

  const handleSelect = (packageId, packagePrice,duration) => {
    // Pass the data as state using the location object and navigate to the Hotel component
    navigate('/hotel', { state: { packageId, packagePrice,duration } });
    console.log(duration);
  };


  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {uploadedFileData.map((item) => (
        <Card key={item.packageId} sx={{ flex: '0 1 345px', margin: '20px' }}>
          <CardMedia sx={{ height: 140 }} image={`data:image/jpeg;base64,${item.placeImage}`} />
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

            <Accordion expanded={expanded === `panel${item.packageId}`} onChange={handleChange(`panel${item.packageId}`)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${item.packageId}bh-content`} id={`panel${item.packageId}bh-header`}>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>Itinerary</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* Display the additional data fetched based on packageId */}
                {additionalData.map((dataItem) => (
                  <div key={dataItem.itineraryId}>
                     <Typography >Day :{dataItem.dayNumber}</Typography>
                    <CardMedia sx={{ height: 140 }} image={`data:image/jpeg;base64,${dataItem.itineraryImage}`} />
                    <Typography >Place : {dataItem.itineraryPlace}</Typography>
                    <Typography >Activity : {dataItem.activities}</Typography>
                    <Typography >Time : {dataItem.time}</Typography>
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          </CardContent>
          <CardActions>
          <Button size="small" onClick={() => handleSelect(item.packageId, item.packagePrice,item.duration)}>Select</Button>          </CardActions>
        </Card>
      ))}
  </div>
  );
}

export default Package;
