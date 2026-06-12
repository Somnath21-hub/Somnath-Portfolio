import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { portfolioData } from '../data';

const Github = ({ size = 24, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 24, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const { personalInfo } = portfolioData;
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatus('validation_error');
      return;
    }
    
    setStatus('sending');

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_KEY_HERE";

      if (!accessKey || accessKey === "YOUR_KEY_HERE") {
        console.warn("Web3Forms access key is not set.");
        setStatus('api_error');
        return;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          subject: formState.subject || "Portfolio Contact Message",
          message: formState.message
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        console.error("Web3Forms error:", data);
        setStatus('api_error');
      }
    } catch (error) {
      console.error("Submit error:", error);
      setStatus('api_error');
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14 scroll-reveal visible">
          <span className="section-label mb-4 inline-flex">
            <Mail size={12} /> Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 text-foreground">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto text-base">
            Open to full-time roles, freelance projects, and collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 scroll-reveal visible">
            <div className="glass-card p-6 sm:p-8 border border-primary/15">
              <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                <MessageSquare size={18} className="text-accent" /> Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Name
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="bg-input border border-border/60 rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Email
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      className="bg-input border border-border/60 rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    placeholder="Subject of message"
                    className="bg-input border border-border/60 rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Message
                  </label>
                  <textarea 
                    id="message"
                    name="message"
                    rows="5"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="bg-input border border-border/60 rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50 resize-none"
                    required
                  ></textarea>
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="flex items-center gap-2 p-3.5 rounded-lg border border-green-500/20 bg-green-500/10 text-green-400 text-sm font-semibold animate-pulse">
                    <CheckCircle2 size={16} /> Message sent successfully! I'll get back to you shortly.
                  </div>
                )}
                {status === 'validation_error' && (
                  <div className="flex items-center gap-2 p-3.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-sm font-semibold">
                    <AlertCircle size={16} /> Please fill out all required fields.
                  </div>
                )}
                {status === 'api_error' && (
                  <div className="flex flex-col gap-1 p-3.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-semibold">
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle size={16} className="shrink-0" /> Web3Forms Key Error
                    </div>
                    <p className="mt-1 text-red-300 font-normal">
                      Please register a free key on <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white font-semibold">web3forms.com</a>, add it to your `.env` file, and restart your server.
                    </p>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="btn-primary mt-2 justify-center py-3 rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message <Send size={15} />
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-5 scroll-reveal visible">
            <div className="glass-card p-6 sm:p-8 border border-primary/15 h-full flex flex-col justify-between gap-8">
              
              <div>
                <h3 className="text-lg font-extrabold text-foreground mb-1">
                  {personalInfo.fullName}
                </h3>
                <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-6">
                  B.Tech CSE · {personalInfo.baseLocation}
                </p>

                <div className="flex flex-col gap-4 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-accent">
                      <Mail size={14} />
                    </div>
                    <a href={`mailto:${personalInfo.email}`} className="hover:text-accent transition-colors font-medium">
                      {personalInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-accent">
                      <Github size={14} />
                    </div>
                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors font-medium">
                      {personalInfo.github.replace('https://github.com/', 'github.com/')}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-accent">
                      <Linkedin size={14} />
                    </div>
                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors font-medium">
                      {personalInfo.linkedin.replace('https://www.linkedin.com/in/', 'linkedin.com/in/').replace('https://linkedin.com/in/', 'linkedin.com/in/')}
                    </a>
                  </div>
                </div>

                <div className="border-t border-border/40 pt-6">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                    Availability
                  </h4>
                  <p className="text-sm text-muted-foreground font-semibold">
                    Internships · Full-time · Freelance
                  </p>
                </div>
              </div>

              <div className="text-xs text-muted-foreground/60 font-semibold border-t border-border/40 pt-4">
                &copy; {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
