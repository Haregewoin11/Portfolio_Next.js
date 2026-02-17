import { Shield, Terminal, GraduationCap, Zap, Search, Settings } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* 1. HERO SECTION: The System Thinker */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
          <div>
            {/* <div className="flex items-center gap-2 text-emerald-500 mb-4">
              <span className="h-px w-8 text-emerald-500"></span>
              <span className="text-sm font-bold uppercase tracking-widest">About me</span>
            </div> */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-50 mb-6">
              I build for <span className="text-emerald-500">Maintainability</span>
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
            <i> I’m a full-stack developer with a foundation in secure system design.</i> My background in hands-on cybersecurity training shapes how I build defensive design and long-term reliability.      </p>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Based in <b>Ethiopia</b>, I focus on security aware applications and structured systems that behave reliably under real-world use.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <StatCard icon={<Search className="text-blue-400" />} title="System Analysis" desc="Tracing data flow and failure points." />
            <StatCard icon={<Settings className="text-emerald-400" />} title="Explicit Code" desc="Predictable structure over clever shortcuts." />
            <StatCard icon={<Zap className="text-purple-400" />} title="Deliberate Improvement" desc="Shipping solid and avoiding rewrites." />
            <StatCard icon={<Shield className="text-orange-400" />} title="Defensive Design" desc="Hardening the system at every layer." />
          </div>
        </section>

        {/* 2. THE MANIFESTO: Deep Dive into your Logic */}
        <section className="mb-25 p-8 md:p-12 rounded-3xl bg-zinc-900/50 border border-zinc-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Terminal size={200} />
          </div>
          <h2 className="text-2xl font-bold text-zinc-50 mb-8">How I Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-emerald-500 font-bold mb-2 uppercase text-xs tracking-tighter">The Structural Approach</h3>
              <p className="text-zinc-300 leading-relaxed">
        I think in systems how data flows, where failure points exist, and what can be simplified before complexity grows. </p>
            </div>
            <div>
              <h3 className="text-emerald-500 font-bold mb-2 uppercase text-xs tracking-tighter">The Security Mindset</h3>
              <p className="text-zinc-300 leading-relaxed">
               Security considerations inform decisions from the start. I analyze potential vulnerabilities, access boundaries, and failure scenarios as part of system design not after deployment.
              </p>
            </div>
          </div>
        </section>

        {/* 3. EDUCATION & SKILLS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-zinc-50 mb-12 flex items-center gap-3">
              <GraduationCap className="text-emerald-500" /> Professional Foundation
            </h2>
            <div className="space-y-12 border-l border-zinc-800 ml-4 pl-8">
              <TimelineItem 
                year="2025"
                title="BSc in Software Engineering"
                institution="Addis Ababa Science and Technology University — 2025"
                description="Formal training centered on structured system design, collaborative development, and production-ready web applications."/>
              <TimelineItem 
                year="2024"
                title="Cybersecurity "
                institution="Web application security"
                description="Study and practical exposure in offensive security fundamentals, vulnerability analysis, and integrating defensive guardrails into the development lifecycle."
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-zinc-10 mb-3 text-emerald-500">Skills</h2>
             <TechList title="Frameworks & Libraries" items={['Next.js', 'React', 'Node.js', 'Express','Flask']} />
             <TechList title="Languages" items={['Python','TypeScript', 'JavaScript', 'SQL', ]} />
             <TechList title='Databases' items={['PostgreSQL','MongoDB','NoSQL Data Modeling']}/>
           <TechList title="Security" items={['Penetration Testing','Access Control','Role-Based Permissions','CTF Challenge Practice',  'OWASP Top 10', 'OAuth 2.0']} />
           <TechList title='DevOps' items={['Git','Docker','CI/CD']}/>
          </div>
        </section>

      </div>
    </div>
  )
}

// Reusable Sub-components
function StatCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors">
      <div className="mb-4">{icon}</div>
      <h4 className="text-zinc-50 font-bold mb-1">{title}</h4>
      <p className="text-zinc-500 text-xs leading-relaxed">{desc}</p>
    </div>
  )
}

interface TimelineItemProps {
  year: string;
  title: string;
  institution: string;
  description: string;
}

function TimelineItem({ year, title, institution, description }: TimelineItemProps) {
  return (
    <div className="relative">
      <div className="absolute -left-10.25 top-1 h-4 w-4 rounded-full text-emerald-500 border-4 border-zinc-950" />
      <span className="text-emerald-500 font-mono text-sm font-bold">{year}</span>
      <h3 className="text-xl font-bold text-zinc-50 mt-1">{title}</h3>
      <p className="text-zinc-500 text-sm mb-4">{institution}</p>
      <p className="text-zinc-400 max-w-xl">{description}</p>
    </div>
  )
}

function TechList({ title, items }: { title: string, items: string[] }) {
  return (
    <div>
      <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <span key={item} className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-md hover:border-blue-500/50 transition-colors">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}