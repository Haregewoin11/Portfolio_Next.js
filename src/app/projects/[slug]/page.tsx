import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import { ArrowLeft, Github, ExternalLink, ShieldAlert, Cpu, Layers } from 'lucide-react'
import Link from 'next/link'
import 'highlight.js/styles/github-dark.css'

export default async function ProjectDeepDive({ params }: { params: { slug: string } }) {
  const { slug } = params
  
  // 1. Load the project markdown file from a new folder: content/projects/
  const projectFile = path.join(process.cwd(), 'content/projects', `${slug}.mdx`)
  const source = fs.readFileSync(projectFile, 'utf8')
  const { content, data } = matter(source)

  return (
    <main className="min-h-screen bg-zinc-950 pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Navigation */}
        <Link href="/projects" className="flex items-center gap-2 text-zinc-500 hover:text-blue-500 transition-colors mb-12 text-sm font-medium">
          <ArrowLeft size={16} /> Back to Archive
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT: Project Header & Content (8 Cols) */}
          <div className="lg:col-span-8">
            <header className="mb-12">
              <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-50 mb-6 tracking-tight">
                {data.title}
              </h1>
              <p className="text-zinc-400 text-xl leading-relaxed">
                {data.description}
              </p>
            </header>

            {/* The MDX Content */}
            <div className="prose prose-invert prose-zinc max-w-none 
              prose-headings:text-zinc-50 prose-headings:font-bold 
              prose-p:text-zinc-400 prose-p:leading-relaxed
              prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800">
              <MDXRemote 
                source={content} 
                options={{
                  mdxOptions: { rehypePlugins: [rehypeHighlight] },
                }} 
              />
            </div>
          </div>

          {/* RIGHT: Technical Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-32 space-y-6">
              
              {/* Action Links */}
              <div className="grid grid-cols-2 gap-4">
                <a href={data.github} className="flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 py-3 rounded-xl hover:bg-zinc-800 transition-all font-bold">
                  <Github size={18} /> Source
                </a>
                <a href={data.live} className="flex items-center justify-center gap-2 bg-blue-600 py-3 rounded-xl hover:bg-blue-500 transition-all font-bold">
                  <ExternalLink size={18} /> Live Demo
                </a>
              </div>

              {/* Technical Specs Card */}
              <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
                <div>
                  <h4 className="flex items-center gap-2 text-zinc-50 font-bold mb-4 uppercase text-xs tracking-widest text-blue-500">
                    <Cpu size={14} /> Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.tags?.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-md text-xs text-zinc-400 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-800">
                  <h4 className="flex items-center gap-2 text-zinc-50 font-bold mb-4 uppercase text-xs tracking-widest text-emerald-500">
                    <ShieldAlert size={14} /> Security Audit
                  </h4>
                  <p className="text-sm text-zinc-500 leading-relaxed italic">
                    "{data.securityStatement}"
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-800">
                  <h4 className="flex items-center gap-2 text-zinc-50 font-bold mb-4 uppercase text-xs tracking-widest text-purple-500">
                    <Layers size={14} /> Role
                  </h4>
                  <p className="text-sm text-zinc-400">{data.role}</p>
                </div>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}