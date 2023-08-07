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
import jwt_decode from 'jwt-decode';

export default function Login() {  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegistration = () => {
    if (!validateFields()) {
      return;
    }

    // Prepare the data to be sent in the POST request
    const data = {
      name: name,
      email: email,
      password: password,
    };

    // Make the POST request using axios
    axios
      .post('/Users/login', data)
      .then((response) => {
        // Handle the response from the server (if needed)
        console.log('Registration successful!', response.data);
        const encodedToken = response.data;
        const decodedToken = jwt_decode(encodedToken);
      
        // Store the decoded token in local storage
        sessionStorage.setItem('decodedToken', JSON.stringify(decodedToken));
      
        // Extract user role from the decoded token
        const userRole = decodedToken.role;
        const userid =parseInt(decodedToken.nameid, 10);
        console.log(userRole,userid)
        // Do something with the response, like showing a success message or redirecting
      })
      .catch((error) => {
        // Handle errors, like showing an error message to the user
        console.error('Registration failed:', error);
      });
  };

  const validateFields = () => {
    let valid = true;

    if (!emailValidator.validate(email)) { // Use the email-validator library for better email validation
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
    <section className='App'>
      <div className="register">
        <div className="col-1">
          <h2>Sign In</h2>
          <span>Enjoy the Travel</span>
          <div>
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
            <div>
              <div>
                <Button onClick={handleRegistration}>Sign In</Button>
              </div>
              <div>
              <Link to="/register" style={{textDecoration:'none'}}>
                <p>Don't have an account? Register here</p>
              </Link>             
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
