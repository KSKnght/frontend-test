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
import Button from './Button';
import Alert from "./Submenu/Project_CancelAlert"


const statusColors = {
  NOT_STARTED: 'bg-slate-500',
  IN_PROGRESS: 'bg-amber-500',
  COMPLETE: 'bg-green-500',
  OVERDUE: 'bg-red-500'
};

const ProjectsSidebar = ({project, currPage, id} : {project: any, currPage: boolean, id : Number}) => {
  const router = useRouter();
  const currentDate = new Date();
  const startDate = new Date(project.startDate);
  const hasStarted = currentDate >= startDate;


  return (
    <div className='h-full fixed z-[2]'>
      <div className='h-full flex-col bg-white border-r w-80 px-3 py-2'>


            <div className='mt-3 flex flex-row'>
              <Link className='space-x-1 align-middle flex flex-row mb-6 ml-1 p-1 bg-slate-50 hover:bg-slate-100 ease-out rounded-lg' href={'/Projects'}>
                <BsArrowLeftShort />
                <p className='text-sm'>Back to Projects</p>
              </Link>
            </div>

            {/* <div className='mt-2 flex flex-row'>
              <button className='mb-6 ml-1 px-1.5 py-1.5 bg-slate-50 hover:bg-slate-100 ease-out rounded-lg'
                      onClick={() => {router.back()}}>
                <BsArrowLeftShort />
              </button>
            </div> */}

            
            <div className={`mt-4 mb-2 ml-3 text-xs px-2 py-1 rounded-xl w-[8rem] text-center transition-colors duration-500 ${statusColors[project.progress]}`}>
              <h2 className='text-white font-semibold'>{project.progress}</h2>
            </div>            
            <div className='ml-4 mt-2 font-bold text-2xl text-slate-700'>
              <h1>{project.name}</h1>
            </div>
            <div className='text-sm text-slate-500 ml-4 mt-2'>
              <p>
                {new Date(project.startDate).toLocaleDateString('en-US', {
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric',
                })}                
                -
                {new Date(project.endDate).toLocaleDateString('en-US', {
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric',
                })}                
              </p>
            </div>

            
            <div className='ml-4 mt-6 text-md text-slate-700'>    
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
            </div>
            <div className='ml-4 mt-[16rem] flex flex-col gap-3'>
              { currPage == false && 
                  <button onClick={() => {router.push('materials')}} className='bg-slate-100 rounded-lg text-sm w-[16rem] py-3 text-center hover:bg-slate-200 transition-colors'>View All Materials</button>
              } 
              { currPage == true && 
                  <button onClick={() => {router.push('view')}} className='bg-slate-100 rounded-lg text-sm w-[16rem] py-3 text-center hover:bg-slate-200 transition-colors'>View All Tasks</button>
              } 
              
              {hasStarted ? (
                <Link
                  className="bg-slate-100 rounded-lg text-sm w-[16rem] py-3 text-center hover:bg-slate-200 transition-colors"
                  href={`/Projects/${project.id}/view?extProj=true`}
                >
                  Extend Project
                </Link>
              ) : (
                <Link
                  className="bg-slate-100 rounded-lg text-sm w-[16rem] py-3 text-center hover:bg-slate-200 transition-colors"
                  href={`/Projects/${project.id}/view?movProj=true`}
                >
                  Move Project
                </Link>
              )}          
          <Alert id={id}/>

            </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default ProjectsSidebar