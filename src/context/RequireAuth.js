import React from 'react'
import { Navigate , useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';


const RequireAuth = ({ children }) => {
    const { currentUser } = useAuth()
    const locatiion = useLocation()

    if (!currentUser) {
        return <Navigate to='/login' state={{ path: locatiion.pathname }} />
    }

    return children
    
}

export default RequireAuth
