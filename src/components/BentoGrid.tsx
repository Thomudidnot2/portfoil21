import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import * as THREE from 'three';
import { Gamepad, Code, TrendingUp, Video, Terminal, Cpu, Brain } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useVibe } from '../context/VibeContext';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export function BentoGrid() {
  const { accentColor } = useVibe();
  const [tickerData, setTickerData] = useState<string>("BTC: $68,432.12 | NIFTY 50: 22,096.75 | RELIANCE: 2,984.50 | TCS: 4,120.30");
  const [codeStream, setCodeStream] = useState<string>("");
  const codeText = "const mission = 'Build the future of EV mobility';\nwhile(charging) {\n  innovate();\n  code();\n  trade();\n}";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCodeStream(codeText.slice(0, i));
      i = (i + 1) % (codeText.length + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: "Provide the current price of BTC and top 3 NIFTY 50 stocks in a single line format: BTC: $X | STOCK1: Y | STOCK2: Z | STOCK3: W",
          config: { tools: [{ googleSearch: {} }] },
        });
        if (response.text) setTickerData(response.text.trim());
      } catch (e) {
        console.error("Ticker fetch failed", e);
      }
    };
    fetchTicker();
    const interval = setInterval(fetchTicker, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
      {/* INFRASTRUCTURE DIGITAL TWIN CARD */}
      <div 
        className="md:col-span-2 md:row-span-2 bg-zinc-950 border rounded-3xl overflow-hidden relative group"
        style={{ borderColor: `${accentColor}33` }}
      >
        <div className="absolute top-6 left-6 z-10">
          <div className="flex items-center gap-2 mb-2" style={{ color: accentColor }}>
            <Cpu size={20} />
            <span className="text-xs font-mono uppercase tracking-widest">Digital Twin</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Infrastructure Simulation</h3>
          <p className="text-xs text-white/40 mt-2 max-w-[200px]">AI-driven cable routing for high-voltage distribution.</p>
        </div>
        <GamerCanvas accentColor={accentColor} />
      </div>

      {/* VIBECODER LAB CARD */}
      <div 
        className="md:col-span-2 bg-zinc-950 border rounded-3xl overflow-hidden relative group cursor-pointer p-6"
        style={{ borderColor: `${accentColor}33` }}
      >
        <div className="flex items-center gap-2 mb-4" style={{ color: accentColor }}>
          <Brain size={20} />
          <span className="text-xs font-mono uppercase tracking-widest">Vibecoder Lab</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Wealth Architect AI</h3>
        <p className="text-sm text-white/60 leading-relaxed">
          Automating SIP tracking and financial projections using Gemini 1.5 Pro.
        </p>
        <div className="absolute bottom-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity">
          <div className="w-10 h-10 rounded-full border flex items-center justify-center" style={{ borderColor: accentColor }}>
            <TrendingUp size={16} style={{ color: accentColor }} />
          </div>
        </div>
      </div>

      {/* TRADER CARD */}
      <div 
        className="md:col-span-2 bg-zinc-950 border rounded-3xl overflow-hidden relative flex flex-col justify-center px-8"
        style={{ borderColor: `${accentColor}33` }}
      >
        <div className="flex items-center gap-2 mb-4" style={{ color: accentColor }}>
          <TrendingUp size={20} />
          <span className="text-xs font-mono uppercase tracking-widest">Trader</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-2xl font-mono text-white/90"
          >
            {tickerData} &nbsp;&nbsp;&nbsp; {tickerData}
          </motion.div>
        </div>
      </div>

      {/* VIBE CODER CARD */}
      <div 
        className="md:col-span-2 bg-zinc-950 border rounded-3xl overflow-hidden relative p-6 font-mono text-sm"
        style={{ borderColor: `${accentColor}33` }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2" style={{ color: accentColor }}>
            <Terminal size={18} />
            <span className="text-xs uppercase tracking-widest">Vibe Coder</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
        </div>
        <div className="leading-relaxed" style={{ color: `${accentColor}cc` }}>
          <pre className="whitespace-pre-wrap">{codeStream}<span className="animate-pulse">_</span></pre>
        </div>
      </div>
    </section>
  );
}

function GamerCanvas({ accentColor }: { accentColor: string }) {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Create a simple gamepad-like shape
    const group = new THREE.Group();
    
    const bodyGeom = new THREE.CapsuleGeometry(1, 2, 4, 8);
    const bodyMat = new THREE.MeshStandardMaterial({ color: '#111', roughness: 0.2, metalness: 0.8 });
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    body.rotation.z = Math.PI / 2;
    group.add(body);

    const handleGeom = new THREE.SphereGeometry(0.8, 32, 32);
    const leftHandle = new THREE.Mesh(handleGeom, bodyMat);
    leftHandle.position.set(-1.5, -0.5, 0);
    group.add(leftHandle);

    const rightHandle = new THREE.Mesh(handleGeom, bodyMat);
    rightHandle.position.set(1.5, -0.5, 0);
    group.add(rightHandle);

    const light = new THREE.PointLight(accentColor, 2, 10);
    light.position.set(0, 2, 2);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    scene.add(group);
    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      group.rotation.y += 0.01;
      group.rotation.x = mouseY * 0.5;
      group.rotation.y = mouseX * 0.5 + Date.now() * 0.001;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, [accentColor]);

  return <div ref={canvasRef} className="w-full h-full" />;
}

