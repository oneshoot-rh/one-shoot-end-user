import React, { useState } from 'react';
import { Box, Button, FormHelperText, TextField } from '@mui/material';

import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import AxiosInstance from './api/AxiosInstance';



const SiteNameForm = ({onDomainChoosen}) => {
    const [siteName, setSiteName] = useState("");
    const [availabilityResponse, setAvailabilityResponse] = useState("");
    const [siteNameError, setSiteNameError] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState("");

    const handleCheckAvailability = async () => {
        AxiosInstance.get('/tenantService/api/cl/tenants/availability/' + siteName).then((res) => {
            if(res.data === true){
                setAvailabilityResponse("Available");
            }
            else{
                setAvailabilityResponse("Not available");
            }
        }).catch((err) => {
            console.log(err);
        }
        );
    };
    const handleChangeSiteName = (value: string) => {
        // if value contains space or special characters, remove them
        if (value.match(/[^a-zA-Z0-9]/g)?.length > 0) {
            setSiteName(value.replace(/[^a-zA-Z0-9]/g, ''));
            setSiteNameError(true);
        } else {
            setSiteName(value);
            setSiteNameError(false);
        }
        setAvailabilityResponse("");
    }
    

    function chooseDomain(){
        if(availabilityResponse === "Available"){
            console.log("Domain name selected");
            setSelectedDomain(siteName);
            onDomainChoosen(siteName);
    }
    }

    return (
        <Box sx={{marginBlock:"3rem"}}>
            <h2>Please enter your site name</h2>
            <Box>
                <FormControl sx={{ }} variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">.oneshoot.com</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    autoComplete='off'
                    inputProps={{
                    'aria-label': 'sitename',
                        }}
                    value={siteName}
                        onChange={(t) => handleChangeSiteName(t.target.value)}
                        onBlur={() => handleCheckAvailability()}
                    />
                    <FormHelperText id="outlined-weight-helper-text">
                        {siteNameError === true ? (<span style={{ color: "red" }}>special character or space not allowed</span>) :
                            (
                                <span>the name of your organization</span>
                        )}
                        
                    </FormHelperText>

                </FormControl>
                <h5>What does it mean?</h5>
                <ul>
                    <li>It will be the URL of your OneShoot platform</li>
                    <li>It will be used to create your organization's email address</li>
                    <li>You will not be able to change it later</li>
                    <li>It should be unique</li>
                    <li>It will represent the whole workspace, database name and email domain</li>
                </ul>
            </Box>
            {
                availabilityResponse && <h5 className={availabilityResponse == "Available" ? "success_color" : "info_color"}>
                    site name is: {availabilityResponse}</h5>
            }
            <Button variant="outlined" onClick={handleCheckAvailability} size='small' sx={{marginTop:"1rem"}}>Check Availability</Button>
            {
                availabilityResponse === "Available" && <Button variant="contained" onClick={chooseDomain} size='small' sx={{marginTop:"1rem", marginLeft:"1rem"}}>Choose Domain</Button>
            }
        </Box>
    );
}
    

export default SiteNameForm;