import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useVibe } from '../context/VibeContext';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const { accentColor } = useVibe();

  useEffect(() => {
    if (!textRef.current) return;

    gsap.to(textRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      scaleY: 2.5,
      scaleX: 0.8,
      opacity: 0.2,
      y: -100,
      ease: 'none',
    });
  }, []);

  return (
    <section ref={containerRef} className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="z-10 text-center px-4">
        <h1 
          ref={textRef}
          className="text-[12vw] font-black uppercase leading-none tracking-tighter select-none"
          style={{ fontFamily: "'Inter', sans-serif", color: accentColor }}
        >
          George S. Thomas
        </h1>
        <p className="mt-8 text-xl md:text-2xl font-mono text-white/70 tracking-widest uppercase">
          Founder, Vibecoder & Infrastructure Entrepreneur | 16-Year-Old Visionary
        </p>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
        <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: accentColor }}>Scroll to Charge</span>
        <div className="w-[1px] h-10" style={{ backgroundColor: accentColor }} />
      </div>
    </section>
  );
}

