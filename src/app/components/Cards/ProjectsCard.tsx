'use client';

import { useRouter } from 'next/navigation';
import React from 'react'

const ProjectsCard = ({data}) => {
  const router = useRouter()
  return (
    <div className='m-3 w-full items-center bg-slate-300 p-3' onClick={() => {router.push('/Projects/'+ data.id+'/view')}}>
      <div className='flex flex-row items-center w-auto'>
        <h1 className=' w-96'>
          {data.name}
        </h1>
        <div>
          Status: {data.progress}
        </div>
      </div>
      <div className='flex flex-row'>
        <div className=' w-36'>
          {data.type}
        </div>
        <div className=' w-56'>
          Start Date: {new Date(data.startDate).toDateString()}
        </div>
        <div className=' w-56'>
          End Date: {new Date(data.endDate).toDateString()}
        </div>
      </div>
      <div>
        Client: {data.client.lastname + ', ' + data.client.firstname + ' ' + data.client.middlename}
      </div>
      <div>
        Address: {data.projectAddress}
      </div>
    </div>
  )
}

export default ProjectsCard