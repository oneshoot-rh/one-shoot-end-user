import { useEffect } from "react";
import { login } from "../../helpers/auth_helper";
const Login = () => {
    useEffect(() => {
        login();
    }, []);
    return (
        <div>
            <h1>Login</h1>
        </div>
    );
}


export default Login;