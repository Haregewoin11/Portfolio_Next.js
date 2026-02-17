// import { getProjects } from '@/lib/projects'
// import ProjectCard from './ProjectCard'
// import type { Project } from '@/types' // adjust the import path if needed

// export default async function ProjectGrid() {
//   const projects: Project[] = await getProjects()

//   if (projects.length === 0) {
//     return <p className="text-zinc-500">No projects secured yet. Check back soon.</p>
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {projects.map((project) => (
//         <ProjectCard key={project.id} project={project} />
//       ))}
//     </div>
//   )
// }