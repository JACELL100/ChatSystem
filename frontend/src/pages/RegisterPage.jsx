import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import "../styles/LoginPage.scss";

const RegisterPage = () => {
    const { loginUser } = useContext(AuthContext);

    const Submit = async (e) => {
        e.preventDefault();
        const data = { 'username': e.target.username.value, 'password': e.target.password.value };
        await fetch('http://localhost:8000/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                loginUser(e);
            } else {
                alert("This Name Already Exists");
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <div className='register-container'>
            <div className='register-card glowing-card'>
                <h2 className='register-title'>Register</h2>
                <form onSubmit={Submit}>
                    <input type="text" name='username' placeholder='Enter Username' className='input-field' />
                    <input type="password" name="password" placeholder='Enter Password' className='input-field' />
                    <button type="submit" className='register-btn'>Register</button>
                </form>
                <Link id="register" to='/login' className='login-link'>Login</Link>
            </div>
        </div>
    );
};

export default RegisterPage;
