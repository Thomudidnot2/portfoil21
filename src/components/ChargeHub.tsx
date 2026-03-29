import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Zap, Battery, Globe } from 'lucide-react';
import { useVibe } from '../context/VibeContext';

export function ChargeHub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { accentColor } = useVibe();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const chargeLevel = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <div 
        className="relative bg-zinc-950 border-2 rounded-[40px] p-8 md:p-16 overflow-hidden"
        style={{ borderColor: accentColor, boxShadow: `0 0 50px ${accentColor}10` }}
      >
        {/* Neon Background Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 blur-[120px] rounded-full" style={{ backgroundColor: `${accentColor}10` }} />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 blur-[120px] rounded-full" style={{ backgroundColor: `${accentColor}10` }} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-6" style={{ color: accentColor }}>
              <Zap size={24} style={{ fill: accentColor }} />
              <span className="text-sm font-mono uppercase tracking-[0.3em]">NKT Charge Hub</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              Leading EV Mobility <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, #10b981)` }}>
                Infrastructure in Kerala.
              </span>
            </h2>

            <p className="text-lg text-white/60 mb-12 max-w-lg leading-relaxed">
              We are building the backbone of Kerala's electric revolution. 
              Our Thodupuzha hub at Nedumpurath Towers features a 90kW Public DC Fast Charging Station, 
              providing high-speed solutions for the next generation of luxury EVs.
            </p>

            <div className="mb-12">
              <h3 className="text-xs font-mono uppercase tracking-[0.3em] mb-6" style={{ color: accentColor }}>"Charging Forward" Strategy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="text-[10px] uppercase text-white/40 font-mono mb-1">Transmission</div>
                  <div className="text-white text-xs leading-relaxed">High-voltage cables for offshore wind farms & inter-country grids.</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="text-[10px] uppercase text-white/40 font-mono mb-1">Distribution</div>
                  <div className="text-white text-xs leading-relaxed">Medium & low-voltage cables for city grids & EV networks.</div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-xs font-mono uppercase tracking-[0.3em] mb-6" style={{ color: accentColor }}>Technical Pillars</h3>
              <ul className="space-y-3">
                {[
                  { label: "High Power Output", detail: "Delivering up to 400 kW per charger." },
                  { label: "Dynamic Load Management", detail: "The 'brain' ensuring safe power distribution." },
                  { label: "Liquid-Cooled Cables", detail: "Internal cooling for high-capacity charging." },
                  { label: "Interoperability", detail: "OCPP & ISO 15118 protocols for all vehicles." }
                ].map((pillar, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: accentColor }} />
                    <div className="text-xs leading-relaxed">
                      <span className="text-white font-bold uppercase tracking-wider">{pillar.label}:</span>{" "}
                      <span className="text-white/60">{pillar.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-6 mb-12">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
                <MapPin style={{ color: accentColor }} />
                <div>
                  <div className="text-[10px] uppercase text-white/40 font-mono">Location</div>
                  <div className="text-white font-medium">Thodupuzha, Kerala</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
                <Globe style={{ color: accentColor }} />
                <div>
                  <div className="text-[10px] uppercase text-white/40 font-mono">Status</div>
                  <div className="text-white font-medium">Active 24/7</div>
                </div>
              </div>
            </div>

            <a 
              href="https://www.plugshare.com/location/1654425" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-black transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: accentColor, boxShadow: `0 0 30px ${accentColor}4d` }}
            >
              <Zap size={20} />
              <span>View on PlugShare</span>
            </a>
          </div>

          <div className="relative">
            {/* Charging Progress Bar */}
            <div className="absolute -left-8 md:-left-12 top-0 bottom-0 w-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                style={{ height: `${chargeLevel}%`, backgroundColor: accentColor, boxShadow: `0 0 20px ${accentColor}` }}
                className="w-full"
              />
              <div className="absolute top-0 left-0 right-0 flex flex-col items-center py-4 gap-20 pointer-events-none">
                {[0, 25, 50, 75, 100].map(v => (
                  <span key={v} className="text-[8px] font-mono text-white/20 rotate-90">{v}%</span>
                ))}
              </div>
            </div>

            {/* Map Container */}
            <div className="aspect-square md:aspect-video rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.123456789!2d76.7123456789!3d9.89123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTMnMjguNCJOIDc2wrA0MicyNC40IkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin&dark=1" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 pointer-events-none border-2 rounded-3xl" style={{ borderColor: `${accentColor}33` }} />
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest">Live Feed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

