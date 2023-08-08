import axios from '../axios';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';

function Additinerary() {
  const location = useLocation();
  const { Newpackid, daynum } = location.state;

  const [itineraryForms, setItineraryForms] = useState([{  daynum }]);

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [imageDetailError, setImageDetailError] = useState('');
  const [fileError, setFileError] = useState('');

  const navigate = useNavigate();

  const saveFile = (e) => {
    const selectedFile = e.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.svg)$/i;
    if (allowedExtensions.test(selectedFile.name)) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileError('');
    } else {
      setFileError('Please select a file with the following extensions: .jpg, .jpeg, .png, .svg');
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedForms = [...itineraryForms];
    updatedForms[index] = { ...updatedForms[index], [name]: value };
    setItineraryForms(updatedForms);
  };

  const handleUploadFile = async (index) => {
    const formData = new FormData();
    formData.append('PackageId', Newpackid);
    formData.append('DayNumber', itineraryForms[index].DayNumber);
    formData.append('Activities', itineraryForms[index].Activities);
    formData.append('Time', itineraryForms[index].Time);
    formData.append('ItineraryPlace', itineraryForms[index].ItineraryPlace);
    formData.append('ItineraryImg', file);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    try {
      const response = await axios.post('/ItineraryDetails', formData, config);

      if (response.status === 200) {
        console.log('Successfully added package:', response.data);
        const Newpackid = response.data.packageId;
        const daynum = response.data.duration;
        navigate('/itinerary', { state: { Newpackid, daynum } });
      } else {
        console.log('Received response:', response);
        // Handle error here
      }
    } catch (ex) {
      console.log('Error during API call:', ex);
      // Handle error here
    }
  };

  const addForm = () => {
    setItineraryForms([...itineraryForms, { daynum }]);
  };

  const removeForm = (index) => {
    const updatedForms = [...itineraryForms];
    updatedForms.splice(index, 1);
    setItineraryForms(updatedForms);
  };

  return (
    <>
      {itineraryForms.map((form, index) => (
        <Box
          key={index}
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          autoComplete="off"
          id="form"
          className="flex flex-col"
        >
          <TextField
            id={`Daynumber-${index}`}
            name="DayNumber"
            label="Day Number"
            variant="standard"
            value={form.DayNumber}
            onChange={(e) => handleInputChange(e, index)}
          />
          <TextField
            id={`Activities-${index}`}
            name="Activities"
            label="Activities"
            variant="standard"
            value={form.Activities}
            onChange={(e) => handleInputChange(e, index)}
          />
          <TextField
            id={`Time-${index}`}
            name="Time"
            label="Time"
            variant="standard"
            value={form.Time}
            onChange={(e) => handleInputChange(e, index)}
          />
          <TextField
            id={`ItineraryPlace-${index}`}
            name="ItineraryPlace"
            label="Itinerary Place"
            variant="standard"
            value={form.ItineraryPlace}
            onChange={(e) => handleInputChange(e, index)}
          />

          <TextField
            name={`upload-photo-${index}`}
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

          <Button onClick={() => handleUploadFile(index)}>Submit</Button>
          <Button onClick={() => removeForm(index)}>Remove Itinerary Form</Button>
        </Box>
      ))}
      <Button onClick={addForm}>Add Itinerary Form</Button>
    </>
  );
}

export default Additinerary;
