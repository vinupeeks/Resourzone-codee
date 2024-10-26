import React, { useState } from 'react';
import { TextField, Button, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import imgage from '../images/loginImg.jpg'

function LoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (event) => {
    console.log(formData);

    event.preventDefault();
    try {
      const { email, password } = formData;
      const response = await axios.post('https://resourzone-codeedex.onrender.com/auth/login', {
        email,
        password,
      });
      console.log(response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success('Logged In');
        setIsLoggedIn(true);
        navigate('/dashboard');
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f6fa',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: { xs: '100%', md: '60%' },
          boxShadow: 3,
          borderRadius: '10px',
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#ffffff',
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center',
            alignItems: 'center',
            p: 4,
          }}
        >
          <img
            src={imgage}
            alt="Login illustration"
            style={{ width: '100%', maxWidth: '350px' }}
          />
        </Box>

        {/* Right Section with Form */}
        <Box sx={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
            Admin Login
          </Typography>

          {/* Email Input */}
          <TextField
            fullWidth
            name="email"
            placeholder='Email'
            variant="outlined"
            onChange={handleChange}
            value={formData.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2, backgroundColor: '#F6F6F9', borderRadius: '5px' }}
          />

          {/* Password Input */}
          <TextField
            fullWidth
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            variant="outlined"
            onChange={handleChange}
            value={formData.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2, backgroundColor: '#F6F6F9', borderRadius: '5px' }}
          />

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{
              mb: 2,
              backgroundColor: '#6C63FF',
              fontWeight: 'bold',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              '&:hover': {
                backgroundColor: '#5a53e2',
              },
            }}
          >
            LOGIN
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
