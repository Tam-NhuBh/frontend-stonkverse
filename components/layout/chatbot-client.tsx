"use client";

import React, { useRef, useState } from 'react';
import './chatbot/style.css';
import { FaComment, FaTimes } from 'react-icons/fa';
import { MdOutlineSmartToy } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addMessage } from '@/slice/chatbot-client.slice';
import { chatbotApi } from '@/store/chatbot/chatbot-client-api';
import { BiSend } from 'react-icons/bi';
import { Span } from 'next/dist/trace';

const ChatBotClient: React.FC = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state: RootState) => state.chatbotClient.messages);
    const [isLoading, setIsLoading] = useState(false);

    const [showChatIcon, setShowChatIcon] = useState(true);
    const chatboxRef = useRef<HTMLUListElement>(null);
    const chatInputRef = useRef<HTMLTextAreaElement>(null);
    const inputInitHeight = chatInputRef.current?.scrollHeight || 0;

    const generateResponse = async (userMessage: string) => {
        setIsLoading(true);
        const botResponse = await chatbotApi(userMessage);
        dispatch(addMessage(botResponse));
        setIsLoading(false);
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
                <header >
                    <h2 className='chat-title' >Chatbot</h2>
                    <span className="close-btn material-symbols-outlined bold" onClick={handleToggleChatbot}>X</span>
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
                    {isLoading && (
                        <li className="loading-icon">
                            <div className="loading-spinner"></div> {/* Biểu tượng loading */}
                        </li>
                    )}
                </ul>

                <div className="chat-input">
                    <textarea
                        ref={chatInputRef}
                        placeholder="Enter a message..."
                        spellCheck={false}
                        onChange={handleInputChange}
                        required
                    />
                    <span id="send-btn" className="material-symbols-rounded hover:text-blue-300 cursor-pointer " onClick={handleChat}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChatBotClient;
