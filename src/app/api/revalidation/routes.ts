import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('x-revalidate-token')

  // Security: Only allow your secret token to trigger a cache clear
  if (authHeader !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  try {
    // This clears the cache for the projects and home page
    revalidatePath('/')
    revalidatePath('/projects')
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}