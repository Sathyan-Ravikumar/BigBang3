import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './login.css';
import img from '../Assets/bag.jpg';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from '../axios';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import emailValidator from 'email-validator'; // Import a robust email validation library
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [role, setRole] = useState('');
  const [gender, setGender] = useState('');
  const[address,setAddress]=useState('');
  const[contact,setContact]=useState('');
  const[agency,setAgency]=useState('');
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [imageDetailError, setImageDetailError] = useState('');
  const [fileError, setFileError] = useState('');
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


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

  const handleUserRegistration = () => {
    if (!validateFields()) {
      return;
    }
    // Prepare the data to be sent in the POST request
    const data = {
        Name: name,
        Email: email,
        Password: password,
        Role: role,
    };

    // Make the POST request using axios
    axios
      .post('/Users/registerUser', data)
      .then((response) => {
        // Handle the response from the server (if needed)
        console.log('User Registration successful!', response.data);
        // Do something with the response, like showing a success message or redirecting
      })
      .catch((error) => {
        // Handle errors, like showing an error message to the user
        console.error('User Registration failed:', error);
      });
  };

  const handleAgentRegistration = () => {
    if (!validateFields()) {
      return;
    }
    // Prepare the data to be sent in the POST request
    const formData = new FormData();
  formData.append('Name', name);
  formData.append('Email', email);
  formData.append('Password', password);
  formData.append('Role', role);
  formData.append('Gender', gender);
  formData.append('Address', address);
  formData.append('ContactNo', contact);
  formData.append('IdProofImg', file);
  formData.append('AgencyName', agency);

  axios
    .post('/Users/register', formData)
    .then((response) => {
      console.log('Registration successful!', response);
    })
    .catch((error) => {
      console.error('Registration failed:', error);
    });
};

  const handleRegistration = () => {
    if (role === 'User') {
      handleUserRegistration();
    } else if (role === 'Agent') {
      handleAgentRegistration();
    }
  };

  const Roles = ['User', 'Agent'];
  const Genders = ['Male', 'Female'];

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleContactChange = (event) => {
    setContact(event.target.value);
  };

  const handleAgencyChange = (event) => {
    setAgency(event.target.value);
  };
  const validateFields = () => {
    let valid = true;

    if (!emailValidator.validate(email)) {
      // Use the email-validator library for better email validation
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (password.trim() === '') {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    return valid;
  };

  return (
    <section className="App">
      <div className="register">
        <div className="col-1">
          <h2>Sign Up</h2>
          <span>Enjoy the Travel</span>
          <Stack
            component="form"
            sx={{
              width: '25ch',
            }}
            spacing={2}
            noValidate
            autoComplete="off"
          >
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="standard-basic"
                label="Name"
                variant="standard"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="standard-basic"
                label="Email"
                variant="standard"
                error={emailError}
                helperText={emailError ? 'Invalid email address' : ''}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                error={passwordError}
              />
              {passwordError && <FormHelperText error>Password is required</FormHelperText>}
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                sx={{
                  width: '27ch',
                }}
                value={role}
                onChange={handleRoleChange}
              >
                {Roles.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {role === 'Agent' && (
              <div className="togglerole">
                <FormControl variant="standard">
                  <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    sx={{
                      width: '27ch',
                    }}
                    value={gender}
                    onChange={handleGenderChange}
                  >
                    {Genders.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                  <TextField id="standard-basic" label="Address" onChange={handleAddressChange} value={address} variant="standard" />
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                  <TextField id="standard-basic" label="Contact Number" onChange={handleContactChange} value={contact} variant="standard" />
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                  <TextField
                    name="upload-photo"
                    type="file"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="IdProof"
                    variant="standard"
                    onChange={saveFile}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                  <TextField id="standard-basic" label="Agency Name" onChange={handleAgencyChange} value={agency} variant="standard" />
                </FormControl>
              </div>
            )}
            <div>
              <div>
                <Button onClick={handleRegistration}>Sign In</Button>
              </div>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <p>Already have an account? Login here</p>
              </Link>
            </div>
          </Stack>
        </div>
        <div className="col-2">
          <img src={img} alt="" />
        </div>
      </div>
    </section>
  );
}
