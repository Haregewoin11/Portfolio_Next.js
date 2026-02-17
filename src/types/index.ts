export interface Project {
  id: string
  created_at: string
  title: string
  description: string
  tech_stack: string[]
  live_url?: string
  github_url?: string
  image_url: string
  security_notes: string
  is_published: boolean
}