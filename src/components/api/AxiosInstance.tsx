import axios from "axios";
import { getUser } from "../../helpers/auth_helper";




const AxiosInstance = axios.create({
    headers: {
       'Access-Control-Allow-Origin': '*',
    }
});


async function setAuthorizationHeader() {
    try {
        const user = await getUser();
        if (user && user.access_token) {
            AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${user.access_token}`;
        } else {
            throw new Error('User not logged in');
        }
    } catch (error) {
        console.log(error);
    }
}

setAuthorizationHeader();

export default AxiosInstance;