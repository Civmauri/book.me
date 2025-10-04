import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { React, useContext } from 'react';
import UserContext from '../components/User_Context.jsx';
import AuthPage from '../screen/login/authScreen.tsx';
import { Home_Screen } from '../screens/homeScreen.jsx';

import { Logout_Screen } from '../screen/login/logoutScreen.jsx';

// Function to determine which login screen to use
const getLoginScreen = () => {
    return <AuthPage />;
};

function Site_Routing(props) {
    const { currentUser } = useContext(UserContext);

    if (currentUser && currentUser()) {
        return (
            <Router>
                <Routes>
                 
                    <Route
                        path="/home"
                        element={<Home_Screen />}
                    />
                    <Route
                        path="/logout"
                        element={<Logout_Screen />}
                    />
                    <Route
                        path="*"
                        element={<Home_Screen />}
                    />
                </Routes>
                {props.children}
            </Router>
        );
    }
    else {
        return (
            <Router>
                <Routes>
                    <Route
                        path="/logout"
                        element={<Logout_Screen />}
                    />
                    <Route
                        path="*"
                        element={getLoginScreen()}
                    />
                    <Route
                        path="/login"
                        element={getLoginScreen()}
                    />
                </Routes>
            </Router>
        );
    }
}

export default Site_Routing;
