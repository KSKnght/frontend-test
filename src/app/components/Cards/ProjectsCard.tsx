'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { MdDesignServices } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { IoEllipsisVerticalSharp } from "react-icons/io5";


import { Separator } from "../UI/separator"
import Popover from "../Submenu/Project_Popover"






const ProjectsCard = ({data}) => {
  const router = useRouter()
  return (
    <div className='mt-4 mb-6 ml-12 w-auto h-64 items-center bg-slate-100 rounded-3xl p-7 shadow-sm border 
                    hover:border-pink-600 hover:border-opacity-50 transition-colors ease-in-out' onClick={(e) => {e.stopPropagation(); e.preventDefault(); router.push('/Projects/'+ data.id+'/view')}}>
      <div className='flex flex-row items-center w-auto justify-between'>
        <h1 className=' w-full text-3xl font-semibold text-pink-600'>
          {data.name}
        </h1>
        <div className='flex flex-row -translate-y-[0.125rem]'>
          <div className='text-xs px-3 py-2 bg-slate-400 rounded-full'>
            <p className='translate-y-1'>{data.progress}</p>
          </div>
          <Popover />
        </div>
      </div>
      
      <Separator className='bg-slate-300 mt-2'/>

      <div className='w-auto flex flex-col mb-1 mt-5 text-slate-600 space-y-[0.125rem]'>
        
        <div className='flex flex-row justify-between'>
          <div className='w-auto flex flex-row'>
            <MdDesignServices className='w-auto h-4 translate-y-[0.25rem]' />
            <p className='font-medium mx-2'>Project Type:</p>
          </div>
          <p className='font-medium mx-2'>{data.type}</p>
        </div>

        <div className='flex flex-row justify-between'>
          <div className='w-auto flex flex-row'>
            <IoPerson className='w-auto h-4 translate-y-[0.25rem]' />
            <p className='font-medium mx-2'>Client Name:</p>
          </div>
          <p className='font-medium mx-2'>{data.client.lastname + ', ' + data.client.firstname + data.client.middlename}</p>
        </div>

        <div className='flex flex-row justify-between'>
          <div className='w-auto flex flex-row'>
            <MdLocationOn className='w-auto h-4 translate-y-[0.25rem]' />
            <p className='font-medium mx-2'>Site Address:</p>
          </div>
          <p className='font-medium mx-2'>{data.projectAddress}</p>
        </div>

        <div className='flex flex-row justify-between'>
          <div className='w-auto flex flex-row'>
            <FaCalendar className='w-auto h-4 translate-y-[0.25rem]' />
            <p className='font-medium mx-2'>Start Date</p>
          </div>
          <p className='font-medium mx-2'>{new Date(data.startDate).toDateString()}</p>
        </div>

        <div className='flex flex-row justify-between'>
          <div className='w-auto flex flex-row'>
            <FaCalendarCheck className='w-auto h-4 translate-y-[0.25rem]' />
            <p className='font-medium mx-2'>End Date</p>
          </div>
          <p className='font-medium mx-2'>{new Date(data.endDate).toDateString()}</p>
        </div>
        
        </div>
    </div>
  )
}

export default ProjectsCard