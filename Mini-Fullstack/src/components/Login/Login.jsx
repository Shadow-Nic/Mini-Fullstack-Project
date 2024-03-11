import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext.jsx";

import './login.css'

const Login = () => {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    const { user, login, autoLogin } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginData = { username, password };
        try {
            login(loginData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user) {

            navigate('/')
        } else {
            autoLogin()
        }

    }, [user]);

    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <h3>Login</h3>

                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Username" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />

                <button type="submit">Log In</button>

            </form>
        </div>
    );
};

export default Login;