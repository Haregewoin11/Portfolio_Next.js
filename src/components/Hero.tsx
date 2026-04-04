'use client'
import { motion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Layers,
  Lock,
  ShieldCheck,
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
  SiTypescript,
} from 'react-icons/si'

const OrbitNode = ({
  children,
  duration = '0s',
}: {
  children: React.ReactNode
  duration: string
  delay?: number
}) => (
  <div
    className="absolute p-3 bg-[#0c0d10]/95 border border-white/[0.07] rounded-xl backdrop-blur-md flex items-center justify-center hover:border-emerald-500/30 transition-all duration-500 group cursor-crosshair shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
    style={{ animation: `reverse-spin ${duration} linear infinite` }}
  >
    <div className="group-hover:scale-110 transition-transform duration-300 opacity-50 group-hover:opacity-100">
      {children}
    </div>
  </div>
)

export default function HeroPage() {
  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-100 selection:bg-emerald-500/15 overflow-hidden relative">

      {/* ── Keyframes ── */}
      <style jsx global>{`
        @keyframes spin         { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes reverse-spin { from { transform: rotate(360deg); } to { transform: rotate(0deg);    } }
        .orbit-ring             { animation: spin var(--duration) linear infinite; }
        .orbit-ring:hover       { animation-play-state: paused; }
        .orbit-ring:hover div   { animation-play-state: paused; }
        @keyframes scan {
          0%   { top: -2%; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 102%; opacity: 0; }
        }
      `}</style>

      {/* ── Dot grid ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* ── Ambient glows ── */}
      <div className="fixed top-[-180px] left-[-80px] w-[650px] h-[650px] rounded-full bg-emerald-500/[0.055] blur-[130px] pointer-events-none" />
      <div className="fixed bottom-[-150px] right-[-80px] w-[550px] h-[550px] rounded-full bg-teal-500/[0.035] blur-[120px] pointer-events-none" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-500/[0.12] bg-emerald-500/[0.04] text-[10px] uppercase tracking-[0.28em] font-mono text-emerald-400/70 mb-10 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.9)] animate-pulse" />
              Open to roles · Addis Ababa
            </motion.div>

            {/* Name — maximum weight, full screen size */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="leading-[0.88] mb-6"
            >
              <span
              className="block whitespace-nowrap text-[clamp(3rem,10vw,8rem)] text-[var(--text)] font-[900]"
              style={{ letterSpacing: '-0.04em' }}
        >
          Haregewoin Worku
          </span>
              <span
                className="block text-[clamp(1.3rem,3.7vw,3rem)] font-semibold mt-7"
                style={{
                  letterSpacing: '-0.02em',
                  fontFamily: "'Syne', sans-serif",
                  background: 'linear-gradient(95deg, #34d399 0%, #6ee7b7 60%, #a7f3d0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Software engineer | Web developer 
              </span>
            </motion.h1>

            
            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.48 }}
              className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto mb-10 mt-5"
            >
              <Link
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 shadow-[0_0_32px_rgba(52,211,153,0.22)]"
              >
                Get in touch
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-zinc-400 text-sm font-medium hover:border-emerald-500/20 hover:text-zinc-200 transition-all duration-200"
              >
                View projects
                <ExternalLink size={12} className="opacity-50" />
              </Link>
            </motion.div>

          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="absolute bottom-0 w-full py-7 border-t border-white/[0.04] bg-[#07080a]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-10 md:gap-20 opacity-20 hover:opacity-60 transition-opacity duration-700">
          <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.22em] text-zinc-500 group cursor-default">
            <Layers size={13} className="text-emerald-500 group-hover:rotate-90 transition-transform duration-500" />
            STRUCTURE
          </div>
          <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.22em] text-zinc-500 group cursor-default">
            <Lock size={13} className="text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
            SECURITY
          </div>
          <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.22em] text-zinc-500 group cursor-default">
            <Activity size={13} className="text-emerald-500 animate-pulse" />
            STABILITY
          </div>
        </div>
      </footer>

      {/* ── Scroll indicator ── */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/[0.08] hidden lg:block"
      >
        <ChevronDown size={18} />
      </motion.div>

    </div>
  )
}