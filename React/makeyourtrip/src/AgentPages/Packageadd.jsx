import axios from '../axios';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import img from '../Assets/bag.jpg';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';

function AddPackages(userid, userrole) {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [inputValues, setInputValues] = useState({
    UserId: '',
    Place: '',
    Duration: '',
    PackagePrice: '',
    Description: '',
    PackImg: '',
  });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const [submitError, setSubmitError] = useState('');

  const handleUploadFile = async () => {
    if (!file) {
      setFileError('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('UserId', 2);
    formData.append('Place', inputValues.Place);
    formData.append('Duration', inputValues.Duration);
    formData.append('PackagePrice', inputValues.PackagePrice);
    formData.append('Description', inputValues.Description);
    formData.append('PackImg', file);
    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
    try {
      const response = await axios.post('/Packages', formData,config);

      if (response.status === 200) {
        console.log('Successfully added package:', response.data);
        const Newpackid = response.data.packageId;
        const daynum= response.data.duration;
        navigate('/itinerary', { state: {Newpackid,daynum } });
      } else {
        console.log('Received response:', response);
        setSubmitError('Failed to add the package. Please try again later.');
      }
    } catch (ex) {
      console.log('Error during API call:', ex);
      setSubmitError('An error occurred ');
    }
  };

  return (
    <>
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
          id="Place"
          name="Place"
          label="Place"
          variant="standard"
          value={inputValues.Place} // Updated to use inputValues
          onChange={handleInputChange} // Updated event handler
        />
        <TextField
          id="Duration"
          name="Duration"
          label="Duration"
          variant="standard"
          value={inputValues.Duration} // Updated to use inputValues
          onChange={handleInputChange} // Updated event handler
        />
        <TextField
          id="Price"
          name="PackagePrice" // Updated name to match the state property
          label="Price"
          variant="standard"
          value={inputValues.PackagePrice} // Updated to use inputValues
          onChange={handleInputChange} // Updated event handler
        />
        <TextField
          id="Description"
          name="Description"
          label="Description"
          variant="standard"
          value={inputValues.Description} // Updated to use inputValues
          onChange={handleInputChange} // Updated event handler
        />

        <TextField
          name="upload-photo"
          type="file"
          InputLabelProps={{
            shrink: true,
          }}
          label="Package Image"
          variant="standard"
          onChange={saveFile}
          required
          error={!!fileError}
          helperText={fileError}
        />

        <Button onClick={handleUploadFile}>Submit</Button>
        {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
      </Box>
    </>
  );
}

export default AddPackages;
