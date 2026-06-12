import React from 'react';
import { Cpu, Cloud, Database, Code, Shield } from 'lucide-react';
import { portfolioData } from '../data';

export default function Skills() {
  const { skills } = portfolioData;

  const getCategoryIcon = (category) => {
    const name = category.toLowerCase();
    if (name.includes('cloud')) return <Cloud size={16} className="text-accent" />;
    if (name.includes('ai') || name.includes('framework')) return <Cpu size={16} className="text-accent" />;
    if (name.includes('database')) return <Database size={16} className="text-accent" />;
    return <Code size={16} className="text-accent" />;
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-14 scroll-reveal visible">
          <span className="section-label mb-4 inline-flex">
            <Cpu size={12} /> Skills
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 text-foreground">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto text-base">
            From backend microservices to LLM pipelines — full-spectrum technical capability.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skillGroup, idx) => (
            <div key={idx} className="scroll-reveal visible">
              <div className="glass-card p-6 card-hover border border-primary/15 h-full flex flex-col">
                
                {/* Category Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
                    {getCategoryIcon(skillGroup.category)}
                  </div>
                  <h3 className="font-bold text-base text-foreground">
                    {skillGroup.category}
                  </h3>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, sIdx) => (
                    <button key={sIdx} className="skill-pill">
                      {skill}
                    </button>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
