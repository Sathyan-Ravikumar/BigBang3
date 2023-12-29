import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import imgfeed from '../Assets/Feedback.jpg'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import GetFeedback from './getfeedback';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';



const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function Feedback(userid, userrole) {

  const [feedbackData, setFeedbackData] = useState([]);

  const getfeed = async () => {
    try {
      const res = await axios.get('/Feedbacks', {
        responseType: 'json',
      });
      if (Array.isArray(res.data)) {
        setFeedbackData(res.data);
      } else {
        console.log('Invalid data format received:', res.data);
      }
    } catch (ex) {
      console.log('Error fetching data:', ex);
    }
  };

  useEffect(() => {
    getfeed();
  }, []);


  const [inputValues, setInputValues] = useState({
    
    feedbackMessage: '',
    rating: '',
    name: ''
  });

  const [errors, setErrors] = useState({
    feedbackMessage: '',
    rating: '',
    name: ''
  });

  const handleFeed = async () => {
    const { feedbackMessage, rating, name } = inputValues;

    if (!feedbackMessage || !rating || !name) {
      setErrors({
        feedbackMessage: !feedbackMessage ? 'Feedback Message is required' : '',
        rating: !rating ? 'Rating is required' : '',
        name: !name ? 'Name is required' : ''
      });
      return;
    }

    const bookingData = {
      UserId: userid.userId,
      feedbackMessage:inputValues.feedbackMessage,
      rating:inputValues.rating,
      name:inputValues.name,
    };
console.log(bookingData);
    try {
      const response = await axios.post('/Feedbacks', bookingData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        console.log('Feedback submitted successfully!');
        // Clear the form after successful submission if needed
        setInputValues({
          UserId: '',
          feedbackMessage: '',
          rating: '',
          name: ''
        });
      } else {
        console.log('Feedback submission failed:', response.statusText);
      }
    } catch (ex) {
      console.log('Error while submitting feedback:', ex);
    }
  };

  const handleFeedbackMessageChange = (event) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      feedbackMessage: event.target.value,
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      rating: newValue,
    }));
  };

  return (
    <>

      <div className="parallax-container">
        <div className="parallax-image">
          <img src={imgfeed} alt="Background" />
        </div>
        <div className="parallax-content">
          <div className="content">
            <h1>FeedBack...</h1>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center horizontally
          justifyContent: 'center', // Center vertically
          minHeight: '100vh', // Make the container at least the height of the viewport

        }}
      >
        <div>
          <h3> FeedBack Form </h3>
        </div>
        <div style={{ marginTop: '50px' }}>
          <div>
          <TextField
            label="Name"
            value={inputValues.name}
            onChange={(e) => {
              setInputValues((prevValues) => ({
                ...prevValues,
                name: e.target.value,
              }));
              setErrors((prevErrors) => ({
                ...prevErrors,
                name: '',
              }));
            }}
            variant="standard"
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          </div>
          <div>
          <TextField
            label="Feedback Message"
            value={inputValues.feedbackMessage}
            onChange={handleFeedbackMessageChange}
            rows={4}
            variant="standard"
            error={Boolean(errors.feedbackMessage)}
            helperText={errors.feedbackMessage}
          />
          </div>
        </div>
        <div style={{ marginTop: '50px' }}>
          <Typography>Rating :</Typography>
          <Rating value={inputValues.rating} precision={0.5} onChange={handleRatingChange} />
          {errors.rating && <Typography color="error">{errors.rating}</Typography>}
        </div>
        <div>
          <Button onClick={handleFeed}>Submit</Button>
        </div>
        <Divider />
      </div>
   
   

      <div style={{marginLeft:'10%',marginBottom:'10%'}}>
        <h2 style={{textAlign:'center',marginBottom:'5%'}}>FeedBack Received From Our Customer</h2>
        <Carousel responsive={responsive}>
        {feedbackData.map((feedback) => (
        <Card key={feedback.id} sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" />}
             title={feedback.name}
             subheader={feedback.entryDate}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {feedback.feedbackMessage}
            </Typography>
            <Rating name="read-only" precision={0.5} value={feedback.rating} readOnly />
          </CardContent>
        </Card>
      ))}
        </Carousel>
      </div>
    </>
  );
}

export default Feedback;