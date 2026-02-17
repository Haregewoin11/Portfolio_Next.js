"use client"

import { cn } from '@/lib/utils'
import { Menu, Shield, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const navItems = [
  { name: 'Home', path: '#home', isExternal: false },
  { name: 'About', path: '#about', isExternal: false },
  { name: 'Projects', path: '#projects', isExternal: false },
  { name: 'Contact', path: '#contact', isExternal: false },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
  }, [isOpen])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact','blog']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top >= -100 && rect.top <= 300
        }
        return false
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md fixed top-0 left-0 z-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 z-110">
          <Shield className="text-emerald-500" size={24} />
          <span className="font-bold text-xl tracking-tighter text-zinc-100 uppercase">
            HW.
          </span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.path}>
              {item.isExternal ? (
                <Link
                  href={item.path}
                  className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
               <a
  href={item.path}
  onClick={(e) => {
    if (!item.isExternal) {
      e.preventDefault();
      const targetId = item.path.replace('#', '');
      const elem = document.getElementById(targetId);
      elem?.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close mobile menu
    }
  }}
  className={cn(
    "text-sm font-medium transition-colors hover:text-emerald-400 font-mono",
    activeSection === item.path.replace('#', '') ? "text-emerald-500" : "text-zinc-400"
  )}
>
  {item.name}
</a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white z-110"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={cn(
          "fixed inset-0 bg-zinc-950 z-100 flex flex-col items-center justify-center transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <ul className="flex flex-col items-center gap-8">
            {navItems.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-2xl font-bold tracking-tight transition-colors",
                    activeSection === item.path.replace('#', '') ? "text-emerald-500" : "text-zinc-400"
                  )}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}