// 'use client'
// import Link from 'next/link'
// import { FolderGit2, Github, ExternalLink, ArrowUpRight } from 'lucide-react'

// // Define the Status color mapping
// const STATUS_COLORS = {
//   completed: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5',
//   ongoing: 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5',
//   testing: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
//   archived: 'text-zinc-500 border-zinc-500/20 bg-zinc-500/5',
// }

// interface Project {
//   title: string;
//   description: string;
//   tags?: string[];
//   status?: 'completed' | 'ongoing' | 'testing' | 'archived';
//   github_url?: string;
//   live_url?: string;
//   slug: string;
//   security_focus?: string;
// }

// export default function ProjectCard({ project }: { project: Project }) {
//   // Fallback to 'completed' or a default if status is missing in DB
//   const status = (project.status || 'completed') as keyof typeof STATUS_COLORS;

//   return (
//     <div className="group relative rounded-3xl bg-zinc-900 border border-zinc-800 p-8 hover:border-emerald-500/50 transition-all flex flex-col justify-between h-full">
//       <div>
//         <div className="flex justify-between items-start mb-6">
//           <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-emerald-500">
//             <FolderGit2 size={24} />
//           </div>
          
//           <div className="flex items-center gap-4">
//             {/* Status Indicator */}
//             <div className={`px-3 py-1 rounded-full border text-[9px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5 ${STATUS_COLORS[status]}`}>
//               <span className={`h-1.5 w-1.5 rounded-full ${status === 'ongoing' ? 'animate-pulse bg-cyan-400' : 'bg-current'}`} />
//               {status}
//             </div>

//             <div className="flex gap-3 ml-2">
//               {project.github_url && (
//                 <a href={project.github_url} target="_blank" className="text-zinc-500 hover:text-white transition-colors">
//                   <Github size={20} />
//                 </a>
//               )}
//               {project.live_url && (
//                 <a href={project.live_url} target="_blank" className="text-zinc-500 hover:text-white transition-colors">
//                   <ExternalLink size={20} />
//                 </a>
//               )}
//             </div>
//           </div>
//         </div>

//         <h3 className="text-2xl font-bold text-zinc-50 mb-3 group-hover:text-emerald-400 transition-colors">
//           {project.title}
//         </h3>
//         <p className="text-zinc-400 mb-6 text-sm leading-relaxed line-clamp-2">
//           {project.description}
//         </p>

//         <div className="flex flex-wrap gap-2 mb-8">
//           {project.tags?.map((tag: string) => (
//             <span key={tag} className="px-3 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-tighter">
//               {tag}
//             </span>
//           ))}
//         </div>
//       </div>

//       <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
//         <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-500">
//           <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
//           {project.security_focus || "General Security"}
//         </div>
        
//         <Link 
//           href={`/projects/${project.slug}`} 
//           className="group/link flex items-center gap-1 text-sm font-bold text-zinc-300 hover:text-emerald-500 transition-colors"
//         >
//           Deep Dive 
//           <ArrowUpRight size={16} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
//         </Link>
//       </div>
//     </div>
//   )
// }