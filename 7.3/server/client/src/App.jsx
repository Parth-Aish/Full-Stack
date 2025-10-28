import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3001'; // server address

export default function App() {
  const [socket, setSocket] = useState(null);
  const [name, setName] = useState('');
  const [typedName, setTypedName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(null);

  useEffect(() => {
    const s = io(SOCKET_URL, { autoConnect: false });
    setSocket(s);
    // cleanup on unmount
    return () => s.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('connected to server', socket.id);
      if (name) socket.emit('join', name);
    });

    socket.on('message-history', (history) => {
      setMessages(history);
    });

    socket.on('chat-message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    socket.on('user-joined', (u) => {
      const system = { id: `sys-${Date.now()}`, name: 'System', text: `${u.name || 'Someone'} joined the chat`, time: new Date().toISOString() };
      setMessages(prev => [...prev, system]);
    });

    socket.on('user-left', (u) => {
      const system = { id: `sys-${Date.now()}`, name: 'System', text: `A user left`, time: new Date().toISOString() };
      setMessages(prev => [...prev, system]);
    });

    socket.on('disconnect', (reason) => {
      console.log('disconnected:', reason);
      const system = { id: `sys-${Date.now()}`, name: 'System', text: `You disconnected`, time: new Date().toISOString() };
      setMessages(prev => [...prev, system]);
    });

    return () => {
      socket.off('connect');
      socket.off('message-history');
      socket.off('chat-message');
      socket.off('user-joined');
      socket.off('user-left');
      socket.off('disconnect');
    };
  }, [socket, name]);

  useEffect(() => {
    // scroll to bottom when messages change
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  function handleJoin() {
    if (!typedName.trim() || !socket) return;
    setName(typedName.trim());
    socket.auth = { name: typedName.trim() };
    socket.connect();
    socket.emit('join', typedName.trim());
  }

  function sendMessage(e) {
    e.preventDefault();
    if (!message.trim() || !socket || !name) return;
    const msg = { name, text: message.trim(), time: new Date().toISOString() };
    socket.emit('chat-message', msg);
    setMessage('');
  }

  return (
    <div className="app">
      <h1>Realtime Chat (Socket.io)</h1>

      {!name ? (
        <div className="join">
          <input
            placeholder="Enter your name"
            value={typedName}
            onChange={(e) => setTypedName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
          />
          <button onClick={handleJoin}>Join Chat</button>
        </div>
      ) : (
        <>
          <div className="chat-container">
            <div className="chat-header">You're: <strong>{name}</strong></div>
            <div className="messages" ref={messagesRef}>
              {messages.map((m) => (
                <div key={m.id} className={`message ${m.name === name ? 'mine' : ''}`}>
                  <div className="meta">
                    <span className="author">{m.name}</span>
                    <span className="time">{new Date(m.time).toLocaleTimeString()}</span>
                  </div>
                  <div className="text">{m.text}</div>
                </div>
              ))}
            </div>

            <form className="composer" onSubmit={sendMessage}>
              <input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>

          <div style={{ marginTop: 12 }}>
            <button onClick={() => { socket && socket.disconnect(); setName(''); setTypedName(''); }}>
              Leave Chat
            </button>
          </div>
        </>
      )}
    </div>
  );
}
