import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Theme
} from '@mui/material';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


import "./styles/DemoRequest.css"
import { render } from 'react-dom';
import SiteNameForm from './SiteNameForm';




const steps = ['Choose Site name', 'Enter your organization info', 'Check Guide'];

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

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  function renderStep(activeStep: number): React.ReactNode {
    switch (activeStep) {
      case 0:
        return <SiteNameForm />
      case 1:
        return <div>Step 22</div>
      case 2:
        return <div>Step 3</div>
      case 3:
        return <div>Step 4</div>
      default:
        return <div>Step 1</div>
    }
  }

  return (
    <div className='container__form__request_demo' id='container__form__request_demo'>
      {/* <Grid container sx={{justifyContent:"center"}}>
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
      </Grid> */}
       <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </React.Fragment>
      ) : (
            <React.Fragment >
              <Box sx={{display:"block"}}>
              {
                renderStep(activeStep)
              }
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
              </Box>
            
        </React.Fragment>
      )}
    </Box>
    </div>
  );
};

export default DemoRequestForm;
