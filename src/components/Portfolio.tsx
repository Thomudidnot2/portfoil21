import { motion } from 'motion/react';
import { Zap, Building2, Brain, TrendingUp, ShieldCheck, Cpu } from 'lucide-react';
import { useVibe } from '../context/VibeContext';

const pillars = [
  {
    title: "Green Infrastructure",
    subtitle: "NKT Charge Hub",
    role: "Founder & Managing Director",
    description: "Launched a 90kW Public DC Fast Charging Station at Nedumpurath Towers on March 1, 2026. Providing the fastest EV charging solution in Thodupuzha.",
    impact: "Supporting luxury EVs (BMW, Tata, etc.) with 99% uptime and real-time analytics.",
    icon: Zap,
    tags: ["90kW DC Fast", "99% Uptime", "Load Management"]
  },
  {
    title: "Legacy Business",
    subtitle: "NKT Vessels House",
    role: "Owner & Digital Strategist",
    description: "Stewarding a family business established in 1947. Bridging 79 years of tradition with modern digital workflows.",
    impact: "Automating inventory systems and social media management for a multi-generational legacy.",
    icon: Building2,
    tags: ["Est. 1947", "Digital Transformation", "Legacy"]
  },
  {
    title: "The Vibecoder Lab",
    subtitle: "AI & Finance",
    role: "Wealth Architect AI",
    description: "Developing a custom AI-driven app in Google AI Studio to manage family wealth and long-term investment portfolios.",
    impact: "Automating SIP tracking and projections to reach ₹1Cr - ₹10Cr milestone using AI agents.",
    icon: Brain,
    tags: ["Gemini 1.5 Pro", "SIP Automation", "Vibecoding"]
  }
];

export function Portfolio() {
  const { accentColor } = useVibe();

  return (
    <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
        <div>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
            Core Portfolio <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, #ffffff)` }}>
              Pillars
            </span>
          </h2>
        </div>
        <div className="text-right">
          <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Bridging Tradition & AI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {pillars.map((pillar, idx) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="group relative bg-zinc-900/50 border border-white/10 rounded-[32px] p-8 hover:bg-zinc-900 transition-all duration-500"
          >
            <div 
              className="absolute top-0 left-0 w-full h-1 rounded-t-[32px] opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: accentColor }}
            />
            
            <div className="flex items-start justify-between mb-8">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <pillar.icon size={28} style={{ color: accentColor }} />
              </div>
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">0{idx + 1}</span>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-mono uppercase tracking-[0.3em] mb-2" style={{ color: accentColor }}>{pillar.title}</h3>
              <h4 className="text-2xl font-bold text-white mb-1">{pillar.subtitle}</h4>
              <p className="text-sm text-white/40 font-medium italic">{pillar.role}</p>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {pillar.description}
            </p>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 mb-8">
              <p className="text-xs text-white/80 leading-relaxed italic">
                "{pillar.impact}"
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {pillar.tags.map(tag => (
                <span key={tag} className="text-[9px] font-mono uppercase tracking-wider px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/40">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
