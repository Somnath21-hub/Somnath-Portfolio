import React from 'react';
import { Users, ChevronRight, Globe, Award, Sparkles } from 'lucide-react';
import { portfolioData } from '../data';

export default function Community() {
  const { communities, stats, personalInfo } = portfolioData;

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

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {communities.map((comm, idx) => (
            <div key={idx} className="scroll-reveal visible">
              <div className="glass-card p-6 card-hover border border-primary/15 h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-accent uppercase tracking-wider mb-1">
                    {comm.role}
                  </h3>
                  <h4 className="font-extrabold text-base text-foreground mb-4">
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

        {/* Impact Numbers Grid */}
        <div className="scroll-reveal visible max-w-4xl mx-auto">
          <div className="glass-card p-8 border border-primary/10 bg-secondary/20 relative overflow-hidden">
            {/* background gradient element */}
            <div 
              className="absolute -right-20 -bottom-20 w-60 h-60 rounded-full opacity-10" 
              style={{
                background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
                filter: 'blur(30px)'
              }}
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-border/40">
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col justify-center ${idx > 0 && idx < 2 ? 'pt-4 md:pt-0' : idx >= 2 ? 'pt-4 md:pt-0' : ''}`}
                >
                  <span className="text-3xl sm:text-4xl font-black gradient-text">
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
