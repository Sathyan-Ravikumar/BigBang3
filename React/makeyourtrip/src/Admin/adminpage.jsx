import axios from '../axios';
import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import img from '../Assets/bag.jpg';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// ... (other imports and code)

function AdminImage() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const [inputValues, setInputValues] = useState({
      UserId: '',
      ImageDetail: '',
    });
    const [imageDetailError, setImageDetailError] = useState('');
    const [fileError, setFileError] = useState('');
  
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
      const alphabetRegex = /^[A-Za-z]*$/;
      if (name === 'ImageDetail') {
        if (!alphabetRegex.test(value) && value !== '') {
          setImageDetailError('Image Detail should contain only alphabets');
        } else {
          setImageDetailError('');
        }
      }
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };
  
    const uploadFile = async () => {
      if (!file) {
        setFileError('Please select a file.');
        return;
      }
  
      const formData = new FormData();
      formData.append('UserId', inputValues.UserId);
      formData.append('ImageDetail', inputValues.ImageDetail);
      formData.append('formFile', file);
      try {
        const res = await axios.post('/AdminImageUploads/AllAdminColumn', formData);
        console.log(res);
        window.location.reload();

      } catch (ex) {
        console.log(ex);
      }
    };
  
    return (
      <>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          id="form"
          className="flex flex-col"
        >
           <TextField
              id="UserId"
              name="UserId"
              label="User id"
              variant="standard"
              value={inputValues.UserId}
              onChange={handleInputChange}
            />
          <TextField
            id="ImageDetail"
            name="ImageDetail"
            label="Location"
            variant="standard"
            value={inputValues.ImageDetail}
            onChange={handleInputChange}
            required
            error={!!imageDetailError}
            helperText={imageDetailError}
          />
  
          <TextField
            name="upload-photo"
            type="file"
            InputLabelProps={{
              shrink: true,
            }}
            label="Image"
            variant="standard"
            onChange={saveFile}
            required
            error={!!fileError}
            helperText={fileError}
          />
  
          <Button onClick={uploadFile}>Submit</Button>
        </Box>
      </>
    );
  }
  
  export default AdminImage;
  