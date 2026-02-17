'use client'
import { motion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Layers,
  Lock,
  ShieldCheck
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
  SiDjango,
  SiDocker,
  SiFlask,
  SiKubernetes,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSupabase,
  SiTypescript
} from 'react-icons/si'

// --- Helper: Counter-Rotating Icon Node ---
const OrbitNode = ({ children, duration = "0s" }: { children: React.ReactNode, duration: string, delay?: number }) => (
  <div 
    className="absolute p-3 bg-zinc-900/90 border border-zinc-800 rounded-xl backdrop-blur-md shadow-2xl flex items-center justify-center hover:border-emerald-500/50 transition-colors group cursor-crosshair"
    style={{ 
      animation: `reverse-spin ${duration} linear infinite`,
    }}
  >
    <div className="group-hover:scale-110 transition-transform duration-300">
      {children}
    </div>
  </div>
);

export default function HeroPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 overflow-hidden relative">
      
      {/* 1. GLOBAL CSS FOR ORBITS */}
      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes reverse-spin { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        .orbit-ring { animation: spin var(--duration) linear infinite; }
        .orbit-ring:hover { animation-play-state: paused; }
        .orbit-ring:hover div { animation-play-state: paused; }
      `}</style>

      {/* 2. BACKGROUND ARCHITECTURE */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]"></div>
      <div className="fixed inset-0 bg-radial-at-t from-emerald-500/10 via-transparent to-transparent"></div>
      
      <main className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT COLUMN: IDENTITY & AUTHENTICATION */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-[0.3em] font-mono mb-8 backdrop-blur-sm"
            >
              <Lock size={12} className="animate-pulse" />
             Open to roles
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.9]" 
            >
              <span className="bg-clip-text text-transparent bg-linear-to-b from-white to-zinc-500">
               Haregewoin Worku
              </span>
              <br/>
              <span className="text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-400 via-cyan-400 to-emerald-400">
                Full-Stack Developer
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-lg text-zinc-400 text-lg mb-10 leading-relaxed font-light"
            >
              Software Engineer & Cybersecurity enthusiast focusing on <span className="text-emerald-400">Next.js</span>. Designing and implementing web systems that are maintainable and security-aware.
            </motion.p>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 }}
               className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
            >
              <Link href="#contact" className="px-10 py-4 bg-emerald-500 text-zinc-950 font-bold rounded-full hover:bg-emerald-400 transition-all hover:scale-105 flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                Get in touch <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#projects" className="px-10 py-4 bg-zinc-950 border border-zinc-800 text-zinc-100 font-bold rounded-full hover:bg-zinc-900 transition-all flex items-center justify-center gap-2">
                View works <ExternalLink size={16} />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: CIRCULAR TECH ORCHESTRATION */}
          <div className="relative order-1 lg:order-2 h-125 lg:h-175 flex items-center justify-center">
            
            {/* CENTRAL SHIELD NODE */}
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className="relative z-50 p-10 rounded-[2.5rem] bg-zinc-900 border-2 border-emerald-500/40 shadow-[0_0_80px_rgba(16,185,129,0.2)] backdrop-blur-2xl"
            >
              <ShieldCheck size={80} className="text-emerald-500" />
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute left-0 right-0 h-0.5 bg-emerald-400/50 shadow-[0_0_15px_#10b981] z-50"
              />
            </motion.div>

            {/* ORBIT 1: CORE STACK (25s) */}
            <div className="absolute w-70 h-70 rounded-full border border-emerald-500/10 orbit-ring" style={{ '--duration': '25s' } as React.CSSProperties}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"><OrbitNode duration="25s"><SiNextdotjs size={24} /></OrbitNode></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"><OrbitNode duration="25s"><SiReact size={24} className="text-cyan-400" /></OrbitNode></div>
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"><OrbitNode duration="25s"><SiTypescript size={24} className="text-blue-500" /></OrbitNode></div>
              <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2"><OrbitNode duration="25s"><SiSupabase size={24} className="text-emerald-500" /></OrbitNode></div>
            </div>

            {/* ORBIT 2: BACKEND POWER (40s) */}
            <div className="absolute w-115 h-115 rounded-full border border-zinc-900 orbit-ring" style={{ '--duration': '40s' } as React.CSSProperties}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"><OrbitNode duration="40s"><SiPython size={24} className="text-yellow-400" /></OrbitNode></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"><OrbitNode duration="40s"><SiPostgresql size={24} className="text-blue-300" /></OrbitNode></div>
              <div className="absolute left-1/2 top-0 rotate-120 origin-[0_230px]"><div className="-rotate-120"><OrbitNode duration="40s"><SiDjango size={24} className="text-emerald-800" /></OrbitNode></div></div>
              <div className="absolute left-1/2 top-0 rotate-240 origin-[0_230px]"><div className="rotate-[-240deg]"><OrbitNode duration="40s"><SiFlask size={24} /></OrbitNode></div></div>
            </div>

            {/* ORBIT 3: INFRASTRUCTURE (60s) */}
            <div className="absolute w-155 h-155 rounded-full border border-zinc-900/40 border-dashed orbit-ring" style={{ '--duration': '60s' } as React.CSSProperties}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"><OrbitNode duration="60s"><SiDocker size={22} className="text-blue-400" /></OrbitNode></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"><OrbitNode duration="60s"><SiKubernetes size={22} className="text-blue-600" /></OrbitNode></div>
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"><OrbitNode duration="60s"><SiNodedotjs size={22} className="text-green-500" /></OrbitNode></div>
              <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2"><OrbitNode duration="60s"><SiPhp size={22} className="text-indigo-400" /></OrbitNode></div>
            </div>

          </div>
        </div>
      </main>

      {/* FOOTER: SYSTEM METRICS */}
      <footer className="absolute bottom-0 w-full py-10 border-t border-zinc-900/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 hover:opacity-100 transition-opacity duration-1000">
           <div className="flex items-center gap-3 font-mono text-xs tracking-widest group cursor-default">
    <Layers size={16} className="text-emerald-500 group-hover:rotate-90 transition-transform duration-500" />
    <span>STRUCTURE</span>
  </div>

  {/* SECURITY - Represented by a Lock */}
  <div className="flex items-center gap-3 font-mono text-xs tracking-widest group cursor-default">
    <Lock size={16} className="text-cyan-500 group-hover:scale-110 transition-transform duration-300" />
    <span>SECURITY</span>
  </div>

  {/* STABILITY - Represented by a Pulse/Activity */}
  <div className="flex items-center gap-3 font-mono text-xs tracking-widest group cursor-default">
    <Activity size={16} className="text-emerald-500 animate-pulse" />
    <span>STABILITY</span>
  </div>
   </div>
      </footer>

      {/* SCROLL INDICATOR */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 text-zinc-800 hidden lg:block"
      >
        <ChevronDown size={24} />
      </motion.div>
    </div>
  )
}