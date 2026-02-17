import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // We want to go to /blog after success
  const next = searchParams.get('next') ?? '/blog'

  if (code) {
    const supabase = await createClient()
    
    // This is the critical exchange step
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // SUCCESS: Session is now in cookies
      const forwardTo = new URL(next, origin)
      return NextResponse.redirect(forwardTo)
    }

    // LOG THE ERROR: This helps you see why it's failing in your terminal
    console.error('Auth Exchange Error:', error.message)
  }

  // FAILURE: Redirect to error page with the error message
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}