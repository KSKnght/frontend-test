import {getProjects} from '@/lib/read'
import React from 'react'
import ProjectsCard from './Cards/ProjectsCard'

export default async function ProjectTable() {
  const display = await getProjects();
  
  return (
        <ul>
            {display.map((display, i) => {
                return <li><ProjectsCard data={display} key={i}/></li>
            })}
        </ul>
  )
}