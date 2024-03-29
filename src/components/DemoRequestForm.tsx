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
import { ToastContainer, toast } from 'react-toastify';
import "./styles/DemoRequest.css"
import { render } from 'react-dom';
import SiteNameForm from './SiteNameForm';
import OrganizationDetailsForm from './OrganizationDetailsForm';
import SubscriptionPlanPicker from './SubscriptionPlanPicker';
import AxiosInstance from './api/AxiosInstance';




const steps = ['Choose Site name', 'Enter your organization info', 'Choose a Plan'];

const DemoRequestForm: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [planChoosen , setPlanChoosen] = useState<SubscriptionPlan>({} as SubscriptionPlan);
  let [formData, setFormData] = useState<RequestDemoObj>({
    organizationName: '',
    requestorRole: '',
    requestorProfessionalEmail: '',
    requestorName: '',
    requestorTemporaryPassword: '',
    requestorTemporaryPasswordConfirm: '',
    subscriptionType: '',
  });

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
  // called first
  const handleSetDomainName = (value: string) => {
    const merged = { ...formData, domainName: value };
    console.log(merged);
    setFormData(merged);
    handleNext();
  }

  // called second
  const handleOrganizationDetailsFormFilled = (data: RequestDemoObj) => {
    const merged = { ...formData, ...data };
    console.log(merged);
    setFormData(merged);
    handleNext();
  }
  // called third
  const handleSubscriptionPlanChoosen = (plan: SubscriptionPlan) => {
    const merged = { ...formData, subscriptionType: plan.type };
    console.log(merged);
    setFormData(merged);
    setPlanChoosen(plan);
    handleNext();   
  }
  const callApi = () => {
    // disable submit button
    setFormSubmitted(true);
    AxiosInstance.post('/tenantService/api/cl/subscriptions/subscribe?isDemo=true', formData).then((response) => {
      console.log(response);
      toast.success('Request submitted successfully Please check your email for further instructions');
      setTimeout(() => {
        const response = confirm("Open Gmail to check email?");
        if (response) {
          window.open('https://mail.google.com/mail/u/0/#inbox', '_blank');
        }
      },2000);
    }).catch((error) => {
      console.error(error);
      toast.error('Somthing went wrong! Please try again.');
      // go to email in alert   
      // open gmail in new window 
      
    });
  }

  function renderStep(activeStep: number): React.ReactNode {
    switch (activeStep) {
      case 0:
        return <SiteNameForm  onDomainChoosen={handleSetDomainName}/>
      case 1:
        return <OrganizationDetailsForm onFormFilled={handleOrganizationDetailsFormFilled}/>
      case 2:
        return <SubscriptionPlanPicker onSubscriptionPlanChoosen={handleSubscriptionPlanChoosen} />
      case 3:
        return <div>Step 4</div>
      default:
        return <div>Step 1</div>
    }
  }

  return (
    <div className='container__form__request_demo' id='container__form__request_demo'>
      <ToastContainer position="top-right" />
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
          <Typography sx={{ mt: 2, mb: 3 }}>
            Almost done! Please review your details and click submit.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 5,justifyContent:'space-between',mb:5 }}>
            <Box sx={{flex:1}}>
              <Typography sx={{mb:2}}  variant="h6"  gutterBottom>
                Organization Information
              </Typography>
              <Typography  sx={{mb:2}} variant="body1" gutterBottom>
               Organization Name: <strong>{formData.organizationName}</strong>
              </Typography>
              <Typography  sx={{mb:2}} variant="body1" gutterBottom>
               Domain name: <strong>{formData.domainName}.oneshoot.com</strong>
              </Typography>
              <Typography  sx={{mb:2}} variant="body1" gutterBottom>
                Your Role:
                <strong>{formData.requestorRole}</strong>
              </Typography>
              <Typography  sx={{mb:2}} variant="body1" gutterBottom>
                Your Email: <strong>{formData.requestorProfessionalEmail}</strong> 
              </Typography>
              <Typography  sx={{mb:2}} variant="body1" gutterBottom>
                Your Name: <strong>{formData.requestorName}</strong>
              </Typography>
            </Box>
            <Box sx={{flex:1}}>
              <Typography  sx={{mb:2}} variant="h6" gutterBottom>
                Subscription Plan
              </Typography>
              <Typography  sx={{mb:2}} variant="body1" gutterBottom>
                <strong>{formData.subscriptionType}</strong>
              </Typography>
              <Typography  sx={{mb:2}} variant="body1" gutterBottom>
                <strong>{planChoosen.price}</strong>
              </Typography>
              <Box >
                <ul>
                  {
                    planChoosen.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))
                  }
                </ul>
                </Box>
            </Box>
          </Box>
          <Button variant="contained" color="primary"  onClick={callApi}>
            Submit
          </Button>
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
                {/* <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button> */}
              </Box>
              </Box>
            
        </React.Fragment>
      )}
    </Box>
    </div>
  );
};

export default DemoRequestForm;
