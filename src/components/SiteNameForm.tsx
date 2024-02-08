import React, { useState } from 'react';
import { Box, Button, FormHelperText, TextField } from '@mui/material';

import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';



const SiteNameForm = () => {
    const [siteName, setSiteName] = useState("");
    const queryClient = useQueryClient();
    // use react query to check if the site name is available
       const { isLoading, error, data } = useQuery({
        queryKey: ['availability', siteName],
        queryFn: () =>
            axios.get('/tenants/availability/' + siteName).then((res) => res.data),
    });

    const handleCheckAvailability = async () => {
        try {
            // Use the query function to trigger the query manually
            const result = await queryClient.fetchQuery(['availability', siteName]);

            // handle the result as needed
            console.log(result);
        } catch (error) {
            // handle errors
            console.error(error);
        }
    };
    

    return (
        <Box sx={{marginBlock:"3rem"}}>
            <h2>Please enter your site name</h2>
            <Box>
                <FormControl sx={{ }} variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">.oneshoot.com</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                    'aria-label': 'sitename',
                    }}
                    onChange={(t)=> setSiteName(t.target.value)}
                    />
                    <FormHelperText id="outlined-weight-helper-text">the name of your organization</FormHelperText>

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
            <Button variant="outlined" onClick={handleCheckAvailability} size='small' sx={{marginTop:"1rem"}}>Check Availability</Button>
            {
                isLoading === true ? <p>Loading...</p> : (
                    data !== null ? <p>{data}</p> : <p>Not available</p>
                )
            }
        </Box>
    );
}
    

export default SiteNameForm;