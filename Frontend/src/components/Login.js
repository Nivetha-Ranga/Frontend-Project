
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

export default function Login({ onLogin }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/auth-app/login-check', data); 
      const { token } = response.data;

      localStorage.setItem('jwtToken', token);
      
      onLogin();
      alert(localStorage.getItem('jwtToken'))//i am getting undefined
      console.log(response.data)

      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error);
      setServerError('Incorrect username or password');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
        marginTop: '50px'
      }}>
        <Typography component="h1" variant="h5">Login</Typography>
        {serverError && <Alert severity="error">{serverError}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            style={{ marginBottom: '20px' }}
            label="Email"
            fullWidth
            required
            {...register('emailId', { required: 'Email is required' })}
            error={!!errors.emailId}
            helperText={errors.emailId?.message}
          />
          <TextField
            label="Password"
            fullWidth
            required
            type="password"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>Login</Button>
        </form>
      </Box>
    </Container>
  );
}
