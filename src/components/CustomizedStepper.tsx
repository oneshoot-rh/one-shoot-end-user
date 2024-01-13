import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AutorenewIcon from '@mui/icons-material/Autorenew';import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./styles/CustomizedStepper.css"


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 136deg, var(--color-secondary) 0%, var(--color-secondary) 50%, var(--color-secondary)  87%);',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 136deg, var(--color-secondary) 0%, var(--color-secondary) 50%, var(--color-secondary)  87%);',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, var(--color-secondary) 0%, var(--color-secondary) 50%, var(--color-secondary)  87%);',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, var(--color-secondary) 0%, var(--color-secondary) 50%, var(--color-secondary)  87%);',
  }),
}));


function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <CloudUploadIcon />,
    2: <AutorenewIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export default function CustomizedSteppers(props: any) {
    const steps: [] = props.steps;
    const activeStep: number = props.activeStep;
    const stepsComponents = props.stepsComponents || [
        <div>Step 1</div>,
        <div>Step 2</div>,
        <div>Step 3</div>
    ]
    const renderStep = (step: number) => {
        switch (step) {
            case 0:
                return stepsComponents[0]
            case 1:
                return stepsComponents[1]
            case 2:
                return stepsComponents[2]
            default:
                return stepsComponents[0]
        }
    }


  return (
    <Stack sx={{ width: '100%' }} spacing={4} className='stepper_stack'>
          <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector  /> } >
            {steps.map((label,index) => (
            <Step key={label} className='step___'>
                    <StepLabel className='step__label' StepIconComponent={() => <ColorlibStepIcon active={index === activeStep} completed={index < activeStep} icon={index + 1} />}>{label}</StepLabel>
            </Step>
            ))}
        </Stepper>
        {activeStep === steps.length ? (
              <React.Fragment>
                  <div className='step__container'>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={()=> {}}>Reset</Button>
                    </Box>
                  </div>
            </React.Fragment>
        ) : (
                <React.Fragment>
                      <div className='step__container'>
                            {
                                renderStep(activeStep)
                            }
                      </div>
                </React.Fragment>
            )}
    </Stack>
  );
}