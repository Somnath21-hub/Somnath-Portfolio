import React from 'react';
import { Briefcase, MapPin, ChevronRight, Sparkles, Database, Server, Cpu } from 'lucide-react';
import { portfolioData } from '../data';

export default function Experience() {
  const { experiences } = portfolioData;

  const getIcon = (type) => {
    switch (type) {
      case 'sparkles':
        return <Sparkles className="text-accent" size={18} />;
      case 'database':
        return <Database className="text-accent" size={18} />;
      case 'server':
        return <Server className="text-accent" size={18} />;
      default:
        return <Cpu className="text-accent" size={18} />;
    }
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14 scroll-reveal">
          <span className="section-label mb-4 inline-flex">
            <Briefcase size={12} /> Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 text-foreground">
            Where I've <span className="gradient-text">Worked</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto text-base">
            Work experiences spanning backend engineering, AI/ML, and data engineering.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative pl-10 sm:pl-14">
          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent/40 to-transparent"></div>
          
          <div className="flex flex-col gap-10">
            {experiences.map((exp, idx) => (
              <div 
                key={idx} 
                className={`scroll-reveal-left relative group scroll-reveal-delay-${idx + 1}`}
              >
                
                {/* Timeline Dot */}
                <div 
                  className="absolute -left-[2.1rem] sm:-left-[2.6rem] top-4 w-4 h-4 rounded-full border-2 border-background flex items-center justify-center transition-all duration-300 group-hover:scale-135 group-hover:brightness-125"
                  style={{
                    backgroundColor: exp.iconColor || '#7C3AED',
                    boxShadow: `0 0 12px ${exp.iconColor}60`
                  }}
                >
                  {exp.type === 'Current' && (
                    <div className="w-2 h-2 rounded-full bg-white animate-ping absolute"></div>
                  )}
                </div>

                {/* Card Container */}
                <div className="glass-card p-6 card-hover border border-primary/15">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    
                    {/* Role & Company */}
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden bg-white border border-primary/20"
                      >
                        {exp.logo ? (
                          <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain p-1" />
                        ) : (
                          <div 
                            className="w-full h-full flex items-center justify-center"
                            style={{
                              background: `${exp.iconColor}20`,
                              border: `1px solid ${exp.iconColor}40`
                            }}
                          >
                            {getIcon(exp.iconType)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-base leading-tight">
                          {exp.company}
                        </h3>
                        <p className="text-accent font-semibold text-sm">
                          {exp.role}
                        </p>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-col items-end gap-1">
                      {exp.type === 'Current' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-accent border border-primary/30">
                          ● Current
                        </span>
                      ) : null}
                      <span className="text-muted-foreground text-xs font-semibold">
                        {exp.duration}
                      </span>
                      <span className="text-muted-foreground text-xs flex items-center gap-1">
                        <MapPin size={11} /> {exp.location}
                      </span>
                    </div>

                  </div>

                  {/* Bullet Points */}
                  <ul className="flex flex-col gap-2 mb-4">
                    {exp.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                        <ChevronRight className="text-primary mt-0.5 shrink-0" size={14} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills Tag Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="skill-pill text-[10px] py-0.5 px-2.5">
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
