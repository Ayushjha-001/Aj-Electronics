import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, CircularProgress, Box } from '@mui/material';

function CheckoutForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    shippingAddress: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      await onSubmit(formData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        Billing Information
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            name="name"
            label="Full Name"
            fullWidth
            variant="standard"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="email"
            label="Email Address"
            fullWidth
            variant="standard"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Shipping Information
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            name="shippingAddress"
            label="Shipping Address"
            fullWidth
            variant="standard"
            value={formData.shippingAddress}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Payment Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="cardNumber"
            label="Card Number"
            fullWidth
            variant="standard"
            value={formData.cardNumber}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="cardName"
            label="Name on Card"
            fullWidth
            variant="standard"
            value={formData.cardName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            name="expiry"
            label="Expiry Date"
            fullWidth
            variant="standard"
            placeholder="MM/YY"
            value={formData.expiry}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            name="cvc"
            label="CVC"
            fullWidth
            variant="standard"
            placeholder="3 or 4 digits"
            value={formData.cvc}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      {loading && <CircularProgress />}
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 4, mb: 4 }} disabled={loading}>
        Place Order
      </Button>
    </form>
  );
}

export default CheckoutForm;
