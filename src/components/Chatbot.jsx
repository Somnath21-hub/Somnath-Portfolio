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
      text: "Hello! 👋 I'm Angela, Somnath's assistant. Ask me about his skills, projects, experience, or how to contact him!"
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

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply = generateBotResponse(textToSend);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (input) => {
    const text = input.toLowerCase();
    const info = portfolioData.personalInfo;

    // --- Greetings ---
    if (text.includes('hi') || text.includes('hello') || text.includes('hey') || text.includes('good morning') || text.includes('good evening') || text.includes('good afternoon') || text.includes('howdy')) {
      return `Hello! 👋 I'm Angela, ${info.firstName}'s assistant. You can ask me about his skills, projects, experience, education, or how to contact him!`;
    }

    // --- Name / Who ---
    if (text.includes('who are you') || text.includes('your name') || text.includes('angela') || text.includes('what are you') || text.includes('who is this') || text.includes('who is somnath') || text.includes('about you') || text.includes('introduce')) {
      return `I'm Angela, the assistant for ${info.firstName}'s portfolio! 🤖\n\n${info.firstName} is a passionate developer specializing in Backend Development, Microservices, and AI Integrations. Ask me anything about him!`;
    }

    // --- Skills / Technologies ---
    if (text.includes('skill') || text.includes('technolog') || text.includes('language') || text.includes('stack') || text.includes('tool') || text.includes('framework') || text.includes('know') || text.includes('expert') || text.includes('proficien') || text.includes('what can') || text.includes('capabilit')) {
      const skillsList = portfolioData.skills.map(s => `${s.category}: ${s.items.join(', ')}`).join('\n');
      return `${info.firstName}'s core skills:\n\n${skillsList}`;
    }

    // --- Experience / Work ---
    if (text.includes('experience') || text.includes('work') || text.includes('job') || text.includes('intern') || text.includes('career') || text.includes('profession') || text.includes('employ') || text.includes('company') || text.includes('organisation') || text.includes('organization') || text.includes('position') || text.includes('role')) {
      const expList = portfolioData.experiences.map(e => `• ${e.role} at ${e.company} (${e.duration})`).join('\n');
      return `${info.firstName}'s work experience:\n${expList}\n\nCheck the Experience section for full details!`;
    }

    // --- Projects ---
    if (text.includes('project') || text.includes('build') || text.includes('built') || text.includes('made') || text.includes('develop') || text.includes('app') || text.includes('application') || text.includes('portfolio') || text.includes('website') || text.includes('web') || text.includes('software')) {
      const projList = portfolioData.projects.map(p => `• ${p.title}: ${p.description}`).join('\n\n');
      return `Here are some of ${info.firstName}'s featured projects:\n\n${projList}`;
    }

    // --- Contact ---
    if (text.includes('contact') || text.includes('reach') || text.includes('email') || text.includes('hire') || text.includes('phone') || text.includes('linkedin') || text.includes('github') || text.includes('connect') || text.includes('message') || text.includes('talk to') || text.includes('get in touch') || text.includes('dm')) {
      return `You can reach ${info.firstName} via:\n• 📧 Email: ${info.email}\n• 💼 LinkedIn: ${info.linkedin}\n• 🐙 GitHub: ${info.github}\n\nOr fill out the Contact form on this page!`;
    }

    // --- Education ---
    if (text.includes('education') || text.includes('college') || text.includes('university') || text.includes('degree') || text.includes('study') || text.includes('studied') || text.includes('student') || text.includes('school') || text.includes('course') || text.includes('graduation') || text.includes('academic') || text.includes('btech') || text.includes('b.tech') || text.includes('cse') || text.includes('computer')) {
      return `🎓 ${info.firstName} is a Computer Science undergraduate at Techno International New Town (TINT). He is passionate about algorithms, systems design, and AI!`;
    }

    // --- Hackathons ---
    if (text.includes('hackathon') || text.includes('competition') || text.includes('contest') || text.includes('compete') || text.includes('event') || text.includes('monad') || text.includes('blitz') || text.includes('finalist')) {
      return `🏆 ${info.firstName} is a passionate hackathon competitor! He has competed in ${info.hackathonsCount} hackathons and has been a finalist in several, including a top-5 finish at Monad-Blitz!`;
    }

    // --- LeetCode / DSA ---
    if (text.includes('leetcode') || text.includes('dsa') || text.includes('data structure') || text.includes('algorithm') || text.includes('coding') || text.includes('competitive') || text.includes('problem solving') || text.includes('solve')) {
      return `💡 ${info.firstName} is active on LeetCode with ${info.leetcodeCount} problems solved, and he won 1st place in his university's DSA tournament!`;
    }

    // --- Location ---
    if (text.includes('location') || text.includes('where') || text.includes('city') || text.includes('country') || text.includes('based') || text.includes('live') || text.includes('from') || text.includes('place')) {
      return `📍 ${info.firstName} is based in ${info.baseLocation}. He's open to remote opportunities worldwide!`;
    }

    // --- Availability ---
    if (text.includes('available') || text.includes('open to work') || text.includes('freelance') || text.includes('full time') || text.includes('part time') || text.includes('remote') || text.includes('opportunit') || text.includes('looking for') || text.includes('internship')) {
      return `✅ Yes! ${info.firstName} is currently open to opportunities — including internships, full-time roles, and freelance projects. Feel free to reach out at ${info.email}!`;
    }

    // --- Thanks / Bye ---
    if (text.includes('thank') || text.includes('thanks') || text.includes('bye') || text.includes('goodbye') || text.includes('see you') || text.includes('great') || text.includes('awesome') || text.includes('nice') || text.includes('cool') || text.includes('wow')) {
      return `You're welcome! 😊 Feel free to ask anything else about ${info.firstName}. Good luck!`;
    }

    // --- Help ---
    if (text.includes('help') || text.includes('what can you') || text.includes('what do you') || text.includes('option') || text.includes('topic') || text.includes('tell me')) {
      return `I can help you with:\n\n• 💻 Skills & Technologies\n• 💼 Work Experience\n• 🚀 Projects\n• 🎓 Education\n• 🏆 Hackathons & Achievements\n• 📞 Contact Information\n• 📍 Location & Availability\n\nJust ask me anything!`;
    }

    // --- Achievements ---
    if (text.includes('achievement') || text.includes('award') || text.includes('accomplish') || text.includes('win') || text.includes('won') || text.includes('certif') || text.includes('honor') || text.includes('recogni') || text.includes('publication') || text.includes('research') || text.includes('paper') || text.includes('ieee')) {
      return `🌟 ${info.firstName}'s highlights:\n• 1st Runner-Up at Hack-TINT 2025\n• 1st Runner-Up at Smart Make-a-Thon 2025\n• Finalist at Smart Bengal Hackathon 2024\n• Published IEEE research paper on YOLOv8\n• ${info.leetcodeCount} LeetCode problems solved`;
    }

    // --- Varied fallbacks ---
    const fallbacks = [
      `Hmm, I'm not sure about that! 🤔 But I can tell you about ${info.firstName}'s skills, projects, experience, or how to contact him. What would you like to know?`,
      `That's a bit outside my knowledge! 😅 Try asking me about ${info.firstName}'s projects, skills, or experience!`,
      `I didn't quite get that, but I'm here to help! 💬 You can ask about ${info.firstName}'s work, education, or contact info.`,
      `I'm limited to info about ${info.firstName}'s portfolio. 🙂 Ask me about his skills, hackathons, or projects!`,
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
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
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                Online
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
