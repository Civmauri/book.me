import React, { useContext, useEffect } from 'react';
import UserContext from '../components/User_Context';
import { useNavigate } from 'react-router-dom';

const Logout_Screen = () => {
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate('/login');
    }, [logout, navigate]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center">Logging out...</h1>
                </div>
            </div>
        </div>
    );
};

export { Logout_Screen };
