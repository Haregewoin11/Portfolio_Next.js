import { createClient } from './supabase/server'
import { Project } from '@/types'

export async function getProjects() {
  const supabase = await createClient()
  
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true) // Security: Only fetch public data
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Fetch error:', error)
    return []
  }

  return projects as Project[]
}