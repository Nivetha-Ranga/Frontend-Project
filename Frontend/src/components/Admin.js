
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Container, Box } from '@mui/material';

export default function Admin({ onAdminLogin }) {
  const [securityCode, setSecurityCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    if (isAuthenticated) {
      onAdminLogin();
      axios.get('http://localhost:5000/orders') 
        .then(response => {
          setOrders(response.data);
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
    }
  }, [isAuthenticated]);

  const handleSecurityCodeSubmit = () => {
    const correctCode = 'admin123'; 
    if (securityCode === correctCode) {
      setIsAuthenticated(true);

    } else {
      alert('Incorrect security code');
    }
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" style={{ marginTop: '10px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2>Admin Login</h2>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Enter Security Code"
            type="password"
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSecurityCodeSubmit}
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: '50px' }}>
      <h1>Admin View</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.product.productName}</TableCell>
            <TableCell>{order.quantity}</TableCell>
            <TableCell>{order.product.price}</TableCell>
            <TableCell>{`${order.firstName} ${order.lastName}`}</TableCell>
            <TableCell>{order.quantity * order.product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
