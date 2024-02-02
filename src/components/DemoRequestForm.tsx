import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Theme
} from '@mui/material';

import "./styles/DemoRequest.css"





const DemoRequestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    organization: '',
    role: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted with data:', formData);
  };

  return (
    <div className='container__form__request_demo' id='container__form__request_demo'>
      <Grid container sx={{justifyContent:"center"}}>
        <Grid item xs={10} sm={8} md={6}>
          <Paper  elevation={3} sx={{padding:"3rem"}}>
            <Typography variant="h5" gutterBottom>
              Request a Demo
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Organization Name"
                name="organization"
                fullWidth
                margin="normal"
                variant="outlined"
                required
                value={formData.organization}
                onChange={handleChange}
              />
              <TextField
                label="Your Role"
                name="role"
                fullWidth
                margin="normal"
                variant="outlined"
                required
                value={formData.role}
                onChange={handleChange}
              />
              <TextField
                label="Professional Email"
                name="email"
                fullWidth
                margin="normal"
                variant="outlined"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                label="Password"
                name="password"
                fullWidth
                margin="normal"
                variant="outlined"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                fullWidth
                margin="normal"
                variant="outlined"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '20px' }}
              >
                Request Demo
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default DemoRequestForm;
