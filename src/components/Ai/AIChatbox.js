import React, { useContext, useState, useRef } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { useNavigate } from 'react-router-dom';

const AIChatbox = () => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [canSendMessage, setCanSendMessage] = useState(true);
  const aiRef = useRef(null);
  const typingRef = useRef(null); // Reference to track typing interval

  const handleSendMessage = () => {
    if (input.trim() !== '' && canSendMessage) {
      setMessages([...messages, { text: input, sender: 'User' }]);
      setInput('');
      setCanSendMessage(false);

      // Simulate AI response after a delay
      setTimeout(() => {
        const response = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor semper nisl, vel consequat velit varius ac. Aliquam auctor leo non sapien vehicula, in finibus eros fermentum. Nullam suscipit velit in est sollicitudin, eu hendrerit neque ultrices. Mauris in ligula eu nisi fermentum tempus. Duis consequat dolor sed est suscipit, et tincidunt sapien rutrum. Morbi semper nunc at eros dictum, in eleifend sapien scelerisque. Sed vel lobortis justo. Nulla eleifend, urna vitae ultrices bibendum, dui augue tincidunt risus, vel euismod nulla augue et tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque nec sapien id risus posuere suscipit. Mauris at velit quam. Ut tempor ligula a libero auctor dignissim. Integer laoreet, mi ut tempor rutrum, risus urna placerat lectus, non bibendum ex libero vel nisi. Vivamus pulvinar eleifend sem, eget bibendum libero tincidunt nec. Vivamus ultricies, dui vel tristique congue, nisl mauris malesuada orci, at aliquam magna metus a leo.'; // Replace with your actual AI response logic
        typeMessage(response);
      }, 1000); // Simulate a 1-second response time
    }
  };
  
  const typeMessage = (message) => {
    let index = 0;
    if (typingRef.current) {
      clearInterval(typingRef.current); // Clear previous typing animation if exists
    }
    typingRef.current = setInterval(() => {
      setMessages(prevMessages => [{ text: message.slice(0, index + 1), sender: 'ZPAI' }]);
      index++;
      if (index === message.length) {
        clearInterval(typingRef.current);
        setCanSendMessage(true);
      }
    }, 10); // Adjust typing speed here
  };

  return (
    <div className={`flex rounded-lg flex-col justify-between md:w-3/5 mx-auto rounded-b-lg mt-10`}>
      <div className="flex-grow overflow-y-auto mb-4 flex flex-col" style={{ maxHeight: 'calc(100% - 50px)' }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className="p-3 break-words flex items-start"
          >
            <div className={`text-primary mr-4`}>
              {msg.sender}
            </div>
            <div className="flex-grow text-white text-left">
              <span className={`${darkMode ? 'text-white' : 'text-dark'}`}>{msg.text}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row p-4 md:rounded-lg w-full space-y-4 md:space-y-0 md:space-x-4">
        <input
          className={`flex-grow md:rounded-l-xl rounded p-4 ${darkMode ? 'border-gray-700 bg-glass text-white' : 'border-gray-300 bg-glass text-dark'}`}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={!canSendMessage}
        />
        <button
          className={`w-full md:w-auto p-2 md:rounded-r-xl rounded px-10 ${darkMode ? 'text-white glass' : 'bg-primary text-white'} ${!canSendMessage ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleSendMessage}
          disabled={!canSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatbox;
