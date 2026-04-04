'use client'

import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  Terminal,
  GraduationCap,
  Activity,
  Lock,
  Cpu,
  ShieldCheck,
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-100 selection:bg-emerald-500/15 overflow-hidden relative pt-24 pb-16">

      {/* Background Grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Ambient Glow */}
      <div className="fixed -top-[180px] -left-[80px] w-[650px] h-[650px] rounded-full bg-emerald-500/5 blur-[130px]" />
      <div className="fixed -bottom-[150px] -right-[80px] w-[550px] h-[550px] rounded-full bg-teal-500/[0.035] blur-[120px]" />

      <main className="relative z-10 max-w-7xl mx-auto px-6">

        {/* HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32 pt-10">

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1
              className="text-[clamp(2.8rem,6vw,4.5rem)] font-black tracking-tighter leading-[0.92] mb-8"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Full-Stack <br />
              <span
                style={{
                  background:
                    'linear-gradient(95deg,#34d399 0%,#6ee7b7 60%,#a7f3d0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
               Web Developer
              </span>
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl font-light">
             I build secure full-stack web app.
              I focus in building maintainable applications using{' '}
              <span className="text-emerald-300">Next.js</span>,{' '}
              <span className="text-emerald-300">React.js</span>,{' '}and modern
             tech.
            </p>
          </motion.div>

          {/*  */}
        </section>

        {/* MANIFESTO */}
        {/* <section className="mb-32 p-1 border border-white/[0.05] rounded-[2rem] bg-gradient-to-b from-white/[0.03] to-transparent">
          <div className="p-8 md:p-16 rounded-[1.9rem] bg-[#0c0d10]/50 backdrop-blur-md relative overflow-hidden">
            <Terminal className="absolute -bottom-10 -right-10 text-emerald-500/5 rotate-12" size={300} />

            <div className="grid md:grid-cols-2 gap-16 relative z-10">
              <div>
                <h3 className="text-emerald-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-6">
                  Engineering Philosophy
                </h3>
                <p className="text-zinc-300 text-xl leading-relaxed font-light">
                  I approach products as systems — understanding dependencies,
                  failure surfaces, and operational simplicity before adding complexity.
                </p>
              </div>

              <div>
                <h3 className="text-emerald-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-6">
                  Security Perspective
                </h3>
                <p className="text-zinc-300 text-xl leading-relaxed font-light">
                  Security is integrated early: authentication models, data exposure,
                  permission layers, and attack surfaces are evaluated from day one.
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* FOUNDATION */}
     <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

  {/* LEFT SIDE */}
  <div>
    <h2 className="text-3xl md:text-4xl font-bold mb-14 flex items-center gap-4 tracking-tight">
      <GraduationCap className="text-emerald-500 w-7 h-7" />
      Professional Foundation
    </h2>

    <div className="space-y-14 border-l border-white/[0.05] ml-4 pl-10">
      <TimelineItem
        year="2025"
        title="BSc in Software Engineering"
        institution="Addis Ababa Science and Technology University"
      />

      <TimelineItem
        year="2024"
        title="Cybersecurity "
        institution="INSA "
      />
    </div>
  </div>

  {/* RIGHT SIDE */}
  <div>
    <h2 className="text-3xl md:text-4xl font-bold mb-14 flex items-center gap-4 tracking-tight">
      <Cpu className="text-emerald-500 w-7 h-7" />
      Technical Stack
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <TechList title="Frontend" items={['Next.js', 'React.js', 'TypeScript', 'JavaScript']} />
      <TechList title="Backend" items={['Node.js', 'Express', 'Python', 'Flask']} />
      <TechList title="Security" items={['Penetration Testing', 'OAuth 2.0', 'RBAC', 'JWT']} />
      <TechList title="Databases" items={['PostgreSQL', 'MongoDB', 'MySQL', 'Supabase', 'Firebase']} />
      <TechList title="Version Control" items={['Git', 'GitHub']} />
      <TechList title="Deployment" items={['Docker', 'CI/CD', 'Vercel']} />
    </div>
  </div>
</section>
      </main>

      {/* Footer */}
      <footer className="w-full py-10 border-t border-white/[0.04] bg-[#07080a]/85 backdrop-blur-xl mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-10 md:gap-20 opacity-30 hover:opacity-100 transition-opacity duration-700">
          <FooterLabel icon={<Lock size={12} />} text="SECURITY" color="text-emerald-400" />
          <FooterLabel icon={<Activity size={12} />} text="STABILITY" color="text-emerald-500" />
          <FooterLabel icon={<Cpu size={12} />} text="PRECISION" color="text-teal-400" />
        </div>
      </footer>
    </div>
  )
}

/* COMPONENTS */

function StatCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-[#0c0d10]/60 border border-white/[0.05] p-6 rounded-2xl hover:border-emerald-500/30 transition-all">
      <div className="mb-4 bg-emerald-500/5 w-10 h-10 flex items-center justify-center rounded-xl">
        {icon}
      </div>
      <h4 className="font-bold text-sm mb-1">{title}</h4>
      <p className="text-zinc-500 text-[11px]">{desc}</p>
    </div>
  )
}

function TimelineItem({ year, title, institution }:{year: string; title:string; institution:string}) {
  return (
    <div className="relative">
      <div className="absolute -left-[46px] top-1 h-3 w-3 rounded-full bg-emerald-500 border-4 border-[#07080a]" />
      <span className="text-emerald-400 font-mono text-[10px] font-bold tracking-widest">{year}</span>
      <h3 className="text-lg font-bold mt-1">{title}</h3>
      <p className="text-zinc-500 text-xs mb-3">{institution}</p>
      {/* <p className="text-zinc-400 text-sm leading-relaxed">{description}</p> */}
    </div>
  )
}

function TechList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="p-5 rounded-2xl border border-white/[0.03] bg-white/[0.01]">
      <h3 className="text-zinc-500 text-[10px] font-mono uppercase tracking-[0.2em] mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="px-3 py-1.5 bg-[#0c0d10] border border-white/[0.07] text-zinc-300 text-[12px] rounded-lg">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function FooterLabel({ icon, text, color }: { icon: ReactNode; text: string; color: string }) {
  return (
    <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.22em] text-zinc-500">
      <span className={color}>{icon}</span>
      {text}
    </div>
  )
}