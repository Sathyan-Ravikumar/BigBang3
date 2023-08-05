import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import './login.css';
import img from '../Assets/bag.jpg';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Your backend API endpoint
const API_URL = 'https://localhost:7115/api/Users/login';

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignIn = () => {
    if (!validateFields()) {
      return;
    }

    // Get the input values
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Prepare the data to be sent in the POST request
    const data = {
      email: email,
      password: password,
    };

    // Make the POST request using axios
    axios
      .post(API_URL, data)
      .then((response) => {
        // Handle the response from the server (if needed)
        console.log('Registration successful!', response.data);
        // Do something with the response, like showing a success message or redirecting
      })
      .catch((error) => {
        // Handle errors, like showing an error message to the user
        console.error('Registration failed:', error);
      });
  };

  const validateFields = () => {
    let valid = true;

    if (!emailRegex.test(emailRef.current.value)) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (passwordRef.current.value.trim() === '') {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    return valid;
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <section className='App'>
      <div className="register">
        <div className="col-1">
          <h2>Sign In</h2>
          <span>Enjoy the Travel</span>
          <div>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <TextField
                inputRef={emailRef}
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
                inputRef={passwordRef}
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
            <div>
              <div>
                <Button onClick={handleSignIn}>Sign In</Button>
              </div>
              <div>
                <p>Don't have an account? Register here</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-2">
          <img src={img} alt="" />
        </div>
      </div>
    </section>
  );
};
