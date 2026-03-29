import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Instagram, Twitter, Mic, Fingerprint, Zap, Gamepad, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { useVibe } from '../context/VibeContext';

export function Features() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const { vibe, setVibe, accentColor } = useVibe();
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) return;
    
    // @ts-ignore
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
      console.log('Voice Command:', command);
      if (command.includes('trading')) setVibe('trader');
      if (command.includes('gamer')) setVibe('gamer');
      if (command.includes('electric')) setVibe('electric');
    };

    if (isListening) recognition.start();
    else recognition.stop();

    return () => recognition.stop();
  }, [isListening]);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsUnlocked(true);
    }, 2000);
  };

  return (
    <>
      {/* BIOMETRIC UNLOCK OVERLAY */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -1000 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8"
          >
            <div className="relative group cursor-pointer" onClick={handleScan}>
              <div className={cn(
                "w-32 h-32 rounded-full border-2 border-[#00FF41]/30 flex items-center justify-center transition-all duration-500",
                isScanning ? "scale-110 border-[#00FF41] shadow-[0_0_30px_rgba(0,255,65,0.4)]" : "group-hover:border-[#00FF41]/60"
              )}>
                <Fingerprint size={48} className={cn(
                  "transition-colors duration-500",
                  isScanning ? "text-[#00FF41]" : "text-white/20 group-hover:text-white/40"
                )} />
              </div>
              
              {isScanning && (
                <motion.div 
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-0.5 bg-[#00FF41] shadow-[0_0_10px_#00FF41]"
                />
              )}
            </div>
            
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.5em] text-white/40">
              {isScanning ? "Scanning Identity..." : "Hold to Authenticate"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SOCIAL DOCK */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-zinc-950/80 backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-2xl">
        {[
          { icon: Github, href: "https://github.com" },
          { icon: Linkedin, href: "https://linkedin.com" },
          { icon: Instagram, href: "https://instagram.com" },
          { icon: Twitter, href: "https://twitter.com" }
        ].map((item, i) => (
          <motion.a 
            key={i}
            href={item.href}
            target="_blank"
            whileHover={{ scale: 1.2, y: -5 }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 transition-colors"
            style={{ 
              // @ts-ignore
              '--hover-color': accentColor 
            }}
          >
            <item.icon size={20} className="hover:text-[var(--hover-color)]" />
          </motion.a>
        ))}
        <div className="w-[1px] h-6 bg-white/10 mx-2" />
        <button 
          onClick={() => setIsListening(!isListening)}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
            isListening ? "text-black shadow-[0_0_20px_rgba(0,255,65,0.5)]" : "text-white/60 hover:bg-white/5"
          )}
          style={{ 
            backgroundColor: isListening ? accentColor : undefined,
            boxShadow: isListening ? `0 0 20px ${accentColor}80` : undefined
          }}
        >
          <Mic size={20} className={isListening ? "animate-pulse" : ""} />
        </button>

      </div>

      {/* VIBE SWITCHER */}
      <div className="fixed top-8 right-8 z-50 flex flex-col gap-3">
        {[
          { id: 'electric', icon: Zap, color: '#00FF41' },
          { id: 'gamer', icon: Gamepad, color: '#FF00FF' },
          { id: 'trader', icon: TrendingUp, color: '#00FFFF' }
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => setVibe(item.id as any)}
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500",
              vibe === item.id 
                ? `bg-black border-[${item.color}] shadow-[0_0_20px_${item.color}40]` 
                : "bg-zinc-950/50 border-white/10 text-white/40 hover:text-white/80"
            )}
            style={{ borderColor: vibe === item.id ? item.color : undefined, color: vibe === item.id ? item.color : undefined }}
          >
            <item.icon size={20} />
          </button>
        ))}
      </div>
    </>
  );
}

