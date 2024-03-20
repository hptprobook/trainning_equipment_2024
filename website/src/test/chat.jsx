import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const sendMessage = async () => {
        try {
            const res = await axios.post('http://localhost:8000/api/chatgpt/chat', { content: message });
            setResponse(res.data.choices[0].message.content);
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    return (
        <div>
            <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
            <p>{response}</p>
        </div>
    );
};

export default Chat;
