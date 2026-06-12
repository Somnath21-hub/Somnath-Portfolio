import React, { useState } from 'react';
import { Award, Trophy, Code2, GraduationCap, Volume2, BookOpen, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data';

const tierStyles = {
  gold: {
    border: 'border-amber-500/25',
    borderHover: 'hover:border-amber-400 hover:bg-amber-500/5 hover:shadow-[0_0_30px_rgba(245,158,11,0.35)]',
    borderActive: 'border-amber-400 bg-amber-500/10 shadow-[0_0_35px_rgba(245,158,11,0.45)]',
    text: 'text-amber-400',
    iconBg: 'bg-amber-500/10 border-amber-500/20',
    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    badgeText: '1st Runner-Up'
  },
  silver: {
    border: 'border-slate-400/25',
    borderHover: 'hover:border-slate-300 hover:bg-slate-400/5 hover:shadow-[0_0_30px_rgba(203,213,225,0.35)]',
    borderActive: 'border-slate-300 bg-slate-400/10 shadow-[0_0_35px_rgba(203,213,225,0.45)]',
    text: 'text-slate-300',
    iconBg: 'bg-slate-400/10 border-slate-400/20',
    badge: 'bg-slate-400/10 text-slate-200 border-slate-400/20',
    badgeText: 'Finalist'
  },
  bronze: {
    border: 'border-orange-500/20',
    borderHover: 'hover:border-orange-500/60 hover:bg-orange-500/5',
    borderActive: 'border-orange-500/30 bg-orange-500/5 shadow-[0_0_25px_rgba(249,115,22,0.25)]',
    text: 'text-orange-400',
    iconBg: 'bg-orange-500/10 border-orange-500/20',
    badge: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
    badgeText: 'Mention'
  }
};

export default function Achievements() {
  const { achievements, publication } = portfolioData;
  const [activeCard, setActiveCard] = useState(null);

  const getAchievementIcon = (title, colorClass) => {
    const name = title.toLowerCase();
    if (name.includes('hackathon') || name.includes('trophy')) return <Trophy size={18} className={colorClass} />;
    if (name.includes('dsa') || name.includes('leet')) return <Code2 size={18} className={colorClass} />;
    if (name.includes('speaker') || name.includes('author')) return <Volume2 size={18} className={colorClass} />;
    return <GraduationCap size={18} className={colorClass} />;
  };

  const handleCardClick = (idx) => {
    setActiveCard(activeCard === idx ? null : idx);
  };

  return (
    <section id="achievements" className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14 scroll-reveal visible">
          <span className="section-label mb-4 inline-flex">
            <Award size={12} /> Achievements
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 text-foreground">
            Key <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto text-base">
            Milestones from coding challenges, hackathons, and research publications.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((ach, idx) => {
            const style = tierStyles[ach.tier] || tierStyles.bronze;
            const isSelected = activeCard === idx;
            return (
              <div key={idx} className="scroll-reveal visible">
                <div 
                  onClick={() => handleCardClick(idx)}
                  className={`glass-card p-6 cursor-pointer transition-all duration-300 h-full flex flex-col justify-between border ${
                    isSelected ? style.borderActive : `${style.border} ${style.borderHover}`
                  }`}
                >
                  <div>
                    {/* Icon, Title, and Badge */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${style.iconBg}`}>
                          {getAchievementIcon(ach.title, style.text)}
                        </div>
                        <h3 className="font-bold text-base text-foreground leading-tight">
                          {ach.title}
                        </h3>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider shrink-0 ${style.badge}`}>
                        {style.badgeText}
                      </span>
                    </div>
                    
                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                      {ach.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Publication Block */}
        {publication && (
          <div className="mt-14 scroll-reveal visible">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BookOpen size={18} className="text-accent" /> Publications
            </h3>
            
            <div className="glass-card p-6 border border-primary/20 bg-secondary/5 relative overflow-hidden card-hover">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/20 text-[#c4b5fd] border border-primary/30 uppercase tracking-wider mb-2 inline-block">
                    {publication.publisher}
                  </span>
                  <h4 className="text-lg font-extrabold text-foreground mb-2">
                    {publication.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
                    {publication.description}
                  </p>
                </div>
                
                {publication.link && (
                  <a 
                    href={publication.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline py-2 px-5 text-xs inline-flex items-center gap-1.5 shrink-0"
                  >
                    View Paper <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

