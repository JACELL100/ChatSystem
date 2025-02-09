import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import "../styles/LoginPage.scss";

const LoginPage = () => {
    let { loginUser } = useContext(AuthContext);
    return (
        <div className='login-container'>
            <div className='login-card glowing-card'>
                <h2 className='login-title'>Login</h2>
                <form onSubmit={loginUser}>
                    <input type="text" name="username" placeholder="Enter Username" className='input-field' />
                    <input type="password" name="password" placeholder="Enter Password" className='input-field' />
                    <button type="submit" className='login-btn'>Login</button>
                </form>
                <Link id="register" to='/register' className='register-link'>Register</Link>
            </div>
        </div>
    );
};

export default LoginPage;
