import React, { useState, useEffect, useRef } from 'react';
import { Code2, ExternalLink, Terminal, Globe } from 'lucide-react';
import { portfolioData } from '../data';
import { fetchLeetCodeStats } from '../utils/leetcodeFetcher';

export default function Projects() {
  const { projects } = portfolioData;
  const [animate, setAnimate] = useState(false);
  const cardRef = useRef(null);

  const defaultStats = portfolioData.leetcodeStats || {
    easySolved: 72,
    easyTotal: 150,
    mediumSolved: 63,
    mediumTotal: 150,
    hardSolved: 15,
    hardTotal: 100,
    submissionCalendar: {},
  };

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('leetcode_stats');
    if (saved) {
      try { return JSON.parse(saved); } catch { return defaultStats; }
    }
    return defaultStats;
  });



  const leetcodeUrl = portfolioData.personalInfo.leetcode || '';
  const leetcodeUsername = leetcodeUrl.replace(/\/$/, '').split('/').pop() || 'Somnath21';

  // Fetch stats and refresh every 5 min
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
            submissionCalendar: data.submissionCalendar || {},
          };
          setStats(updated);
          localStorage.setItem('leetcode_stats', JSON.stringify(updated));
        }
      } catch (err) {
        console.error('Failed to load leetcode stats:', err);
      }
    };
    fetchLcStats();
    const interval = setInterval(fetchLcStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [leetcodeUsername]);

  // Trigger fade-in animation when card enters viewport
  useEffect(() => {
    const fallbackTimer = setTimeout(() => setAnimate(true), 800);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          clearTimeout(fallbackTimer);
        } else {
          setAnimate(false);
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      clearTimeout(fallbackTimer);
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  const totalSolved = stats.easySolved + stats.mediumSolved + stats.hardSolved;

  // Animated count-up
  const [displaySolved, setDisplaySolved] = useState(0);
  useEffect(() => {
    if (totalSolved === 0) { setDisplaySolved(0); return; }
    const duration = 1400;
    const startTime = performance.now();
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = p * (2 - p);
      setDisplaySolved(Math.floor(eased * totalSolved));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [totalSolved]);

  // ── Contribution Calendar Calculations (UTC-based) ────────────────
  const submissionsMap = {};
  if (stats.submissionCalendar) {
    Object.entries(stats.submissionCalendar).forEach(([ts, count]) => {
      const date = new Date(parseInt(ts) * 1000);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      submissionsMap[dateStr] = (submissionsMap[dateStr] || 0) + count;
    });
  }

  const today = new Date();
  const startDate = new Date(Date.UTC(2026, 2, 28)); // Fixed to March 28, 2026
  const startDayOfWeek = startDate.getUTCDay();
  startDate.setUTCDate(startDate.getUTCDate() - startDayOfWeek); // Align to Sunday (March 22, 2026)

  const endDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  const endDayOfWeek = endDate.getUTCDay();
  endDate.setUTCDate(endDate.getUTCDate() + (6 - endDayOfWeek)); // Align to Saturday of current week

  const daysList = [];
  const currDate = new Date(startDate);
  while (currDate <= endDate) {
    const dateObj = new Date(currDate);
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    const count = submissionsMap[dateStr] || 0;

    let level = 0;
    if (count > 0) {
      if (count === 1) level = 1;
      else level = 2; // 2 or more submissions
    }

    daysList.push({
      date: dateObj,
      dateStr,
      count,
      level,
    });
    currDate.setUTCDate(currDate.getUTCDate() + 1);
  }

  const weeksList = [];
  for (let i = 0; i < daysList.length; i += 7) {
    weeksList.push(daysList.slice(i, i + 7));
  }

  // Month labels positioning
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthLabels = [];
  let lastMonth = null;

  weeksList.forEach((week, index) => {
    const midDay = week[3];
    const monthName = monthNames[midDay.date.getUTCMonth()];
    if (monthName !== lastMonth) {
      const lastLabel = monthLabels[monthLabels.length - 1];
      if (lastLabel && index - lastLabel.index < 3) {
        if (lastLabel.index === 0) {
          monthLabels[monthLabels.length - 1] = { text: monthName, index };
        }
      } else {
        monthLabels.push({ text: monthName, index });
      }
      lastMonth = monthName;
    }
  });

  return (
    <section id="projects" className="pt-20 pb-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Section Header ── */}
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

        {/* ── Project Cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
          {projects.map((proj, idx) => (
            <div key={idx} className="scroll-reveal visible">
              <div className="glass-card p-6 flex flex-col h-full card-hover border border-primary/15 min-h-[200px]">
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
                    <a href={proj.github} target="_blank" rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-colors" aria-label="GitHub">
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </a>
                    {proj.demo && proj.demo !== '#' && (
                      <a href={proj.demo} target="_blank" rel="noopener noreferrer" aria-label="Live Demo"
                        className="flex items-center gap-1.5 text-[10px] font-bold text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/20 hover:border-rose-400/40 px-2.5 py-1 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(244,63,94,0.15)] hover:shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500" />
                        </span>
                        <Globe size={11} className="text-rose-400" />
                        <span>Live View</span>
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {proj.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary text-secondary-foreground border border-border/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── LeetCode Stats Widget ── */}
        <div>
          <div ref={cardRef} className="glass-card p-4 sm:p-6 border border-primary/15 max-w-3xl mx-auto relative overflow-hidden">

            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" width="20" height="20" className="text-amber-500 fill-current shrink-0">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.777 9.778a3.73 3.73 0 0 0 0 5.284l1.405 1.406a1.487 1.487 0 0 0 2.218-.098l8.673-8.848a1.665 1.665 0 0 1 2.34 0l1.028 1.028a1.665 1.665 0 0 1 0 2.34l-5.607 5.61a1.485 1.485 0 0 0 0 2.1l1.405 1.405a3.73 3.73 0 0 0 5.284 0l5.613-5.61a3.73 3.73 0 0 0 0-5.284l-9.785-9.79a1.374 1.374 0 0 0-.968-.415z" />
                  <path d="M0 13.483c0-.365.148-.717.414-.962L5.335 7.6a1.37 1.37 0 0 1 1.961 0l3.07 3.072a1.37 1.37 0 0 1 0 1.96l-4.919 4.921a3.73 3.73 0 0 1-5.284 0l-1.405-1.405a1.374 1.374 0 0 1-.347-.733l-.004-.002z" />
                </svg>
                <h3 className="font-bold text-base text-foreground">LeetCode Practice Dashboard</h3>
              </div>
              <a href={portfolioData.personalInfo.leetcode} target="_blank" rel="noopener noreferrer"
                className="text-xs font-bold text-accent hover:underline flex items-center gap-1.5 btn-outline py-1.5 px-3 self-start sm:self-auto">
                View Profile <ExternalLink size={11} />
              </a>
            </div>

            {/* Info row */}
            <div className="flex items-end justify-between mb-6 px-0.5">
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-0.5">Problems Solved</p>
                <p className="text-2xl font-black text-foreground leading-none">
                  {displaySolved}
                  <span className="text-xs font-semibold text-muted-foreground ml-1.5">total</span>
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  Live · auto-refreshes
                </span>
              </div>
            </div>

            {/* Contribution Calendar Widget Block */}
            <div className="w-full rounded-xl p-3 sm:p-5 border border-white/5" style={{ background: 'rgba(15,10,30,0.45)', opacity: animate ? 1 : 0, transition: 'opacity 0.6s ease-out' }}>
              
              {/* Grid Scroll Area */}
              <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent flex flex-col sm:items-center">
                <div className="inline-block min-w-max">
                  {/* Column grid */}
                  <div className="flex gap-[3.5px]">
                    {weeksList.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-[3.5px] shrink-0">
                        {week.map((day, dIdx) => (
                          <div
                            key={dIdx}
                            className={`w-[10px] h-[10px] rounded-[1.5px] border transition-all duration-300 hover:scale-125 hover:z-10 cursor-pointer ${
                              day.level === 0 ? 'bg-white/5 border-white/5' :
                              day.level === 1 ? 'bg-emerald-500/40 border-emerald-500/20' :
                              'bg-emerald-400 border-emerald-300'
                            }`}
                            title={`${day.dateStr}: ${day.count} submission${day.count !== 1 ? 's' : ''}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  {/* Month labels */}
                  <div className="relative h-4 mt-2 select-none text-[10px] font-semibold text-muted-foreground">
                    {monthLabels.map((label, lIdx) => (
                      <span
                        key={lIdx}
                        className="absolute transition-all duration-300"
                        style={{ left: `${label.index * 13.5}px` }}
                      >
                        {label.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom stats */}
            <div className="grid grid-cols-2 gap-3 mt-5 border-t border-border/40 pt-4">
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Since</p>
                <p className="text-xs font-semibold text-foreground mt-0.5">Mar 28, 2026</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Top Skills</p>
                <p className="text-xs font-semibold text-foreground mt-0.5">DSA, Algorithms</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
