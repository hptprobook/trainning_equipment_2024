import axios from "axios";
import { useState } from "react";

const Chat = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [error, setError] = useState(null);

    const sendMessage = async () => {
        try {
            console.log('Sending message', message);
            const res = await axios.post('http://localhost:8000/api/chatgpt/chat', { content: message });
            setResponse(res.data.choices[0].message.content);
            setError(null); // clear any previous error
        } catch (error) {
            console.error('Error sending message', error);
            setError('Error sending message. Please try again.'); // set the error state
        }
    };

    return (
        <div>
            <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
            {error && <p>Error: {error}</p>}
            <p>{response}</p>
        </div>
    );
};

export default Chat;