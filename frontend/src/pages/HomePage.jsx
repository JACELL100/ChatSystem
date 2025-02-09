import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../styles/HomePage.scss";

const HomePage = () => {
    const { user, authTokens } = useContext(AuthContext);
    const navigateTo = useNavigate();
    const { logoutUser } = useContext(AuthContext);

    const enterRoom = (e) => {
        e.preventDefault();
        navigateTo(`/${e.target.room.value}/${e.target.enterPassword.value}`);
    };

    const CreateRoom = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:8000/room/`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${authTokens.access}`
            },
            body: JSON.stringify({'name': e.target.name.value, 'password': e.target.password.value})
        })
        .then(response => response.json())
        .then(data => {
            data.status === 200 ? navigateTo(`/${e.target.name.value}/${e.target.password.value}`) : alert("This room already exists");
        });
    };

    return (
        <div className='home-container'>
            <button className='logout-btn' style={{ position: 'absolute', top: '20px', left: '20px' }} onClick={logoutUser}>Logout</button>
            <div className='home-card glowing-card'>
                <form onSubmit={enterRoom}>
                    <label htmlFor="room" className='form-label'>Enter the room's name</label>
                    <input type="text" name="room" placeholder='Room name...' className='input-field' />
                    <input type="password" name="enterPassword" placeholder='Room Password...' className='input-field' />
                    <button type="submit" className='enter-btn'>Enter</button>
                </form>
                <form onSubmit={CreateRoom}>
                    <h3 className='form-title'>or <br /> Create room</h3>
                    <label htmlFor="name" className='form-label'>Enter the room's name</label>
                    <input type="text" name="name" placeholder='Room Name...' className='input-field' />
                    <input type="password" name="password" placeholder='Room Password...' className='input-field' />
                    <button type="submit" className='create-btn'>Create</button>
                </form>
            </div>
        </div>
    );
};

export default HomePage;
