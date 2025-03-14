import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { user: 'User', text: inputMessage }]);
      const res = await fetch('/api/ask', {
        method: 'POST',
        body: JSON.stringify({ message: inputMessage }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      setMessages([...messages, { user: 'AI', text: data.response }]);
      setInputMessage('');
    }
  };

  return (
    <div>
      <h1>Welcome to SmartLife</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}: </strong>{msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}
