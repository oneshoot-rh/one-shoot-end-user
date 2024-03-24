import { Box, Button } from "@mui/material"
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import "./styles/GettingStarted.css"
import GetAppIcon from '@mui/icons-material/GetApp';
import DemoRequestForm from "./DemoRequestForm";
import { useState } from "react";


const GettingStartedGuide = () => {
    const endDate = new Date("2024-04-10T00:00:00.000Z");
    const [requestDemoClicked, setRequestDemoClicked] = useState(false);
    const handleRequestDemo = () => {   
        setRequestDemoClicked(true);
        setTimeout(() => {
            document.getElementById('container__form__request_demo')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
            
    }
    const downloadGuide = () => {
        window.open("/OneShoot RH Platform User Guide.pdf", "_blank");
    }

    return (
        <>
            <Box sx={{ display: 'flex', padding: "2rem" ,paddingTop:"3rem",fontSize:"1.3rem" }}>
                <Box>
                    <h1 className="get__started__title">Enhanced Technologies to Accelerate Your Recruitment Process</h1>
                    <Box sx={{ display: 'flex' ,gap:"20px" }}>
                        <span className="features_span">
                            <span>
                                <SensorOccupiedIcon />
                            </span>
                             1:1 Resume Analysis and Recommendation
                        </span>
                        <span className="features_span">
                            <span>
                                <Diversity3Icon />
                            </span>
                            1:2 E-Onboarding
                        </span>
                    </Box>
                    <p className="main-title">Digitalizing the entire recruitment process</p>
                    <Box>
                        <span>Free Demo Ends In: </span>
                        {/* counterdown  */}
                        <div className="counterdown__container">
                            <FlipClockCountdown
                            to={endDate}
                            labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
                            labelStyle={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' }}
                            digitBlockStyle={{ width: 40, height: 60, fontSize: 30 }}
                            dividerStyle={{ color: 'white', height: 1 }}
                            separatorStyle={{ color: 'red', size: '6px' }}
                            duration={0.5}
                            className='flip-clock' 
                        >
                            Finished
                        </FlipClockCountdown>
                        </div>
                    </Box>
                    <Box sx={{ display: "flex" ,gap:"20px",marginTop:"20px" }}>
                        <button  className="btn__call_to_action" onClick={handleRequestDemo}>
                            Request Demo
                        </button>
                        <button  className="btn__call_to_action__outlined" onClick={downloadGuide} >
                           <GetAppIcon/> Download Guide
                        </button>
                    </Box>
                    <small className="small__text">* Free Demo is available for a limited time only</small>
                </Box>
                <Box>
                    <div className="box_digital_image">
                        <img src="/images/digital.png" alt="digital" />
                    </div>
                </Box>
            </Box>
            <Box sx={{ padding: "2rem", display:"flex" }}>
                {/* tools description */}
            </Box>
            {
                requestDemoClicked && <DemoRequestForm />
            }
        </>    
    )
    

}



export default GettingStartedGuide