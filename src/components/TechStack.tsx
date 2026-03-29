import { motion } from 'motion/react';
import { Smartphone, Monitor, Camera, Code2, TrendingUp, Cpu } from 'lucide-react';
import { useVibe } from '../context/VibeContext';

const techStack = {
  hardware: [
    { name: "Samsung S-Series & Apple iPhone", type: "Mobile", icon: Smartphone, description: "Dual-ecosystem power user." },
    { name: "MacBook & High-end Custom PC", type: "Computing", icon: Monitor, description: "Production & 4K video editing." },
    { name: "Sony A7 IV + Sigma 28-70mm", type: "Visuals", icon: Camera, description: "DJI RS3 stabilization workflow." }
  ],
  software: [
    { name: "Gemini 1.5 Pro & Google AI Studio", type: "AI Tools", icon: Cpu, description: "LLM Orchestration & Vibecoding." },
    { name: "NSE/BSE Market Analytics", type: "Finance", icon: TrendingUp, description: "SIP Compound Interest Modeling." },
    { name: "Adobe Premiere Pro & Davinci Resolve", type: "Creative", icon: Code2, description: "Lightroom & Video Production." }
  ]
};

const roadmap = [
  { phase: "Current", milestone: "Managing Nedumpurath Towers & NKT Charge Hub", status: "Active" },
  { phase: "Near Term", milestone: "Full Apple/Samsung ecosystem integration + Sony Alpha setup", status: "In Progress" },
  { phase: "Mid Term", milestone: "Acquisition of BMW iX1 & Tata Harrier EV", status: "Planned" },
  { phase: "Long Term", milestone: "Scaling NKT Charge Hub to a district-wide network", status: "Vision" }
];

export function TechStack() {
  const { accentColor } = useVibe();

  return (
    <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Tech Stack */}
        <div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-16 uppercase tracking-tighter leading-none">
            The Tech <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, #ffffff)` }}>
              Stack
            </span>
          </h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.3em] mb-8" style={{ color: accentColor }}>Hardware Ecosystem</h3>
              <div className="space-y-6">
                {techStack.hardware.map((item, idx) => (
                  <motion.div 
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <item.icon size={20} style={{ color: accentColor }} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-mono text-white/40 mb-1">{item.type}</div>
                      <div className="text-white font-bold text-sm mb-1">{item.name}</div>
                      <div className="text-white/40 text-xs">{item.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.3em] mb-8" style={{ color: accentColor }}>Software Mastery</h3>
              <div className="space-y-6">
                {techStack.software.map((item, idx) => (
                  <motion.div 
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <item.icon size={20} style={{ color: accentColor }} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-mono text-white/40 mb-1">{item.type}</div>
                      <div className="text-white font-bold text-sm mb-1">{item.name}</div>
                      <div className="text-white/40 text-xs">{item.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Roadmap */}
        <div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-16 uppercase tracking-tighter leading-none text-right">
            Strategic <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to left, ${accentColor}, #ffffff)` }}>
              Roadmap
            </span>
          </h2>

          <div className="relative space-y-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[1px] before:bg-white/10">
            {roadmap.map((item, idx) => (
              <motion.div 
                key={item.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="pl-8 relative"
              >
                <div 
                  className="absolute left-[-4px] top-2 w-2 h-2 rounded-full"
                  style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }}
                />
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-xs font-mono uppercase tracking-widest" style={{ color: accentColor }}>{item.phase}</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-white/40">
                    {item.status}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{item.milestone}</h4>
                <div className="h-[1px] w-full bg-gradient-to-right from-white/10 to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
