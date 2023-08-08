import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import imgfeed from '../Assets/Feedback.jpg'

function Feedback(userid,userrole) {
  const [inputValues, setInputValues] = useState({
    UserId: '',
    feedbackMessage: '',
    rating: '',
  });





  const handleFeed = async () => {
    const bookingData = {
      UserId: userid.UserId,
      feedbackMessage: inputValues.feedbackMessage,
      rating: inputValues.rating,
    };

    try {
      const response = await axios.post('/Feedbacks', bookingData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        console.log('Feedback submitted successfully!');
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
      <div style={{ marginTop:'50px'}}>
        <TextField
          label="Feedback Message"
          value={inputValues.feedbackMessage}
          onChange={handleFeedbackMessageChange}
          rows={4}
        />
      </div>
      <div style={{ marginTop:'50px'}}>
        <Typography>Rating :</Typography>
        <Rating value={inputValues.rating} onChange={handleRatingChange} />
      </div>
      <div>
        <Button onClick={handleFeed}>Submit</Button>
      </div>
    </div>
    </>
  );
}

export default Feedback;