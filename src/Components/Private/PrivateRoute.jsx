import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const location = useLocation();

    const{user,loading}=useContext(AuthContext);
    console.log('PrivateRoute auth state:', { user, loading });
    if(loading){
        return <div>Loading...</div>
    }

    if(user){
        return children;
    }

    return <Navigate to="/login" state={{from:location}} replace/>;
};

export default PrivateRoute;
