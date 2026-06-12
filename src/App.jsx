import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Community from './components/Community';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  // Initialize IntersectionObserver for scroll-reveal animations
  useEffect(() => {
    if (loading) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const elementsToReveal = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left');
    
    elementsToReveal.forEach((el) => observer.observe(el));

    return () => {
      elementsToReveal.forEach((el) => observer.unobserve(el));
    };
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-[#0f0a1e] text-[#f5f3ff] overflow-x-hidden selection:bg-primary/35 selection:text-white">
      {loading && <Loader onComplete={() => setLoading(false)} />}
      {/* Background glowing effects */}
      <div 
        className="fixed top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.07] mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
          filter: 'blur(100px)'
        }}
      />
      <div 
        className="fixed bottom-0 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.05] mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)',
          filter: 'blur(120px)'
        }}
      />

      <Header />
      
      <main className="relative z-10">
        {/* About Section is the Hero */}
        <Hero />
        
        {/* Experience Section */}
        <Experience />
        
        {/* Projects Section */}
        <div className="border-t border-[#2d1f4e]/30">
          <Projects />
        </div>
        
        {/* Skills Section */}
        <div className="border-t border-[#2d1f4e]/30">
          <Skills />
        </div>
        
        {/* Achievements Section */}
        <div className="border-t border-[#2d1f4e]/30">
          <Achievements />
        </div>
        
        {/* Leadership & Community Section */}
        <div className="border-t border-[#2d1f4e]/30">
          <Community />
        </div>
        

        {/* Contact Section */}
        <div className="border-t border-[#2d1f4e]/30 bg-secondary/5">
          <Contact />
        </div>
      </main>

      {/* Floating Chatbot Assistant */}
      <Chatbot />
    </div>
  );
}

export default App;
