import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { portfolioData } from '../data';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello, I am Angela. How can I help you?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "What are your skills?",
    "Tell me about your experience",
    "Show me your projects",
    "How can I contact you?"
  ];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Scroll listener to show bubble when scrolling past Hero but before Experience
  useEffect(() => {
    const handleScroll = () => {
      if (hasTriggered || isOpen) return;

      const scrollPos = window.scrollY;
      const experienceElement = document.getElementById('experience');
      const experienceTop = experienceElement ? experienceElement.offsetTop : 800;

      // Trigger when scrolling past 150px but before reaching the Experience section
      if (scrollPos > 150 && scrollPos < experienceTop - 100) {
        setShowBubble(true);
        setHasTriggered(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasTriggered, isOpen]);

  const handleSendMessage = (textToSend) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botReply = generateBotResponse(textToSend);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply
      }]);
      setIsTyping(false);
    }, 1200);
  };

  const generateBotResponse = (input) => {
    const text = input.toLowerCase();
    const info = portfolioData.personalInfo;
    
    if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
      return `Hello! I am Angela. How can I help you learn more about ${info.firstName} today?`;
    }
    
    if (text.includes('skill') || text.includes('technolog') || text.includes('languages') || text.includes('stack')) {
      const skillsList = portfolioData.skills.map(s => `${s.category}: ${s.items.join(', ')}`).join('\n');
      return `${info.firstName}'s core skills are organized as follows:\n\n${skillsList}`;
    }

    if (text.includes('experience') || text.includes('work') || text.includes('job') || text.includes('intern')) {
      const expList = portfolioData.experiences.map(e => `• ${e.role} at ${e.company} (${e.duration})`).join('\n');
      return `${info.firstName} has worked at:\n${expList}\n\nCheck the Experience section for detailed bullet points!`;
    }

    if (text.includes('project') || text.includes('build') || text.includes('make') || text.includes('code')) {
      const projList = portfolioData.projects.map(p => `• ${p.title}: ${p.description}`).join('\n\n');
      return `Here are some featured projects:\n\n${projList}`;
    }

    if (text.includes('contact') || text.includes('reach') || text.includes('email') || text.includes('hire') || text.includes('phone') || text.includes('linkedin')) {
      return `You can reach ${info.firstName} via:\n• Email: ${info.email}\n• LinkedIn: ${info.linkedin}\n• GitHub: ${info.github}\n\nYou can also submit the form in the Contact section!`;
    }

    if (text.includes('education') || text.includes('college') || text.includes('university') || text.includes('degree')) {
      return `${info.firstName} is a Computer Science undergraduate student at Techno International New Town.`;
    }

    if (text.includes('hackathon')) {
      return `${info.firstName} is a passionate hackathon participant, having competed in ${info.hackathonsCount} hackathons and placed as a finalist in several, including the top 5 of Monad-Blitz!`;
    }

    if (text.includes('leetcode') || text.includes('dsa')) {
      return `${info.firstName} is active on LeetCode with ${info.leetcodeCount} solved problems and won 1st place in his university's DSA tournament!`;
    }

    return `Interesting question! I am Angela, ${info.firstName}'s AI Assistant. He is a highly capable developer specializing in Backend Development, Microservices, and AI Integrations. For specific inquiries, feel free to contact him directly at ${info.email}.`;
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowBubble(false);
  };

  return (
    <>
      {/* Greeting Bubble Pop-up */}
      {showBubble && !isOpen && (
        <div 
          onClick={handleOpenChat}
          className="fixed z-50 mr-4 bg-[#160d2e] border border-primary/30 text-[#e9e4ff] text-xs px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-xl transition-all duration-500 animate-float cursor-pointer hover:border-primary/50 group select-none"
          style={{
            bottom: '32px',
            right: '96px',
            maxWidth: '260px',
            boxShadow: '0 8px 30px rgba(124, 58, 237, 0.25)'
          }}
        >
          {/* Triangle pointing to the button */}
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[#160d2e] group-hover:border-l-[#1e113f] transition-colors" />
          
          <div className="flex-1 font-semibold leading-relaxed">
            <span className="text-[10px] text-accent uppercase tracking-wider block mb-0.5 font-bold">Angela</span>
            hello i am angela how can i help you
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowBubble(false);
            }}
            className="text-muted-foreground hover:text-foreground shrink-0 p-0.5 rounded hover:bg-muted/40 transition-colors"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Floating Chat Button */}
      <button 
        onClick={handleOpenChat}
        className={`fixed z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 animate-pulse-glow bg-primary select-none touch-none overflow-hidden ${
          isOpen ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'
        }`}
        style={{
          bottom: '24px',
          right: '24px',
          border: '2px solid rgba(124, 58, 237, 0.6)',
          boxShadow: '0 0 24px rgba(124, 58, 237, 0.55)'
        }}
        aria-label="Open AI chatbot"
      >
        <div className="w-full h-full flex items-center justify-center bg-primary/20 text-white hover:text-accent transition-colors">
          <MessageSquare size={26} />
        </div>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed z-50 w-[350px] sm:w-[380px] h-[500px] rounded-2xl flex flex-col shadow-2xl border border-primary/20 bg-[#160d2e]/95 backdrop-blur-xl overflow-hidden transition-all duration-500 ${
          isOpen ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto' : 'opacity-0 translate-x-12 scale-95 pointer-events-none'
        }`}
        style={{
          bottom: '24px',
          right: '24px',
          boxShadow: '0 12px 40px rgba(12, 6, 26, 0.7)'
        }}
      >
        {/* Header */}
        <div className="bg-primary/25 border-b border-primary/15 px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/25 flex items-center justify-center text-accent">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="font-bold text-xs text-foreground leading-none">
                Angela
              </h3>
              <span className="text-[10px] text-green-400 font-semibold flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Online
              </span>
            </div>
          </div>
          
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg hover:bg-muted/40 text-[#c4b5fd] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={msg.sender === 'user' ? 'chat-message-user' : 'chat-message-bot'}
              style={{ whiteSpace: 'pre-line' }}
            >
              {msg.text}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="chat-message-bot flex items-center gap-1 py-3 px-4">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick suggestions */}
        {messages.length === 1 && !isTyping && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="text-[10px] font-semibold py-1 px-2.5 rounded-full bg-primary/10 border border-primary/20 text-[#c4b5fd] hover:bg-primary/20 transition-all text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input Footer */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }}
          className="border-t border-border/40 p-3 bg-secondary/10 flex gap-2 items-center"
        >
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask me something..."
            className="flex-1 bg-input border border-border/40 rounded-xl px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/45"
          />
          <button 
            type="submit"
            className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors flex items-center justify-center shrink-0"
            aria-label="Send message"
          >
            <Send size={14} />
          </button>
        </form>

      </div>
    </>
  );
}
