import Link from 'next/link'
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

// This makes the page a Server Component (more secure for API keys)
export default async function BlogPage() {
  const supabase = await createClient()

  // Fetching data directly on the server
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
    return <div className="text-white pt-32 text-center">Failed to load insights.</div>;
  }

  return (
    <main className="min-h-screen bg-zinc-950 pt-32 pb-16">
      <div className="mx-auto max-w-5xl px-6">
        
        <header className="mb-16">
          <div className="flex items-center gap-2 text-emerald-500 mb-4">
            <BookOpen size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Technical Writing</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-50 mb-6">
            Latest <span className="text-zinc-500">Insights</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl italic border-l-2 border-emerald-500 pl-4">
            "Software engineering is the art of balancing speed with security."
          </p>
        </header>

        <div className="grid gap-8">
          {blogs?.length === 0 ? (
            <p className="text-zinc-500">No articles published yet. Stay tuned!</p>
          ) : (
            blogs?.map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.slug}`} className="group">
                <article className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all">
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-medium uppercase tracking-widest text-zinc-500">
                    <span className="text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                      {blog.category || 'Engineering'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> 
                      {new Date(blog.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    {/* Tag display for your Cybersecurity expertise */}
                    <div className="flex gap-2">
                      {blog.tags?.map((tag: string) => (
                        <span key={tag} className="text-[10px] border border-zinc-700 px-2 py-0.5 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-zinc-50 mb-3 group-hover:text-emerald-400 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-zinc-400 mb-6 leading-relaxed line-clamp-2">
                    {blog.excerpt || blog.content?.substring(0, 150) + '...'}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm font-bold text-zinc-300 group-hover:gap-4 transition-all">
                    Explore Analysis <ArrowRight size={16} className="text-emerald-500" />
                  </div>
                </article>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  )
}