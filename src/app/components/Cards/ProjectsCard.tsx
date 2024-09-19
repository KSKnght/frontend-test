'use client';

import { useRouter } from 'next/navigation';
import React from 'react'
import { MdDesignServices } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";





const ProjectsCard = ({data}) => {
  const router = useRouter()
  return (
    <div className='mt-4 mb-6 ml-12 w-auto items-center bg-gray-100 rounded-3xl p-8 shadow-sm border 
                    hover:border-pink-600 hover:border-opacity-50 transition-colors ease-in-out' onClick={() => {router.push('/Projects/'+ data.id+'/view')}}>
      <div className='flex flex-row items-center w-auto'>
        <h1 className=' w-full text-3xl font-semibold text-pink-600'>
          {data.name}
        </h1>
        <div className='py-2 px-4 bg-gray-400 text-gray-900 rounded-full text-xs font-bold'>
          {data.progress}
        </div>
      </div>
      <div className='flex flex-row'>
        <div className='flex flex-col mt-4 w-full'>
            
            <div className='w-auto flex justify-left mb-1'>
              <MdDesignServices className='w-auto h-5'/> 
              <p className='font-medium mx-2'>{data.type}</p>
            </div>

            <div className='w-auto flex justify-left mb-1'>
              <IoPerson className='w-auto h-5'/>
              <p className='font-medium mx-2'>{data.client.lastname + ', ' + data.client.firstname + ' ' + data.client.middlename}</p>
            </div>

            <div className='w-auto flex justify-left'>
              <MdLocationOn className='w-auto h-5' />
              <p className='font-medium mx-2'>{data.projectAddress}</p>
            </div>
        </div>

        <div className='mt-4'>
          <div className='w-56'>
            Start Date: {new Date(data.startDate).toDateString()}
          </div>
          <div className='w-56'>
            End Date: {new Date(data.endDate).toDateString()}
          </div>

        </div>
        
      </div>

    </div>
  )
}

export default ProjectsCard