'use client';

import Link from 'next/link'
import React from 'react'


const ProjectsSidebar = ({project}) => {
  return (
    <div className='flex flex-col py-10 p-4 w-60 h-screen font-san bg-gradient-to-r from-pink-600 to-pink-500'>
        <Link className='mb-10' href={'/Projects'}>Back</Link>
        <div className='text-white'>
        <h1 className='font-semibold text-lg'>Project Name</h1>
        <h1 className='mb-2 pl-4'>{project.name}</h1>
        <h1 className='font-semibold text-lg'>Client Name</h1>
        <h1 className='mb-2 pl-4'>{project.client.lastname + ', ' + project.client.firstname + ' ' + project.client.middlename}</h1>
        <h1 className='font-semibold text-lg'>Address</h1>
        <h1 className='mb-2 pl-4'>{project.projectAddress}</h1>
        <h1 className='font-semibold text-lg'>Progress</h1>
        <h1 className='mb-2 pl-4'>{project.progress}</h1>
        <h1 className='font-semibold text-lg'>Project Type</h1>
        <h1 className='mb-2 pl-4'>{project.type}</h1>
        <h1 className='font-semibold text-lg'>Project Name</h1>
        <h1 className='pl-4'>{new Date(project.startDate).toUTCString().slice(0,16)}</h1>
        <h1 className='pl-4'>{new Date(project.endDate).toUTCString().slice(0,16)}</h1>
        </div>
        <div>
          <Link href={'/Projects/'+ project.id+'/view/?editproject=true'}>Edit</Link>
        </div>
    </div>
  )
}

export default ProjectsSidebar