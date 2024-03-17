import axios from "axios";
import { getUser } from "./auth_helper";






const _callAPI = (token:any) => {
    const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
    };
    return axios.get('/api/cl/uploads', { headers })
}




export const callAPI = () => {
    return getUser().then((user:any) => {
        if(user && user.access_token){
            return _callAPI(user.access_token).catch((error) => {
                console.log(error);
            });
        }
        else{
            throw new Error('User not logged in');
        }
    }).catch((error) => {
        console.log(error);
    });
}