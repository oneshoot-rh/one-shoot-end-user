import { Button, Grid, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react";




const OrganizationDetailsForm = () => {

    const [formData, setFormData] = useState({
        organization: '',
        role: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        <form onSubmit={handleSubmit}>
        <Grid container  spacing={2} p="2rem" pb="4rem">
        <Grid item xs={8} sm={8} md={6} >
            <Typography variant="h6" gutterBottom>
                Organization Information
            </Typography>
              <TextField
                label="Organization Name"
                name="organization"
                fullWidth
                margin="normal"
                variant="outlined"
                required
                value={formData.organization}
                        onChange={handleChange}
                        size="small"
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
                        size="small"
              />

          
            </Grid>
                <Grid item xs={8} sm={12} md={6} >
                    <Typography variant="h6" gutterBottom>
                        Creator Information
                    </Typography>
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
                        size="small"
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
                        size="small"
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
                        size="small"
              />
                </Grid>
      </Grid> 
            </form>
    )
}


export default OrganizationDetailsForm