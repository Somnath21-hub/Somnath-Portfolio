import React, { useState, useEffect } from 'react';
import { Menu, X, Send, Sun, Moon } from 'lucide-react';
import { portfolioData } from '../data';

const LinkedinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const LeetcodeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className={className}>
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.777 9.778a3.73 3.73 0 0 0 0 5.284l1.405 1.406a1.487 1.487 0 0 0 2.218-.098l8.673-8.848a1.665 1.665 0 0 1 2.34 0l1.028 1.028a1.665 1.665 0 0 1 0 2.34l-5.607 5.61a1.485 1.485 0 0 0 0 2.1l1.405 1.405a3.73 3.73 0 0 0 5.284 0l5.613-5.61a3.73 3.73 0 0 0 0-5.284l-9.785-9.79a1.374 1.374 0 0 0-.968-.415z" />
    <path d="M0 13.483c0-.365.148-.717.414-.962L5.335 7.6a1.37 1.37 0 0 1 1.961 0l3.07 3.072a1.37 1.37 0 0 1 0 1.96l-4.919 4.921a3.73 3.73 0 0 1-5.284 0l-1.405-1.405a1.374 1.374 0 0 1-.347-.733l-.004-.002z" />
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section highlighting logic
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const { firstName, github, linkedin, leetcode } = portfolioData.personalInfo;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-5 ${
        isScrolled 
          ? 'bg-background/85 backdrop-blur-md border-b border-border/40 shadow-lg py-3' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => scrollToSection('about')} 
          className="flex items-center cursor-pointer opacity-90 group"
        >
          <img 
            src="/logo.png" 
            alt="Somnath" 
            className={`w-auto object-contain group-hover:scale-105 transition-all duration-500 ${
              isScrolled ? 'h-6' : 'h-8'
            }`}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full border border-border/40 bg-secondary/40 backdrop-blur-sm">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`nav-link px-3 py-1.5 rounded-full transition-all duration-300 text-xs border ${
                activeSection === item.id 
                  ? 'bg-primary/25 border-primary/30 text-accent font-bold shadow-[0_0_12px_rgba(124,58,237,0.3)]' 
                  : 'bg-transparent border-transparent hover:bg-muted/50 text-muted-foreground hover:text-foreground hover:scale-105'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-border/40 bg-secondary/40 text-muted-foreground hover:text-accent hover:border-primary/40 transition-all duration-200 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Social Icons Group (Horizontal) */}
          <div className="hidden md:flex items-center gap-2">

            <a 
              href={linkedin}
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center w-9 h-9 rounded-full border border-border/40 bg-secondary/40 text-muted-foreground hover:text-accent hover:border-primary/40 transition-all duration-200"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a 
              href={leetcode}
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center w-9 h-9 rounded-full border border-border/40 bg-secondary/40 text-muted-foreground hover:text-accent hover:border-primary/40 transition-all duration-200"
              aria-label="LeetCode Profile"
            >
              <LeetcodeIcon className="w-4 h-4" />
            </a>
            <a 
              href={github}
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center w-9 h-9 rounded-full border border-border/40 bg-secondary/40 text-muted-foreground hover:text-accent hover:border-primary/40 transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>

          <button 
            onClick={() => scrollToSection('contact')}
            className="btn-primary text-xs px-4 py-2 hidden xl:flex items-center gap-1.5"
          >
            <Send size={13} />
            Connect
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg border border-border/40 bg-secondary/40 text-[#c4b5fd] hover:bg-secondary/60 transition-colors"
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div 
        className={`fixed inset-x-0 top-[60px] bottom-0 bg-background/98 backdrop-blur-lg border-t border-border/40 z-40 transition-all duration-300 lg:hidden flex flex-col p-6 gap-4 ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-2 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left py-3 px-4 rounded-xl transition-all duration-200 text-sm font-semibold ${
                activeSection === item.id 
                  ? 'bg-primary/20 border border-primary/30 text-accent font-bold' 
                  : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        <div className="mt-auto flex flex-col gap-4 pb-8">
          {/* Theme Toggle & Social Icons for Mobile */}
          <div className="flex items-center justify-between border-t border-border/40 pt-4">
            <span className="text-xs font-semibold text-muted-foreground">Theme</span>
            <button 
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-border/40 bg-secondary/40 text-muted-foreground hover:text-accent transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-border/40 pt-4">
            <span className="text-xs font-semibold text-muted-foreground">Socials</span>
            <div className="flex items-center gap-2">
              <a 
                href={linkedin}
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-9 h-9 rounded-full border border-border/40 bg-secondary/40 text-muted-foreground hover:text-accent transition-all duration-200"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a 
                href={leetcode}
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-9 h-9 rounded-full border border-border/40 bg-secondary/40 text-muted-foreground hover:text-accent transition-all duration-200"
                aria-label="LeetCode Profile"
              >
                <LeetcodeIcon className="w-4 h-4" />
              </a>
              <a 
                href={github}
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-9 h-9 rounded-full border border-border/40 bg-secondary/40 text-muted-foreground hover:text-accent transition-all duration-200"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <button 
            onClick={() => scrollToSection('contact')}
            className="w-full btn-primary justify-center py-3 rounded-xl font-bold text-sm mt-2"
          >
            Connect With Me
          </button>
        </div>
      </div>
    </header>
  );
}
