import React, { useState, useEffect, useRef } from 'react';
import { Code2, ExternalLink, Sparkles, Terminal, Globe } from 'lucide-react';
import { portfolioData } from '../data';
import { fetchLeetCodeStats } from '../utils/leetcodeFetcher';


export default function Projects() {
  const { projects } = portfolioData;
  const [isEditing, setIsEditing] = useState(false);
  const [animate, setAnimate] = useState(false);
  const cardRef = useRef(null);

  const defaultStats = portfolioData.leetcodeStats || {
    easySolved: 72,
    easyTotal: 150,
    mediumSolved: 63,
    mediumTotal: 150,
    hardSolved: 15,
    hardTotal: 100
  };

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('leetcode_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultStats;
      }
    }
    return defaultStats;
  });

  const leetcodeUrl = portfolioData.personalInfo.leetcode || '';
  const leetcodeUsername = leetcodeUrl.replace(/\/$/, '').split('/').pop() || 'Somnath21';

  useEffect(() => {
    const fetchLcStats = async () => {
      try {
        const data = await fetchLeetCodeStats(leetcodeUsername);
        if (data && typeof data.totalSolved === 'number') {
          const updated = {
            easySolved: data.easySolved,
            easyTotal: data.easyTotal,
            mediumSolved: data.mediumSolved,
            mediumTotal: data.mediumTotal,
            hardSolved: data.hardSolved,
            hardTotal: data.hardTotal,
          };
          setStats(updated);
          localStorage.setItem('leetcode_stats', JSON.stringify(updated));
        }
      } catch (err) {
        console.error('Failed to load real-time leetcode stats in projects:', err);
      }
    };
    fetchLcStats();
  }, [leetcodeUsername]);

  useEffect(() => {
    // Backup fallback in case observer doesn't fire immediately
    const fallbackTimer = setTimeout(() => {
      setAnimate(true);
    }, 1500);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          clearTimeout(fallbackTimer);
        } else {
          setAnimate(false); // reset animation state when out of view
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.05 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleStatChange = (key, val) => {
    const updated = { ...stats, [key]: Math.max(0, parseInt(val) || 0) };
    setStats(updated);
    localStorage.setItem('leetcode_stats', JSON.stringify(updated));
  };

  const totalSolved = stats.easySolved + stats.mediumSolved + stats.hardSolved;
  const totalTarget = stats.easyTotal + stats.mediumTotal + stats.hardTotal;
  const completionPercentage = Math.min((totalSolved / totalTarget) * 100, 100);
  
  const r = 60;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = animate 
    ? circumference * (1 - completionPercentage / 100) 
    : circumference;

  const [displaySolved, setDisplaySolved] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = totalSolved;
    if (end === 0) {
      setDisplaySolved(0);
      return;
    }
    
    const duration = 1200; // 1.2s count-up duration
    const startTime = performance.now();

    const animateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = progress * (2 - progress); // Ease out quadratic
      const currentCount = Math.floor(easeProgress * end);
      
      setDisplaySolved(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [totalSolved]);

  return (
    <section id="projects" className="pt-20 pb-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14 scroll-reveal visible">
          <span className="section-label mb-4 inline-flex">
            <Code2 size={12} /> Projects
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 text-foreground">
            Things I've <span className="gradient-text">Built</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto text-base">
            Featured projects and live GitHub contributions.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
          {projects.map((proj, idx) => (
            <div key={idx} className="scroll-reveal visible">
              <div className="glass-card p-6 flex flex-col h-full card-hover border border-primary/15 min-h-[200px]">
                
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div className="flex items-start gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-primary/25 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Terminal size={14} className="text-accent" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground hover:text-accent transition-colors leading-tight">
                      {proj.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
                    <a 
                      href={proj.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-colors flex items-center justify-center"
                      aria-label="GitHub Link"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </a>
                    {proj.demo && proj.demo !== '#' && (
                      <a 
                        href={proj.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[10px] font-bold text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/20 hover:border-rose-400/40 px-2.5 py-1 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(244,63,94,0.15)] hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] select-none cursor-pointer"
                        aria-label="Live Demo Link"
                      >
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
                        </span>
                        <Globe size={11} className="text-rose-400" />
                        <span>Live View</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                  {proj.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {proj.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary text-secondary-foreground border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* LeetCode Stats Widget */}
        <div>
          <div ref={cardRef} className="glass-card p-6 border border-primary/15 max-w-3xl mx-auto relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" width="20" height="20" className="text-amber-500 fill-current">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.777 9.778a3.73 3.73 0 0 0 0 5.284l1.405 1.406a1.487 1.487 0 0 0 2.218-.098l8.673-8.848a1.665 1.665 0 0 1 2.34 0l1.028 1.028a1.665 1.665 0 0 1 0 2.34l-5.607 5.61a1.485 1.485 0 0 0 0 2.1l1.405 1.405a3.73 3.73 0 0 0 5.284 0l5.613-5.61a3.73 3.73 0 0 0 0-5.284l-9.785-9.79a1.374 1.374 0 0 0-.968-.415z" />
                  <path d="M0 13.483c0-.365.148-.717.414-.962L5.335 7.6a1.37 1.37 0 0 1 1.961 0l3.07 3.072a1.37 1.37 0 0 1 0 1.96l-4.919 4.921a3.73 3.73 0 0 1-5.284 0l-1.405-1.405a1.374 1.374 0 0 1-.347-.733l-.004-.002z" />
                </svg>
                <h3 className="font-bold text-base text-foreground">
                  LeetCode Practice Dashboard
                </h3>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 text-accent hover:bg-primary/20 hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center ml-1"
                  aria-label="Edit solved stats"
                  title="Edit Solved Counts"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </button>
              </div>
              <a 
                href={portfolioData.personalInfo.leetcode} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold text-accent hover:underline flex items-center gap-1.5 btn-outline py-1.5 px-3 self-start sm:self-auto"
              >
                View Profile <ExternalLink size={11} />
              </a>
            </div>

            {/* Inline Editor */}
            {isEditing && (
              <div className="mb-6 p-4 rounded-xl bg-secondary/50 border border-primary/20 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end animate-slide-in-blur" style={{ animationDuration: '0.4s' }}>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider truncate">Easy</span>
                  <input 
                    type="number"
                    value={stats.easySolved}
                    onChange={(e) => handleStatChange('easySolved', e.target.value)}
                    className="w-full bg-input border border-border/60 rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider truncate">Medium</span>
                  <input 
                    type="number"
                    value={stats.mediumSolved}
                    onChange={(e) => handleStatChange('mediumSolved', e.target.value)}
                    className="w-full bg-input border border-border/60 rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider truncate">Hard</span>
                  <input 
                    type="number"
                    value={stats.hardSolved}
                    onChange={(e) => handleStatChange('hardSolved', e.target.value)}
                    className="w-full bg-input border border-border/60 rounded-lg px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="col-span-1 sm:col-span-3 flex justify-end mt-2">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="btn-primary py-1.5 px-4 text-xs rounded-lg"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Circular Progress (Left) */}
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="72" 
                      cy="72" 
                      r="60" 
                      className="stroke-secondary fill-transparent" 
                      strokeWidth="8" 
                    />
                    <circle 
                      cx="72" 
                      cy="72" 
                      r="60" 
                      className="stroke-primary fill-transparent transition-all duration-1000 ease-out" 
                      strokeWidth="8" 
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-black text-foreground">
                      {displaySolved}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Solved</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-xs font-semibold text-muted-foreground">Practice Performance & Consistency</span>
                </div>
              </div>

              {/* Progress bars (Right) */}
              <div className="md:col-span-7 flex flex-col gap-4">
                
                {/* Easy Questions */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-emerald-400">Easy</span>
                    <span className="text-foreground">{stats.easySolved} <span className="text-muted-foreground">solved</span></span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-400 rounded-full animate-pulse-glow transition-all duration-1000 ease-out" 
                      style={{ width: animate ? `${(stats.easySolved / stats.easyTotal) * 100}%` : '0%' }}
                    ></div>
                  </div>
                </div>

                {/* Medium Questions */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-amber-400">Medium</span>
                    <span className="text-foreground">{stats.mediumSolved} <span className="text-muted-foreground">solved</span></span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-400 rounded-full animate-pulse-glow transition-all duration-1000 ease-out" 
                      style={{ width: animate ? `${(stats.mediumSolved / stats.mediumTotal) * 100}%` : '0%' }}
                    ></div>
                  </div>
                </div>

                {/* Hard Questions */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-rose-500">Hard</span>
                    <span className="text-foreground">{stats.hardSolved} <span className="text-muted-foreground">solved</span></span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-rose-500 rounded-full animate-pulse-glow transition-all duration-1000 ease-out" 
                      style={{ width: animate ? `${(stats.hardSolved / stats.hardTotal) * 100}%` : '0%' }}
                    ></div>
                  </div>
                </div>

                {/* Extra Stats */}
                <div className="grid grid-cols-2 gap-3 mt-2 border-t border-border/40 pt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Top Skills</span>
                    <span className="text-xs font-semibold text-foreground">DSA, Algorithms</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Practice Days</span>
                    <span className="text-xs font-semibold text-foreground">120+ Active Days</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
