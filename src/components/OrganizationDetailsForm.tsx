import { Button, Grid, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react";




const OrganizationDetailsForm = ({onFormFilled}) => {

  const [formData, setFormData] = useState<RequestDemoObj>({
    organizationName: '',
    requestorRole: '',
    requestorProfessionalEmail: '',
    requestorName: '',
    requestorTemporaryPassword: '',
    requestorTemporaryPasswordConfirm: '',
  });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFormFilled(formData);
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
                  name="organizationName"
                  fullWidth
                  margin="normal"
                  autoComplete="organization"
                  variant="outlined"
                  required
                  value={formData.organizationName}
                          onChange={handleChange}
                          size="small"
                />
                <TextField
                  label="Your Role"
                  name="requestorRole"
                  autoComplete="role"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  required
                  value={formData.requestorRole}
                          onChange={handleChange}
                          size="small"
                />
                <TextField
                  label="Your Name"
                  name="requestorName"
                  autoComplete="name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  required
                  value={formData.requestorName}
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
                  name="requestorProfessionalEmail"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type="email"
                  required
                  value={formData.requestorProfessionalEmail}
                          onChange={handleChange}
                          size="small"
                />
                <TextField
                  label="Temporary Password"
                  name="requestorTemporaryPassword"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type="password"
                  required
                  value={formData.requestorTemporaryPassword}
                          onChange={handleChange}
                          size="small"
                />
                <TextField
                  label="Confirm Password"
                  name="requestorTemporaryPasswordConfirm"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type="password"
                  required
                  value={formData.requestorTemporaryPasswordConfirm}
                          onChange={handleChange}
                          size="small"
                />
              </Grid>
          </Grid> 
          <Grid container justifyContent="start">
              <Button variant="contained" color="primary" type="submit">
                  Submit
              </Button>
          </Grid>
        </form>
    )
}


export default OrganizationDetailsForm