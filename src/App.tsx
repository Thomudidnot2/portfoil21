/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Background } from './components/Background';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { ChargeHub } from './components/ChargeHub';
import { Portfolio } from './components/Portfolio';
import { TechStack } from './components/TechStack';
import { Features } from './components/Features';
import { Footer } from './components/Footer';

import { VibeProvider } from './context/VibeContext';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <VibeProvider>
        <AppContent />
      </VibeProvider>
    </ErrorBoundary>
  );
}

import { useVibe } from './context/VibeContext';

function AppContent() {
  const { accentColor } = useVibe();
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main 
      className="bg-black text-white min-h-[200vh]"
      style={{ 
        // @ts-ignore
        '--selection-bg': accentColor,
        '--selection-text': '#000'
      } as React.CSSProperties}
    >
      <style>{`
        ::selection {
          background-color: ${accentColor} !important;
          color: #000 !important;
        }
      `}</style>
      <Background />
      <Features />
      
      <div className="relative z-10">
        <Hero />
        <Portfolio />
        <BentoGrid />
        <ChargeHub />
        <TechStack />
        
        {/* Spacer for hidden footer reveal */}
        <div className="h-[100vh]" />
      </div>
      
      <Footer />
    </main>
  );
}

