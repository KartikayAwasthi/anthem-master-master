import React, { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there! How can I help you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const questions = [
    {
      text: "What types of fans do you offer?",
      response: "We offer ceiling fans (Skyro, INARA, eVAARA) and pedestal fans.",
    },
    {
      text: "Where can I buy Anthem fans?",
      response: "You can buy from Amazon, Flipkart, or certified dealers near you.",
    },
    {
      text: "What is the warranty period?",
      response: "All our fans come with a 2-year warranty.",
    },
    {
      text: "How to contact support?",
      response: "Email us at support@anthemfans.com or call +91 9930101710.",
    },
  ];

  const handleQuestionClick = (q) => {
    // Add user message immediately
    setMessages(prev => [
      ...prev,
      { from: "user", text: q.text }
    ]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate typing delay and then add bot response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { from: "bot", text: q.response }
      ]);
      setIsTyping(false);
    }, 1500); // 1.5 second delay for typing effect
  };

  // Typing indicator component
  const TypingIndicator = () => {
    const [dots, setDots] = useState('');
    
    useEffect(() => {
      const interval = setInterval(() => {
        setDots(prev => {
          if (prev === '...') return '';
          return prev + '.';
        });
      }, 500);
      
      return () => clearInterval(interval);
    }, []);
    
    return (
      <div className="text-left text-gray-400 italic">
        <span className="inline-flex items-center gap-1">
          <span>Anthem Assistant is typing</span>
          <span className="w-6 text-left">{dots}</span>
        </span>
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-[#ba6a5a] hover:bg-[#e49385] text-white rounded-full p-4 shadow-xl"
          aria-label="Open Chatbot"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-80 bg-[#2f2f2f] rounded-2xl shadow-2xl border border-[#ba6a5a] overflow-hidden">
          {/* Header */}
          <div className="bg-[#ba6a5a] text-white px-4 py-3 flex justify-between items-center">
            <h4 className="font-semibold">Anthem Assistant</h4>
            <button onClick={() => setOpen(false)} className="text-white">
              <X />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 h-64 overflow-y-auto space-y-3 bg-[#1c1c1c] text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.from === "user"
                    ? "text-right text-[#e49385]"
                    : "text-left text-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && <TypingIndicator />}
          </div>

          {/* Options */}
          <div className="p-4 border-t border-[#ba6a5a]/30 space-y-2 bg-[#2f2f2f]">
            {questions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleQuestionClick(q)}
                disabled={isTyping}
                className={`w-full text-left px-3 py-2 bg-[#1c1c1c] rounded text-gray-200 text-sm transition-colors ${
                  isTyping 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-[#ba6a5a]'
                }`}
              >
                {q.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
