import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Code, Download, Sparkles, GraduationCap } from 'lucide-react';
import { portfolioData } from '../data';
import { trackVisit, getVisitorStats } from '../utils/visitorTracker';
import { fetchLeetCodeStats } from '../utils/leetcodeFetcher';

export default function Hero() {
  const { 
    firstName, 
    lastName, 
    roles, 
    bioLine1, 
    bioLine2, 
    github, 
    resumeLink, 
    workExpYears, 
    hackathonsCount, 
    leetcodeCount 
  } = portfolioData.personalInfo;

  const [visitorCount, setVisitorCount] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);
  const [realtimeLeetcodeCount, setRealtimeLeetcodeCount] = useState(leetcodeCount);

  const leetcodeUrl = portfolioData.personalInfo.leetcode || '';
  const leetcodeUsername = leetcodeUrl.replace(/\/$/, '').split('/').pop() || 'Somnath21';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        await trackVisit();
        const data = await getVisitorStats();
        if (data.success) {
          setVisitorCount(data.totalCount);
        }
      } catch (err) {
        console.error('Failed to load visitor stats in hero:', err);
      } finally {
        setLoadingStats(false);
      }
    };

    const fetchLcStats = async () => {
      try {
        const data = await fetchLeetCodeStats(leetcodeUsername);
        if (data && typeof data.totalSolved === 'number') {
          setRealtimeLeetcodeCount(data.totalSolved);
        }
      } catch (err) {
        console.error('Failed to fetch Leetcode stats:', err);
      }
    };

    fetchStats();
    fetchLcStats();
  }, [leetcodeUsername]);

  const renderStaggeredText = (text, startIdx, extraClass = '') => {
    return text.split('').map((char, index) => {
      const globalIndex = startIdx + index;
      const delay = 0.15 + globalIndex * 0.035; // 35ms stagger
      return (
        <span
          key={index}
          className={`animate-letter-reveal ${extraClass}`}
          style={{
            animationDelay: `${delay}s`,
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <section 
      id="about" 
      className="relative min-h-screen flex items-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden dot-pattern"
    >
      {/* Radial Backdrops */}
      <div 
        className="absolute top-[15%] right-[10%] w-72 h-72 rounded-full pointer-events-none transition-transform duration-700 ease-out" 
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
      ></div>
      <div 
        className="absolute bottom-[20%] left-[5%] w-56 h-56 rounded-full pointer-events-none transition-transform duration-1000 ease-out" 
        style={{
          background: 'radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)',
          filter: 'blur(50px)'
        }}
      ></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bio and Intro */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Title */}
            <div>
              <h1 
                className="font-extrabold leading-[1.02] tracking-tight text-foreground"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
              >
                {renderStaggeredText("Hi, I'm ", 0)}
                {renderStaggeredText(firstName, 8, "gradient-text")}
                <br />
                <span className="text-foreground/90">{renderStaggeredText(lastName, 8 + firstName.length)}</span>
              </h1>
            </div>

            {/* Badges */}
            <div 
              className="flex flex-wrap gap-2 animate-slide-in-blur" 
              style={{ animationDelay: '1.0s' }}
            >
              {roles.map((role, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-semibold border border-primary/30 bg-primary/10 text-accent"
                >
                  {role}
                </span>
              ))}
            </div>

            {/* Bio Text */}
            <div 
              className="flex flex-col gap-3 animate-slide-in-blur" 
              style={{ animationDelay: '1.15s' }}
            >
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                A <span className="text-accent font-semibold">developer by heart</span> and {bioLine1.split("and")[1] || bioLine1}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                {bioLine2}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div 
              className="flex flex-wrap gap-3 items-center animate-slide-in-blur" 
              style={{ animationDelay: '1.3s' }}
            >
              <a href="#projects" className="btn-primary">
                View Projects <ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn-outline">
                Contact Me <Mail size={16} />
              </a>
              <a 
                href={github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors font-semibold text-sm"
              >
                <Code size={16} /> github.com/{firstName.toLowerCase()}
              </a>
            </div>

            {/* Secondary Actions (Resume) */}
            <div 
              className="flex flex-wrap gap-3 items-center animate-slide-in-blur" 
              style={{ animationDelay: '1.45s' }}
            >
              <a 
                href={resumeLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-accent/40 bg-accent/10 text-accent hover:bg-accent/20 transition-colors font-semibold text-sm"
              >
                <Download size={16} /> Download Resume
              </a>
            </div>
          </div>

          {/* Right Column: Avatar and Stats */}
          <div className="lg:col-span-5 flex flex-col items-center gap-6">
            {/* Orbital Avatar Frame */}
            <div className="relative animate-scale-in-blur" style={{ animationDelay: '0.75s' }}>
              <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                
                {/* Rotating Rings */}
                <div className="absolute inset-0 rounded-full border border-primary/20 animate-orbit"></div>
                <div className="absolute inset-4 rounded-full border border-accent/15 animate-orbit-reverse"></div>
                
                {/* Profile Picture */}
                <div className="absolute inset-8 rounded-full border-2 border-primary/40 overflow-hidden glow-violet animate-pulse-glow bg-[#1a0f3d]">
                  <img 
                    src="/profile.png" 
                    alt={firstName} 
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      // fallback to initial letter avatar if image doesn't exist
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = `<div class="w-full h-full flex items-center justify-center text-7xl font-bold bg-primary/20 text-accent">${firstName[0]}</div>`;
                    }}
                  />
                </div>

                {/* Floating Tags */}
                <div className="absolute -top-3 -right-3 glass-card px-3 py-1.5 animate-float flex items-center gap-1.5 border border-primary/30">
                  <GraduationCap size={13} className="text-accent" />
                  <span className="text-muted-foreground text-xs font-semibold">B.Tech CSE</span>
                </div>
                <div 
                  className="absolute -bottom-2 -left-4 glass-card px-3 py-1.5 animate-float flex items-center gap-1.5 border border-accent/20"
                  style={{ animationDelay: '1.4s' }}
                >
                  <Sparkles size={13} className="text-accent" />
                  <span className="text-muted-foreground text-xs font-semibold">AI/ML</span>
                </div>

              </div>
            </div>

            {/* Visitor Counter */}
            <div 
              className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 select-none animate-slide-in-blur shadow-[0_0_15px_rgba(16,185,129,0.05)] cursor-default card-hover"
              style={{ animationDelay: '1.05s' }}
              title="Total unique profile views"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span>
                {loadingStats ? '...' : `${visitorCount} views`}
              </span>
            </div>

            {/* Quick Stats Grid */}
            <div 
              className="grid grid-cols-3 gap-3 w-full max-w-sm animate-slide-in-blur"
              style={{ animationDelay: '1.35s' }}
            >
              <div className="glass-card px-3 py-3 flex flex-col items-center text-center card-hover border border-primary/15">
                <span className="text-xl font-black gradient-text">{workExpYears}</span>
                <span className="text-muted-foreground text-[10px] font-semibold uppercase tracking-wider mt-0.5">Work Exp.</span>
              </div>
              <div className="glass-card px-3 py-3 flex flex-col items-center text-center card-hover border border-primary/15">
                <span className="text-xl font-black gradient-text">{hackathonsCount}</span>
                <span className="text-muted-foreground text-[10px] font-semibold uppercase tracking-wider mt-0.5">Hackathons</span>
              </div>
              <div className="glass-card px-3 py-3 flex flex-col items-center text-center card-hover border border-primary/15">
                <span className="text-xl font-black gradient-text">{realtimeLeetcodeCount}</span>
                <span className="text-muted-foreground text-[10px] font-semibold uppercase tracking-wider mt-0.5">LeetCode</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
