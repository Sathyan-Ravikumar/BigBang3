import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import axios from '../axios';

function Feedback() {
  const [inputValues, setInputValues] = useState({
    UserId: '',
    feedbackMessage: '',
    rating: '',
  });

  const handleFeed = async () => {
    const bookingData = {
      UserId: 2,
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
      <div>
        <TextField
          label="Feedback Message"
          value={inputValues.feedbackMessage}
          onChange={handleFeedbackMessageChange}
        />
      </div>
      <div>
        <Rating
          value={inputValues.rating}
          onChange={handleRatingChange}
        />
      </div>
      <div>
        <Button onClick={handleFeed}>Submit</Button>
      </div>
    </>
  );
}

export default Feedback;
