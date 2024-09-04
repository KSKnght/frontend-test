'use client';

import { useRouter } from 'next/navigation';
import React from 'react'

const ProjectsCard = ({data}) => {
  const router = useRouter()
  return (
    <div className='mt-10 ml-12 w-auto items-center bg-slate-200 rounded-3xl p-8' onClick={() => {router.push('/Projects/'+ data.id+'/view')}}>
      <div className='flex flex-row items-center w-auto'>
        <h1 className=' w-full text-3xl font-semibold'>
          {data.name}
        </h1>
        <div className='py-2 px-4 bg-red-400 text-red-900 rounded-full text-xs font-bold'>
          {data.progress}
        </div>
      </div>
      <div className='flex flex-row mt-4'>
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