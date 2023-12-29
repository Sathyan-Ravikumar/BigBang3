import axios from '../axios';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';

function Additinerary() {
  const location = useLocation();
  const { Newpackid, daynum } = location.state;

  const [itineraryForm, setItineraryForm] = useState({
    DayNumber: '',
    Activities: '',
    Time: '',
    ItineraryPlace: '',
  });

  const [file, setFile] = useState();
  const [fileError, setFileError] = useState('');
  const navigate = useNavigate();

  const saveFile = (e) => {
    const selectedFile = e.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.svg)$/i;
    if (allowedExtensions.test(selectedFile.name)) {
      setFile(selectedFile);
      setFileError('');
    } else {
      setFileError('Please select a file with the following extensions: .jpg, .jpeg, .png, .svg');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItineraryForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    const formData = new FormData();
    formData.append('PackageId', Newpackid);
    formData.append('DayNumber', itineraryForm.DayNumber);
    formData.append('Activities', itineraryForm.Activities);
    formData.append('Time', itineraryForm.Time);
    formData.append('ItineraryPlace', itineraryForm.ItineraryPlace);
    formData.append('ItineraryImg', file);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      const response = await axios.post('/ItineraryDetails', formData, config);

      if (response.status === 200) {
        console.log('Successfully added itinerary:', response.data);
        window.location.reload();
        
      } else {
        console.log('Received response:', response);
      }
    } catch (ex) {
      console.log('Error during API call:', ex);
    }
  };

  return (
    <>
      <div style={{ marginLeft: '10%', alignItems: 'center', color: 'black' }}>
        <h4>Number of Days You Entered In Your Package : {daynum}</h4>
      </div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        autoComplete="off"
        id="form"
        className="flex flex-col"
      >
        <TextField
          id="Daynumber"
          name="DayNumber"
          label="Day Number"
          required
          variant="standard"
          type="number"
          value={itineraryForm.DayNumber}
          onChange={handleInputChange} 
        />
        <TextField
          id="Activities"
          name="Activities"
          label="Activities"
          variant="standard"
          required
          value={itineraryForm.Activities}
          onChange={handleInputChange}
        />
        <TextField
          id="Time"
          name="Time"
          label="Time"
          required
          variant="standard"
          value={itineraryForm.Time}
          onChange={handleInputChange}
        />
        <TextField
          id="ItineraryPlace"
          name="ItineraryPlace"
          label="Itinerary Place"
          variant="standard"
          required
          value={itineraryForm.ItineraryPlace}
          onChange={handleInputChange}
        />

        <TextField
          name="upload-photo"
          type="file"
          InputLabelProps={{
            shrink: true,
          }}
          label="Itinerary Image"
          variant="standard"
          onChange={saveFile}
          required
          error={!!fileError}
          helperText={fileError}
        />

        <Button onClick={handleFormSubmit}>Submit</Button>
      </Box>
    </>
  );
}

export default Additinerary;
