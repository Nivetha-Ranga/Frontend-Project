import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#E6E6FA',
        padding: '20px 0',
        marginTop: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" color="textSecondary" align="center">
          © 2024 My App. All rights reserved.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
            gap: '15px',
          }}
        >
          <Link href="https://facebook.com" target="_blank" color="inherit">
            <Facebook />
          </Link>
          <Link href="https://twitter.com" target="_blank" color="inherit">
            <Twitter />
          </Link>
          <Link href="https://instagram.com" target="_blank" color="inherit">
            <Instagram />
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
