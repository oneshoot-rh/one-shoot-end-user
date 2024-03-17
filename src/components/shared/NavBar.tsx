import { Link } from "react-router-dom";
import "../styles/NavBar.css"
import { Button } from "@mui/material";
import { getUser, login, logout } from "../../helpers/auth_helper";
import { useState } from "react";



const NavBar = () => {

    const [isLoggedIn,setIsLoggedIn] = useState(false);

    const performLogin = () => {
        login();
    }

    getUser().then(user =>{
        if(user){
            setIsLoggedIn(true)
            console.log("user is logged in!");
        }else{
            setIsLoggedIn(false)
        }
    })


    const performLogout = () => {
        logout();
    }




    return (
        <div className="navbar">
            <div className="navbar__logo">
            </div>
            <div className="navbar__links">
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/Process">Process</Link>
                </div>
                <div>
                    <Link to="http://localhost:4200">EOnboard</Link>
                </div>
                {
                    !isLoggedIn && (
                        <div>
                            <Button onClick={performLogin}>Login</Button>
                        </div>
                    )
                }
                {
                    isLoggedIn && (
                        <div>
                            <Button onClick={performLogout}>Logout</Button>
                        </div>
                    )
                }
               
            </div>
        </div>
    );
}
    

export default NavBar