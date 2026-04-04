import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import { ArrowLeft, Github, ExternalLink, ShieldAlert, Cpu, Layers, Terminal } from 'lucide-react'
import Link from 'next/link'
import 'highlight.js/styles/github-dark.css'
import { notFound } from 'next/navigation'

export default async function ProjectDeepDive({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // Fix: Await params for Next.js 15
  const { slug } = await params
  
  const projectFile = path.join(process.cwd(), 'content/projects', `${slug}.mdx`)
  
  // Guard clause for missing files
  if (!fs.existsSync(projectFile)) {
    notFound()
  }

  const source = fs.readFileSync(projectFile, 'utf8')
  const { content, data } = matter(source)
  if (data.status === 'maintenance' || data.status === 'migrated') {
  return (
    <main className="min-h-screen bg-[#07080a] flex items-center justify-center p-6">
      <div className="max-w-md w-full p-8 rounded-3xl border border-amber-500/20 bg-amber-500/[0.02] backdrop-blur-xl text-center">
        <ShieldAlert size={48} className="text-amber-500 mx-auto mb-6 opacity-50" />
        <h1 className="text-2xl font-bold text-zinc-100 mb-2 font-mono uppercase tracking-tighter">
           System Access Restricted
        </h1>
        <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
          The requested archive <span className="text-zinc-300">[{slug}]</span> is currently 
          {data.status === 'maintenance' ? ' undergoing scheduled maintenance' : ' being migrated to a new node'}.
        </p>
        <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-500 hover:text-emerald-300">
          <ArrowLeft size={14} /> Return to Archive
        </Link>
      </div>
    </main>
  )
}

  return (
    <main className="min-h-screen bg-[#07080a] text-zinc-100 selection:bg-emerald-500/15 overflow-hidden relative pt-32 pb-24">
      
      {/* ── Dot grid background (Consistency) ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* ── Ambient glows ── */}
      <div className="fixed top-[-180px] left-[-80px] w-[650px] h-[650px] rounded-full bg-emerald-500/[0.055] blur-[130px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* Navigation */}
        <Link href="/projects" className="group inline-flex items-center gap-2 text-zinc-500 hover:text-emerald-400 transition-colors mb-16 text-[10px] font-mono uppercase tracking-[0.2em]">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Return to Archive
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT: Project Header & Content */}
          <div className="lg:col-span-8">
            <header className="mb-16">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-500/[0.12] bg-emerald-500/[0.04] text-[10px] uppercase tracking-[0.28em] font-mono text-emerald-400/70 mb-8 backdrop-blur-sm">
                System Documentation
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-zinc-50 mb-8 tracking-tighter leading-[0.9]" style={{ fontFamily: "'Syne', sans-serif" }}>
                {data.title}
              </h1>
              <p className="text-zinc-400 text-xl leading-relaxed max-w-2xl font-light">
                {data.description}
              </p>
            </header>

            {/* Rendered Markdown with Custom Styling */}
            <div className="prose prose-invert prose-emerald max-w-none 
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-4 prose-h2:mt-16
              prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-lg
              prose-strong:text-emerald-400 prose-strong:font-semibold
              prose-code:text-emerald-300 prose-code:bg-emerald-500/5 prose-code:px-1 prose-code:rounded
              prose-pre:bg-[#0c0d10] prose-pre:border prose-pre:border-white/[0.05] prose-pre:rounded-2xl prose-pre:p-6">
              <MDXRemote 
                source={content} 
                options={{
                  mdxOptions: { rehypePlugins: [rehypeHighlight] },
                }} 
              />
            </div>
          </div>

          {/* RIGHT: Technical Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              
              {/* Action Links */}
              <div className="flex flex-col gap-3">
                <a href={data.live} target="_blank" className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 py-4 rounded-2xl transition-all font-bold text-sm shadow-[0_0_20px_rgba(52,211,153,0.15)]">
                  <ExternalLink size={18} /> Initialize Live System
                </a>
                <a href={data.github} target="_blank" className="flex items-center justify-center gap-2 bg-white/[0.03] border border-white/[0.08] text-zinc-300 py-4 rounded-2xl hover:bg-white/[0.06] transition-all font-bold text-sm">
                  <Github size={18} /> View Source Code
                </a>
              </div>

              {/* Technical Specs Card */}
              <div className="p-8 rounded-[2rem] bg-[#0c0d10]/60 border border-white/[0.05] backdrop-blur-xl space-y-8 relative overflow-hidden">
                <Terminal className="absolute -bottom-6 -right-6 text-white/[0.02]" size={120} />
                
                <div>
                  <h4 className="flex items-center gap-2 text-emerald-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-6">
                    <Cpu size={14} /> Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.tags?.map((tag: string) => (
                      <span key={tag} className="px-3 py-1.5 bg-[#07080a] border border-white/[0.07] rounded-lg text-xs text-zinc-400 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-white/[0.05]">
                  <h4 className="flex items-center gap-2 text-emerald-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-4">
                    <ShieldAlert size={14} /> Security Posture
                  </h4>
                  <div className="p-4 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/10">
                    <p className="text-sm text-zinc-400 leading-relaxed italic font-light">
                      &ldquo;{data.securityStatement || 'System architectural integrity verified via automated testing.'}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/[0.05]">
                  <h4 className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-2">
                    <Layers size={14} /> System Role
                  </h4>
                  <p className="text-sm text-zinc-300 font-medium">{data.role}</p>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500/[0.02] border border-emerald-500/[0.08]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-[10px] font-mono text-emerald-500/70 uppercase tracking-widest">Archive Sync: Active</span>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
