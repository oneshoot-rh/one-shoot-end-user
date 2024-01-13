import { Link } from "react-router-dom";
import "../styles/NavBar.css"



const NavBar = () => {


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
                    <Link to="/contact">Login</Link>
                </div>
            </div>
        </div>
    );
}
    

export default NavBar