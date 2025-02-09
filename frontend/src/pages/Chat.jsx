import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

import Back from '../assets/back.svg';
import '../styles/Chat.scss';
import axios from 'axios';

const Chat = () => {
    const { user, authTokens } = useContext(AuthContext);
    const { name, password } = useParams();
    const navigateTo = useNavigate();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`http://localhost:8000/room/${name}/${password}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${authTokens.access}`
                }
            })
            .then(response => response.json())
            .then(data => setMessages(data.sort((a, b) => a.id - b.id)))
            .catch(err => navigateTo("/"));
        };
        
        const timer = setInterval(() => { fetchData(); }, 1000);
        fetchData();
        return () => clearInterval(timer);
    }, []);

    const Send = async (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append("message", e.target.message.value);
        data.append("image", e.target.image.files[0]);

        await axios(`http://localhost:8000/room/${name}/${password}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${authTokens.access}`,
                "Content-Type": "multipart/form-data"
            },
            data: data
        });
        
        e.target.reset();
        let messagesContainer = document.getElementById("messagesContainer");
        messagesContainer.scrollTo(0, 0);
    };

    return (
        <div className="chat-container">
            <nav className="chat-nav">
                <Link to='/' className="back-button">
                    <img src={Back} alt="back button" width={40} height={40} className="glowing" />
                </Link>
                <h2 className="chat-heading">{name}</h2>
            </nav>
            <div className="messages">
                <div className="message-box" id='messagesContainer'>
                    {messages && messages.map((message) => {
                        return (
                            <div className={`message-card ${user.username === message.user ? 'owner' : 'another'}`} key={message.id}>
                                <h3>{message.user}</h3>
                                <p>{message.message}</p>
                                {message.image && <img className='image' src={`http://localhost:8000${message.image}`} alt="" loading="lazy" width={300} height={150} />}
                            </div>
                        );
                    })}
                </div>
            </div>
            <form className='send-form' onSubmit={Send}>
                <input type="text" name="message" placeholder="Type a message..." />
                <input type="file" name="image" />
                <input type="submit" value="Send" />
            </form>
        </div>
    );
};

export default Chat;
