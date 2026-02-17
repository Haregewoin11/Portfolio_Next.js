import AboutPage from '@/components/About'
import Contact from '@/components/Contact'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import ProjectsPage from '@/components/Project'

export default function Page() {
  return (
   <div className="bg-zinc-950 text-zinc-100">
      {/* Fixed Navbar with Scroll Links */}
      <Navbar />

      <main>
        {/* Section 1: Hero */}
        <section id="home" className="min-h-screen">
          <Hero />
        </section>

        {/* Section 2: About / Experience */}
        <section id="about" className="min-h-screen py-20 bg-zinc-900/30">
          <AboutPage />
        </section>

        {/* Section 3: Projects */}
        <section id="projects" className="min-h-screen py-20">
          <ProjectsPage />
        </section>

        {/* Section 4: Contact */}
        <section id="contact" className="min-h-screen py-20 bg-emerald-500/5">
          <Contact />
        </section>
        {/* <section id='blog' className='min-h-screen py-20'>
          <BlogPage/>
        </section> */}
      </main>

      <footer className="py-10 text-center text-zinc-600 border-t border-zinc-900">
        &copy; {new Date().getFullYear()} — Haregewoin W. <br/>Built with Next js
      </footer>
    </div>
  )
}