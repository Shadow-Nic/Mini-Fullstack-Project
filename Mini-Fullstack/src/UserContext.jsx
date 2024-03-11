import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (user) => {
        console.log(user);
        try {
            const response = await axios.post("/app/user/login", {
                user
            });
            setUser(response.data.user);

        } catch (error) {
            // Handle error here
            console.error("Login failed:", error.response.data);
        }


    };

    const autoLogin = async () => {

        await axios.get("/auth/login", {})
            .then(response => {
                if (response.status === 200) {
                    setUser(response.data);
                }
            }).catch(error => {
                console.log(error)
            })
    };


    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, autoLogin }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};