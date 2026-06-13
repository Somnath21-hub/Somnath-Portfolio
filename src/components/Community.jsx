import React from 'react';
import { Users, ChevronRight, Globe, Award, Sparkles } from 'lucide-react';
import { portfolioData } from '../data';

export default function Community() {
  const { communities, stats, personalInfo } = portfolioData;

  const getIcon = (org) => {
    if (org.toLowerCase().includes('calcuttahacks')) return <Award size={18} className="text-accent" />;
    if (org.toLowerCase().includes('acm')) return <Globe size={18} className="text-accent" />;
    return <Sparkles size={18} className="text-accent" />;
  };

  return (
    <section id="leadership" className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14 scroll-reveal visible">
          <span className="section-label mb-4 inline-flex">
            <Users size={12} /> Community
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 text-foreground">
            Leadership & <span className="gradient-text">Community</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto text-base">
            Leading, teaching, and building the developer community in {personalInfo.baseLocation.split(',')[0] || 'your city'}.
          </p>
        </div>

        {/* Roles and Photo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Photo Column */}
          <div className="lg:col-span-5 scroll-reveal visible">
            <div className="relative group overflow-hidden rounded-2xl border border-primary/20 bg-secondary/35 aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-auto lg:h-full min-h-[380px] flex flex-col justify-end shadow-xl">
              <img 
                src="/somnath-speaking.jpg" 
                alt="Somnath Mukherjee speaking" 
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              {/* Decorative Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a1e] via-[#0f0a1e]/40 to-transparent opacity-90 group-hover:opacity-85 transition-opacity duration-300" />
              
              {/* Floating Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="flex items-center gap-1.5 bg-primary/80 backdrop-blur-md text-white font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/10 shadow-lg">
                  <Sparkles size={10} className="text-accent-foreground" /> Speaking & Mentoring
                </span>
              </div>
              
              {/* Photo Caption */}
              <div className="relative p-6 z-10 mt-auto">
                <p className="text-[10px] text-accent font-bold tracking-wider uppercase mb-1">
                  Active Community Leader
                </p>
                <h4 className="text-sm sm:text-base font-extrabold text-foreground leading-snug">
                  Empowering student developers & building collaborative tech spaces.
                </h4>
              </div>
            </div>
          </div>

          {/* Roles Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-between">
            {communities.map((comm, idx) => (
              <div key={idx} className="scroll-reveal visible">
                <div className="glass-card p-5 sm:p-6 card-hover border border-primary/15 h-full flex gap-4 items-start">
                  <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/25 shrink-0 mt-0.5">
                    {getIcon(comm.organization)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xs text-accent uppercase tracking-wider mb-0.5">
                      {comm.role}
                    </h3>
                    <h4 className="font-extrabold text-base text-foreground mb-3">
                      {comm.organization}
                    </h4>
                    
                    <ul className="flex flex-col gap-2">
                      {comm.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                          <ChevronRight className="text-primary mt-0.5 shrink-0" size={12} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Impact Numbers Grid */}
        <div className="scroll-reveal visible max-w-4xl mx-auto">
          <div className="glass-card p-8 border border-primary/10 bg-secondary/20 relative overflow-hidden">
            {/* background fire glow elements */}
            <div 
              className="absolute left-1/4 bottom-[-60px] w-64 h-32 rounded-full opacity-[0.15] mix-blend-screen pointer-events-none" 
              style={{
                background: 'radial-gradient(ellipse at bottom, #ff3300 0%, #ffaa00 50%, transparent 75%)',
                filter: 'blur(20px)',
                animation: 'fire-glow-movement 4s ease-in-out infinite alternate'
              }}
            />
            <div 
              className="absolute right-1/4 bottom-[-60px] w-64 h-32 rounded-full opacity-[0.15] mix-blend-screen pointer-events-none" 
              style={{
                background: 'radial-gradient(ellipse at bottom, #ff5500 0%, #ffcc00 50%, transparent 75%)',
                filter: 'blur(25px)',
                animation: 'fire-glow-movement 6s ease-in-out infinite alternate-reverse'
              }}
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-border/40">
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col justify-center ${idx > 0 && idx < 2 ? 'pt-4 md:pt-0' : idx >= 2 ? 'pt-4 md:pt-0' : ''}`}
                >
                  <span className="text-3xl sm:text-4xl font-black fire-text">
                    {stat.value}
                  </span>
                  <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mt-1.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

