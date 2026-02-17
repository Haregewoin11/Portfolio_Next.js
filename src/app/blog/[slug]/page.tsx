import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Shield, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
 // 1. Await the params to get the slug
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  console.log("Resolved Slug:", slug); // This should now show 'insa-residency' instead of undefined

  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug) // Use the resolved slug here
    .single();

  if (error || !post) {
    console.error("Database error or missing slug:", slug);
    return notFound();
  }
return (
  <main className="min-h-screen bg-zinc-950 text-zinc-50 pt-32 pb-16 px-6">
    <div className="max-w-3xl mx-auto">
      
      {/* 1. Header Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-zinc-500 font-mono text-sm">
          <span className="text-emerald-500"># {post.category}</span>
          <span>•</span>
          <span>5 min read</span>
          <span>•</span>
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
      </header>

      {/* 2. Markdown Content Section */}
      <article className="
        prose prose-invert prose-emerald max-w-none
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
        prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-lg
        prose-strong:text-zinc-100
        prose-blockquote:border-emerald-500 prose-blockquote:bg-zinc-900/50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
        prose-code:text-emerald-400 prose-code:bg-emerald-950 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:shadow-2xl
        prose-img:rounded-3xl prose-img:border prose-img:border-zinc-800
      ">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>

    </div>
  </main>
);
}