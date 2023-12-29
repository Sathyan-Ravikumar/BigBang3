import axios from '../axios';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import img from '../Assets/bag.jpg';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';

function AddHotels(userid, userrole) {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const [inputValues, setInputValues] = useState({
        PackageId: '',
        HotelName: '',
        HotelRating: '',
        HotelPrice: '',
        HotelImage: '',
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

        // Additional validation for HotelRating
        if (name === 'HotelRating') {
            const parsedValue = parseFloat(value);
            if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 5) {
                setImageDetailError('Hotel rating should be between 1 and 5.');
            } else {
                setImageDetailError('');
            }
        }

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

        formData.append('PackageId', inputValues.PackageId);
        formData.append('HotelName', inputValues.HotelName);
        formData.append('HotelRating', inputValues.HotelRating);
        formData.append('HotelPrice', inputValues.HotelPrice);
        formData.append('HotelImage', file);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        try {
            const response = await axios.post('/Hotels', formData, config);

            if (response.status === 200) {
                console.log('Successfully added Hotel:', response.data);
                setInputValues({
                    PackageId: '',
                    HotelName: '',
                    HotelRating: '',
                    HotelPrice: '',
                    HotelImage: '',
                    PackImg: '',
                });
                setFile(null);
                setFileName('');

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
                    id="PackageId"
                    name="PackageId"
                    label="Package Id"
                    variant="standard"
                    value={inputValues.PackageId}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    id="HotelName"
                    name="HotelName"
                    label="Hotel Name"
                    variant="standard"
                    value={inputValues.HotelName}
                    onChange={handleInputChange}
                    required
                />

                <TextField
                    id="HotelRating"
                    name="HotelRating"
                    label="Hotel Rating"
                    variant="standard"
                    value={inputValues.HotelRating}
                    onChange={handleInputChange}
                    error={!!imageDetailError}
                    helperText={imageDetailError}
                    required
                />

                <TextField
                    id="HotelPrice"
                    name="HotelPrice"
                    label="price"
                    variant="standard"
                    value={inputValues.HotelPrice}
                    onChange={handleInputChange}
                    required
                />

                <TextField
                    name="upload-photo"
                    type="file"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    label="Hotel Image"
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

export default AddHotels;
