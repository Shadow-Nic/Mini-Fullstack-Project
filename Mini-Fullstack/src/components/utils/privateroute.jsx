import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../../UserContext.jsx';

const PrivateRoutes = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default PrivateRoutes