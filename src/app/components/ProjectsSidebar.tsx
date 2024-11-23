'use client';

import Link from 'next/link'
import React, { startTransition } from 'react'
import { BsArrowLeftShort } from "react-icons/bs";
import { MdDesignServices } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { HiDocumentText } from "react-icons/hi2";
import { RiProgress2Fill } from "react-icons/ri";
import { IoCalendarClear } from "react-icons/io5";
import { redirect, useRouter } from 'next/navigation';




const ProjectsSidebar = ({project, currPage, id} : {project: any, currPage: boolean, id : Number}) => {
  const router = useRouter();

  return (
    <div className='h-full fixed z-[2]'>
      <div className='h-full flex-col bg-white border-r w-80 px-3 py-2'>


            <div className='mt-2 flex flex-row'>
              <Link className='mb-6 ml-1 px-1.5 py-1.5 bg-slate-50 hover:bg-slate-100 ease-out rounded-lg' href={'/Projects'}>
                <BsArrowLeftShort />
              </Link>
            </div>

            <div className='ml-4 mt-6 font-bold text-xl text-slate-700'>
              <h1>Project Information</h1>
            </div>
            <div className='ml-4 mt-6 text-md text-slate-700'>    
              <p className='font-semibold flex flex-row'>
                <HiDocumentText className='mt-1 mr-1'/>
                Project Name
                </p>
              <p className='mb-3 text-slate-500'>{project.name}</p>
              <p className='font-semibold flex flex-row'>
                <MdDesignServices className='mt-1 mr-1'/>
                Project Type
              </p>
              <p className='mb-3 text-slate-500'>{project.type}</p>
              <p className='font-semibold flex flex-row'>
                <IoPerson className='mt-1 mr-1'/>
                Client Name
              </p>
              <p className='mb-3 text-slate-500'>{project.client.lastname + ', ' + project.client.firstname + ' ' + project.client.middlename}</p>
              <p className='font-semibold flex flex-row'>
                <MdLocationOn className='mt-1 mr-1'/>
                Project Address
              </p>
              <p className='mb-3 text-slate-500'>{project.projectAddress}</p>
              <p className='font-semibold flex flex-row'>
                <RiProgress2Fill className='mt-1 mr-1'/>
                Progress
              </p>
              <p className='mb-3 text-slate-500'>{project.progress}</p>
              <p className='font-semibold flex flex-row'>
                <IoCalendarClear className='mt-1 mr-1'/>
                Date
              </p>
              <p className='text-slate-500'>
                Start: {new Date(project.startDate).toUTCString().slice(0,16)}
              </p>
              <p className='text-slate-500'>
                End: {new Date(project.endDate).toUTCString().slice(0,16)}
              </p>
            </div>
            <div className='ml-4 mt-[8rem] flex flex-col gap-3'>
              { currPage == false && 
                  <button onClick={() => {router.push('materials')}} className='bg-slate-100 rounded-lg text-sm w-[16rem] py-3 text-left pl-6 hover:bg-slate-200 transition-colors'>View All Materials</button>
              } 
              { currPage == true && 
                  <button onClick={() => {router.push('view')}} className='bg-slate-100 rounded-lg text-sm w-[16rem] py-3 text-left pl-6 hover:bg-slate-200 transition-colors'>View All Tasks</button>
              } 
              <button className='bg-slate-100 rounded-lg text-sm w-[16rem] py-3 text-left pl-6 hover:bg-slate-200 transition-colors'>Extend Project Duration</button>
              <button className='bg-slate-100 rounded-lg text-sm w-[16rem] py-3 text-left pl-6 hover:bg-red-500 hover:text-white transition-colors'>Cancel Project</button>
            </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default ProjectsSidebar