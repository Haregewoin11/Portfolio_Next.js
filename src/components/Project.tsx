import { createClient } from '@/lib/supabase/client';
import { ArrowUpRight, ExternalLink, FolderGit2, Github } from 'lucide-react';
import Link from 'next/link';

// This ensures the page is treated as a static-but-revalidatable asset
export const revalidate = 3600; // Fallback: revalidate every hour

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github_url?: string;
  live_url?: string;
  slug: string;
  security_focus?: string;
  // Add other fields as needed based on your Supabase schema
}

export default async function ProjectsPage() {
  // Fetch projects from Supabase
  const supabase = await createClient()
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
  if (error) {
    console.error('Database Connection Error:', error)
    return <div className="pt-40 text-center">Failed to load systems. Check connection strings.</div>
  }

  return (
    <main className="min-h-screen bg-zinc-950 pt-25 pb-16" >
      <div className="mx-auto max-w-7xl px-6 pb-0">
        
        <header className="mb-15">
          {/* <div className="flex items-center gap-2 text-emerald-500 mb-4">
            <ShieldCheck size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Verified Systems</span>
          </div> */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-50 mb-6 tracking-tight">
            Project <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-cyan-400">Archive</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
  Production-oriented projects emphasis is placed on structural decisions, trade-offs, and system design.
</p>

        </header>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects?.map((project: Project) => (
            <div 
              key={project.id} 
              className="group relative rounded-3xl bg-zinc-900 border border-zinc-800 p-8 hover:border-emerald-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-emerald-500">
                    <FolderGit2 size={24} />
                  </div>
                  <div className="flex gap-4">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" className="text-zinc-500 hover:text-white transition-colors">
                        <Github size={20} />
                      </a>
                    )}
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" className="text-zinc-500 hover:text-white transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-zinc-50 mb-3 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400 mb-6 text-sm leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags?.map((tag: string) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-tighter"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Section */}
              <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {project.security_focus || "General Security"}
                </div>
                
                <Link 
                  href={`/projects/${project.slug}`} 
                  className="group/link flex items-center gap-1 text-sm font-bold text-zinc-300 hover:text-emerald-500 transition-colors"
                >
                  Deep Dive 
                  <ArrowUpRight size={16} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {projects?.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-zinc-800 rounded-3xl">
            <p className="text-zinc-500">No projects synchronized yet. Update Supabase to populate.</p>
          </div>
        )}
      </div>
    </main>
  )
}