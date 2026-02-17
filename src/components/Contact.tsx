'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client' 
import { 
  Send, Mail, Linkedin, Loader2, CheckCircle, Download,
   ArrowUpRight, Github, Lock , Paperclip
} from 'lucide-react'

// --- Helper: Reusable Social Tile (From previous design) ---
interface SocialTileProps {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  username: string;
  href: string;
  color: string;
}

const SocialTile = ({ icon: Icon, label, username, href, color }: SocialTileProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -3, x: 5 }}
    className="group flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl transition-all hover:border-emerald-500/30"
  >
    <div className="flex items-center gap-4">
      <div className={`p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 ${color}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">{label}</p>
        <p className="text-zinc-200 font-bold text-sm">{username}</p>
      </div>
    </div>
    <ArrowUpRight size={16} className="text-zinc-700 group-hover:text-emerald-500 transition-colors" />
  </motion.a>
)

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
    const [fileName, setFileName] = useState<string | null>(null)
  
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
     const file = formData.get('attachment') as File
       let fileUrl = null

    try {
      // 1. Handle File Upload if exists
      if (file && file.size > 0) {
        const fileExt = file.name.split('.').pop()
        const path = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('attachments')
          .upload(path, file)

        if (uploadError) throw uploadError
        fileUrl = uploadData.path
      }
   
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
       file_url: fileUrl, 
    }

     const { error: dbError } = await supabase.from('contacts').insert([payload])
      if (dbError) throw dbError

      // 3. Trigger Edge Function
      await supabase.functions.invoke('contact-notification', {
        body: { record: payload },
      })
      
    
      setIsSuccess(true)
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Handshake Failed:', err.message)
        alert(`Transmission failed: ${err.message}`)
      } else {
        console.error('Handshake Failed:', err)
        alert('Transmission failed: An unknown error occurred.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }
const CV_URL = `https://axnphxsdbulaaapawego.supabase.co/storage/v1/object/sign/public-assets/haregewoin-woku-cv.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82N2Y3OTUzZS1jMDQ5LTRkZDgtYWQ2Mi03NmM1YTIzZDM1ZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwdWJsaWMtYXNzZXRzL2hhcmVnZXdvaW4td29rdS1jdi5wZGYiLCJpYXQiOjE3NzEyMzI2MzUsImV4cCI6MTgwMjc2ODYzNX0.DCUMRgttM4NZC7rIYKd6bp558fKuUmtxa2ibsyPlKI4`

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 pt-32 pb-16 px-6">
      {/* Background Decorative Element */}
      <div className="fixed inset-0 bg-radial-at-t from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        
        {/* Left Side: Information & Social Tiles */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono uppercase tracking-widest mb-6 w-fit">
            <Lock size={12} className="animate-pulse" /> get in touch
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
            LET&#39;S <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-cyan-400">CONNECT.</span>
          </h1>
          
         
          {/* Social Grid Integration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
            <SocialTile 
              icon={Linkedin} 
              label="Professional" 
              username="Haregewoin Worku" 
              href="https://www.linkedin.com/in/haregewoin-worku-7a304738a" 
              color="text-blue-400" 
            />
            <SocialTile 
              icon={Github} 
              label="Source Code" 
              username="GitHub Profile" 
              href="https://github.com/haregewoin11" 
              color="text-zinc-100" 
            />
            <SocialTile 
              icon={Mail} 
              label="Direct Email" 
              username="hargwor21@gmail.com" 
              href="mailto:hargwor21@gmail.com" 
              color="text-emerald-400" 
            />
          </div>
          <div className=" py-10 grid gap-4" >
             <a 
              href={CV_URL}
              target="_blank" 
              rel="noopener noreferrer"
              download="Haregewoin_Worku_CV.pdf"
             className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all font-bold text-sm"
              >
               <Download size={16} /> Download Cv
            </a>
          </div>
        </motion.div>

        {/* Right Side: Integrated Form */}
         <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          {isSuccess ? (
            <motion.div 
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 0.6, opacity: 1 }}
              className="h-full min-h-100 flex flex-col items-center justify-center p-12 bg-zinc-900/30 border border-emerald-500/30 rounded-[2.5rem] text-center backdrop-blur-xl"
            >
              <div className="relative mb-6">
                <CheckCircle className="text-emerald-500" size={80} />
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-emerald-500 rounded-full blur-xl -z-10"
                />
              </div>
              <h2 className="text-3xl font-black mb-2 uppercase tracking-tight"></h2>
              <p className="text-zinc-400 font-mono text-xs">Successfuly Sent</p>
              <button 
                onClick={() => setIsSuccess(false)} 
                className="mt-10 px-6 py-2 border border-zinc-800 rounded-full text-zinc-500 font-mono text-[10px] hover:text-emerald-400 hover:border-emerald-500/50 transition-all uppercase tracking-widest"
              >
                Return to Form
              </button>
            </motion.div>
          ) : (
            <div className="bg-zinc-900/40 border border-zinc-800 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-md relative overflow-hidden group">
              {/* Subtle Scanning Line on Form */}
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-emerald-500/20 to-transparent" />
             

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <input required name="name" placeholder="Full Name" className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-emerald-500/50 p-4 rounded-2xl outline-none transition-all font-mono text-sm placeholder:text-zinc-700" />
                  </div>
                  <div className="space-y-1">
                    <input required type="email" name="email" placeholder="Email Address" className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-emerald-500/50 p-4 rounded-2xl outline-none transition-all font-mono text-sm placeholder:text-zinc-700" />
                  </div>
                </div>
                <input required name="subject" placeholder="Project Subject" className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-emerald-500/50 p-4 rounded-2xl outline-none transition-all font-mono text-sm placeholder:text-zinc-700" />
                <textarea required name="message" rows={5} placeholder="Encrypted Message..." className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-emerald-500/50 p-4 rounded-2xl outline-none transition-all font-mono text-sm resize-none placeholder:text-zinc-700" />
                  <div className="relative">
                                 <label className="flex items-center gap-3 w-full p-4 bg-zinc-950/50 border-2 border-dashed border-zinc-800 hover:border-emerald-500/50 rounded-xl cursor-pointer transition-all">
                                   <Paperclip size={18} className="text-zinc-500" />
                                   <span className="text-xs font-mono text-zinc-500 uppercase">
                                     {fileName || "Attach File (Max 5MB)"}
                                   </span>
                 <input 
                   type="file" 
                   name="attachment" 
                   className="hidden" 
                   accept=".pdf,.doc,.docx" // <--- Restricts the file picker
                   onChange={(e) => {
                     const file = e.target.files?.[0];
                     if (file && file.size > 5242880) {
                       alert("File is too large. Max 5MB allowed.");
                       e.target.value = ""; // Reset the input
                       return;
                     }
                     setFileName(file?.name || null);
                   }}
                 />
                                 </label>
                               </div>
                <button 
                  disabled={isSubmitting} 
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 mt-4 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      Send
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}