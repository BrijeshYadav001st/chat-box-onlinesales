import React, { useState } from 'react';
import './App.css';
import ChatIcon from "./img/chat2.png"
const ChatBox = ({ id, messages, onSendMessage, onCloseChatBox }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(id, message);
      setMessage('');
    }
  };

  return (

    <div className="chat-box">
     
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === id ? 'self' : 'other'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="send-button"  onClick={handleSendMessage}>Send</button>
      </div>
      <button className="close-button"  onClick={() => onCloseChatBox(id)}>
        Close
      </button>
    </div>
  );
};

const App = () => {
  const [chatBoxes, setChatBoxes] = useState([]);

  const addChatBox = () => {
    const newChatBoxes = [...chatBoxes];
    newChatBoxes.push({ id: Date.now(), messages: [] });
    setChatBoxes(newChatBoxes);
  };

  const sendMessage = (chatId, message) => {
    const newChatBoxes = [...chatBoxes];
    const chatBoxIndex = newChatBoxes.findIndex((box) => box.id === chatId);
    newChatBoxes[chatBoxIndex].messages.push({ sender: chatId, text: message });
    setChatBoxes(newChatBoxes);
  };

  const closeChatBox = (chatId) => {
    const newChatBoxes = chatBoxes.filter((box) => box.id !== chatId);
    setChatBoxes(newChatBoxes);
  };

  return (
    <div className="app">
       <h1 style={{
        display: "flex" ,
        justifyContent: "center",
        alignItems: "center"
       }}>Dummy ChatBot 🤖 </h1>
      <button  className="add-button-chat" onClick={addChatBox}>
        
        <img src={ChatIcon} alt='icon-img' className='chat-icon-img' />
        
        </button>
      <div className="chat-boxes">
        {chatBoxes.map((chatBox) => (
          <ChatBox
            key={chatBox.id}
            id={chatBox.id}
            messages={chatBox.messages}
            onSendMessage={sendMessage}
            onCloseChatBox={closeChatBox}
          />
        ))}
      </div>
    </div>
  );
};

export default App;