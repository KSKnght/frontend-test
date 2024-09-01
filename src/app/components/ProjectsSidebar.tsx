'use client';

import Link from 'next/link'
import React from 'react'


const ProjectsSidebar = ({project}) => {
  return (
    <div className='w-[15%] bg-slate-700'>
        <Link href={'/Projects'}>Back</Link>
        <div>
        <h1>{project.name}</h1>
        <h1>{project.client.lastname + ', ' + project.client.firstname + ' ' + project.client.middlename}</h1>
        <h1>{project.projectAddress}</h1>
        <h1>{project.progress}</h1>
        <h1>{project.type}</h1>
        <h1>{new Date(project.startDate).toUTCString().slice(0,16)}</h1>
        <h1>{new Date(project.endDate).toUTCString().slice(0,16)}</h1>
        </div>
        <div>
          <Link href={'/Projects/'+ project.id+'/view/?editproject=true'}>Edit</Link>
        </div>
    </div>
  )
}

export default ProjectsSidebar