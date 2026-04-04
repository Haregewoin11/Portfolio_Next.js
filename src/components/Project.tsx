import { createClient } from '@/lib/supabase/server';
import { ArrowUpRight, ExternalLink, FolderGit2, Github, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

// Ensures the page stays fast but updates every hour if data changes
export const revalidate = 3600; 

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github_url?: string;
  live_url?: string;
  slug: string;
  security_focus?: string;
  image_url: string; // Matches Supabase column name
}

export default async function ProjectsPage() {
  const supabase = await createClient();
  
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Database Connection Error:', error);
    return (
      <div className="pt-40 text-center bg-zinc-950 min-h-screen text-zinc-500 font-mono">
        [!] Error: Failed to synchronize with system archive.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#07080a] text-zinc-100 selection:bg-emerald-500/15 overflow-hidden relative pt-32 pb-24">
      
      {/* ── Dot grid background (Consistency) ── */}
      <div
       
     className="fixed inset-0 bg-radial-at-t from-emerald-500/5 via-transparent to-transparent pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* ── Ambient glows ── */}
      <div className="fixed top-[-180px] left-[-80px] w-[650px] h-[650px] rounded-full bg-emerald-500/[0.055] blur-[130px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        <header className="mb-20">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-500/[0.12] bg-emerald-500/[0.04] text-[10px] uppercase tracking-[0.28em] font-mono text-emerald-400/70 mb-8 backdrop-blur-sm">
            <ShieldCheck size={14} className="text-emerald-400" />
            Verified Systems Archive
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-zinc-50 mb-6 tracking-tighter" style={{ fontFamily: "'Syne', sans-serif" }}>
            Project <span className="text-emerald-500/50 italic font-normal">Works</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed font-light">
            Production oriented projects with a focus on security trade-offs and maintainable system design.
          </p>
        </header>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects?.map((project: Project) => {
            // Logic to handle image URLs (Checking if it's a full URL or a storage path)
            const displayImage = project.image_url?.startsWith('http') 
              ? project.image_url 
              : supabase.storage.from('public-assets').getPublicUrl(project.image_url).data.publicUrl;

            return (
              <article
  key={project.id}
  className="group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#0c0d10]/40 backdrop-blur-md hover:border-emerald-500/30 transition-all duration-300"
>
  <div className="flex flex-col sm:flex-row h-full">
    
    {/* ── Compact Image Side ── */}
    <div className="relative w-full sm:w-40 h-40 sm:h-auto overflow-hidden shrink-0 border-b sm:border-b-0 sm:border-r border-white/[0.05]">
      <img
        src={displayImage || '/placeholder.jpg'}
        alt={project.title}
        className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-transparent transition-colors" />
    </div>

    {/* ── Compact Content Side ── */}
    <div className="p-5 flex flex-col justify-between flex-grow">
      <div>
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-zinc-100 tracking-tight group-hover:text-emerald-400 transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-3 text-zinc-500">
             {project.github_url && (
               <a href={project.github_url} target="_blank" className="hover:text-white transition-colors">
                 <Github size={16} />
               </a>
             )}
             <a href={project.live_url ?? `/projects/${project.slug}`} className="hover:text-emerald-400 transition-colors">
               <ExternalLink size={16} />
             </a>
          </div>
        </div>

        <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 mb-4 font-light">
          {project.description}
        </p>

        {/* Tags: Smaller and more subtle */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags?.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-white/[0.03] text-[9px] font-mono uppercase tracking-tighter text-emerald-500/80 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Security Focus: Now a footer badge */}
      <div className="mt-4 pt-3 border-t border-white/3 flex justify-between items-center">
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-600">
          {/* {project.security_focus } */}
        </span>
        <Link
          href={`/projects/${project.slug}`}
          className="text-[10px] font-bold text-emerald-500 hover:text-emerald-300 transition-colors flex items-center gap-1"
        >
          View  <ArrowUpRight size={12} />
        </Link>
      </div>
    </div>
  </div>
</article>
            );
          })}
        </div>

        {/* Empty State */}
        {/* {projects?.length === 0 && (
          <div className="py-32 text-center border border-dashed border-white/[0.05] rounded-[3rem] bg-white/[0.01]">
            <p className="font-mono text-xs tracking-widest text-zinc-600 uppercase">
              [!] No systems found in local cache. Syncing required.
            </p>
          </div> 
        )}*/}
      </div>
    </main>
  );
}