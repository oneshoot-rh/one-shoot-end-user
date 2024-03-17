import { Outlet, Navigate } from 'react-router-dom'
import { getUser } from '../../helpers/auth_helper';
import { useEffect, useState } from 'react';

const PrivateRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        getUser().then(user => {
            if(user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setLoading(false); 
        });
    }, []);

    if(loading) {
        return <div>...</div>; 
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes