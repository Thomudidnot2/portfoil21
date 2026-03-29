import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Send, Mail, Phone, MessageSquare, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import { useVibe } from '../context/VibeContext';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { accentColor } = useVibe();
  const { scrollYProgress } = useScroll();
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const footerY = useTransform(scrollYProgress, [0.95, 1], [200, 0]);
  const footerOpacity = useTransform(scrollYProgress, [0.95, 1], [0, 1]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const path = 'contactMessages';
      await addDoc(collection(db, path), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      try {
        handleFirestoreError(error, OperationType.CREATE, 'contactMessages');
      } catch (err: any) {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <motion.footer 
      ref={containerRef}
      style={{ y: footerY, opacity: footerOpacity, borderColor: `${accentColor}33`, boxShadow: `0 -20px 100px ${accentColor}10` }}
      className="fixed bottom-0 left-0 right-0 z-[60] bg-zinc-950 border-t p-8 md:p-16 rounded-t-[60px]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
            Let's <span style={{ color: accentColor }}>Connect.</span>
          </h2>
          <p className="text-white/60 mb-12 max-w-md">
            Whether it's EV infrastructure, a new build, or a trade setup, 
            I'm always open to high-voltage conversations.
          </p>
          
          <div className="flex flex-col gap-6">
            <a href="https://www.plugshare.com/location/1654425" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/80 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center transition-colors group-hover:bg-opacity-20">
                <Zap size={20} className="group-hover:text-[var(--hover-color)]" style={{ 
                  // @ts-ignore
                  '--hover-color': accentColor 
                }} />
              </div>
              <span className="font-mono group-hover:text-white transition-colors">Find us on PlugShare</span>
            </a>
            <a href="mailto:georgesthomasnedumpurath@gmail.com" className="flex items-center gap-4 text-white/80 transition-colors group">
              <div 
                className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center transition-colors group-hover:bg-opacity-20"
                style={{ 
                  // @ts-ignore
                  '--hover-bg': `${accentColor}33`
                }}
              >
                <Mail size={20} className="group-hover:text-[var(--hover-color)]" style={{ 
                  // @ts-ignore
                  '--hover-color': accentColor 
                }} />
              </div>
              <span className="font-mono group-hover:text-white transition-colors">georgesthomasnedumpurath@gmail.com</span>
            </a>
            <a href="tel:+919446822882" className="flex items-center gap-4 text-white/80 transition-colors group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center transition-colors group-hover:bg-opacity-20">
                <Phone size={20} className="group-hover:text-[var(--hover-color)]" style={{ 
                  // @ts-ignore
                  '--hover-color': accentColor 
                }} />
              </div>
              <span className="font-mono group-hover:text-white transition-colors">+91 94468 22882</span>
            </a>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-mono text-white/40 tracking-widest">Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none transition-all focus:border-opacity-100" 
                style={{ borderColor: `${accentColor}33` }} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-mono text-white/40 tracking-widest">Email</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none transition-all focus:border-opacity-100" 
                style={{ borderColor: `${accentColor}33` }} 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-mono text-white/40 tracking-widest">Message</label>
            <textarea 
              rows={4} 
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none transition-all resize-none focus:border-opacity-100" 
              style={{ borderColor: `${accentColor}33` }} 
            />
          </div>
          
          <button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: accentColor, boxShadow: `0 0 30px ${accentColor}4d` }}
          >
            {status === 'loading' ? (
              <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : status === 'success' ? (
              <>
                <CheckCircle2 size={20} />
                <span>Transmission Received</span>
              </>
            ) : status === 'error' ? (
              <>
                <AlertCircle size={20} />
                <span>Transmission Failed</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Send Transmission</span>
              </>
            )}
          </button>

          {status === 'error' && errorMessage && (
            <p className="text-red-500 text-[10px] font-mono uppercase tracking-widest text-center mt-4">
              Error: {errorMessage}
            </p>
          )}
        </form>
      </div>

      
      <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
        <div className="flex items-center gap-8">
          <span>© 2026 George S. Thomas</span>
          {user ? (
            <button onClick={handleLogout} className="hover:text-white transition-colors">Terminate Session</button>
          ) : (
            <button onClick={handleLogin} className="hover:text-white transition-colors">System Access</button>
          )}
        </div>
        <span>Built with Vibe Coding & High-Voltage Tech</span>
      </div>
    </motion.footer>
  );
}

