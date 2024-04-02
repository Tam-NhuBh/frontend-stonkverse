"use client";

import React, { useRef, useState } from 'react';
import './chatbot/style.css';
import { FaComment, FaTimes } from 'react-icons/fa';
import { MdOutlineSmartToy } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addMessage } from '@/slice/chatbot-client.slice';
import { chatbotApi } from '@/store/chatbot/chatbot-client-api';

const ChatBotClient: React.FC = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state: RootState) => state.chatbotClient.messages);

    const [showChatIcon, setShowChatIcon] = useState(true);
    const chatboxRef = useRef<HTMLUListElement>(null);
    const chatInputRef = useRef<HTMLTextAreaElement>(null);
    const inputInitHeight = chatInputRef.current?.scrollHeight || 0;

    const generateResponse = async (userMessage: string) => {
        const botResponse = await chatbotApi(userMessage); // Call your chatbotApi function
        dispatch(addMessage(botResponse));
    };

    const handleChat = () => {
        const userMessage = chatInputRef.current?.value.trim();
        if (!userMessage) return;

        dispatch(addMessage(userMessage)); // Add user message to Redux store

        // Clear the input textarea and set its height to default
        if (chatInputRef.current) {
            chatInputRef.current.value = "";
            chatInputRef.current.style.height = `${inputInitHeight}px`;
        }

        // Append the user's message to the chatbox
        if (chatboxRef.current) {
            chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);
        }

        setTimeout(() => {
            // Display "Thinking..." message while waiting for the response
            generateResponse(userMessage);
        }, 600);
    };

    const handleInputChange = () => {
        // Adjust the height of the input textarea based on its content
        if (chatInputRef.current) {
            chatInputRef.current.style.height = `${inputInitHeight}px`;
            chatInputRef.current.style.height = `${chatInputRef.current.scrollHeight}px`;
        }
    };

    const handleToggleChatbot = () => {
        setShowChatIcon(!showChatIcon);
        document.body.classList.toggle("show-chatbot");
    };

    return (
        <div>
            <button className="chatbot-toggler" onClick={handleToggleChatbot}>
                {showChatIcon ? <FaComment className="material-symbols-rounded" /> : null}
                {!showChatIcon ? <FaTimes className="material-symbols-outlined" /> : null}
            </button>
            <div className="chatbot">
                <header>
                    <h2>Chatbot</h2>
                    <span className="close-btn material-symbols-outlined" onClick={handleToggleChatbot}>close</span>
                </header>
                <ul className="chatbox" ref={chatboxRef}>
                    {messages.map((message, index) => (
                        <li key={index} className={`chat ${index % 2 === 0 ? 'incoming' : 'outgoing'}`}> 
                            {index % 2 === 0 && (
                                <MdOutlineSmartToy
                                    className='material-symbols-outlined icon'
                                    size={40}
                                    style={{ marginRight: '3px', marginTop: 'auto', marginBottom: '10px' }}
                                />
                            )}
                            <p>{message}</p>
                        </li>
                    ))}
                </ul>
                <div className="chat-input">
                    <textarea
                        ref={chatInputRef}
                        placeholder="Enter a message..."
                        spellCheck={false}
                        onChange={handleInputChange}
                        required
                    />
                    <span id="send-btn" className="material-symbols-rounded" onClick={handleChat}>send</span>
                </div>
            </div>
        </div>
    );
};

export default ChatBotClient;
