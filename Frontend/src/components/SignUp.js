import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const { register, handleSubmit, watch, formState: { errors }, setError } = useForm();
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Submitting data to the backend
      const response = await axios.post('http://localhost:8080/auth-app/register-user', {
        emailId: data.email,            
        name: data.name,
        password: data.password,
        address: data.address,
        phoneNo: data.phoneNo,
        role: 'ROLE_USER',               // Default role
        status: 'Active',                // Default status
      });
      alert('Signup successful:', response.data);
      navigate('/login');                // Redirect to login page on successful signup
    } catch (error) {
      console.error('Error during signup:', error);
      setServerError('Error during signup. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
          marginTop: '50px',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Signup
        </Typography>
        {serverError && <Alert severity="error">{serverError}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Full Name"
            {...register('name', { required: 'Full name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Address"
            {...register('address', { required: 'Address is required' })}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Phone Number"
            type="number"
            {...register('phoneNo', { required: 'Phone number is required' })}
            error={!!errors.phoneNo}
            helperText={errors.phoneNo?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            {...register('confirmPassword', {
              required: 'Confirm password is required',
              validate: (value) => value === watch('password') || 'Passwords do not match',
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
}
