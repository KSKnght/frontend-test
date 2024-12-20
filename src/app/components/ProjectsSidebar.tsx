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
import Alert from "./Submenu/LargeP_CancelAlert"
import Restore from "./Submenu/LargeP_RestoreAlert"


const statusColors = {
  NOT_STARTED: 'bg-slate-500',
  IN_PROGRESS: 'bg-amber-500',
  COMPLETE: 'bg-green-500',
  OVERDUE: 'bg-red-500',
  CANCELLED: 'bg-red-800'
};

const ProjectsSidebar = ({project, currPage, id} : {project: any, currPage: boolean, id : Number}) => {
  const router = useRouter();
  const hasStarted = project.progress;
  const isDisabled = project.progress === 'CANCELLED' || project.isArchived === true;
  const isCancelled = project.progress
  const Archived = project.isArchived


  return (
    <div className='h-full fixed z-[50]'>
      <div className='h-full flex-col bg-white border-r w-80 px-3 py-2'>


            <div className='mt-3 flex flex-row'>
              <Link className='space-x-1 align-middle flex flex-row mb-6 ml-1 p-1 bg-slate-50 hover:bg-slate-100 ease-out rounded-lg' href={'/Projects'}>
                <BsArrowLeftShort />
                <p className='text-sm'>Back to Projects</p>
              </Link>
            </div>

            
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

            <div className='ml-4 text-xs italic'>
              {project.progress === 'CANCELLED' ? (
                <span className='text-red-500'>
                  You cannot edit anymore the phases and tasks because
                  the project is cancelled.
                </span>
              ): project.isArchived === true ? (
                <span className='text-red-500'>
                  You cannot edit anymore the phases and tasks because
                  the project is archived. Restore the project from the
                  Archive Projects page.
                </span>
              ) : null}
            </div>


            

            <div className='ml-4 mt-[6rem] flex flex-col gap-3'>
              
              <button
                className='rounded-lg text-sm w-[16rem] py-3 text-center transition-colors bg-slate-100 hover:bg-slate-200'
                onClick={() => {router.push('log')}}
              >
                Activity Log
              </button>

              { currPage == false && 
                  <button onClick={() => {router.push('materials')}} className='bg-slate-100 rounded-lg text-sm w-[16rem] py-3 text-center hover:bg-slate-200 transition-colors'>View All Materials</button>
              } 
              { currPage == true && 
                  <button onClick={() => {router.push('view')}} className='bg-slate-100 rounded-lg text-sm w-[16rem] py-3 text-center hover:bg-slate-200 transition-colors'>View All Tasks</button>
              } 
              
              <button
                disabled={isDisabled}
                onClick={() => {
                  hasStarted == 'IN_PROGRESS'
                    ? router.push(`/Projects/${project.id}/view?extProj=` + project.id)
                    : router.push(`/Projects/${project.id}/view?movProj=` + project.id);
                }}
                className={`rounded-lg text-sm w-[16rem] py-3 text-center transition-colors ${
                  isDisabled
                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                    : 'bg-slate-100 hover:bg-slate-200'
                }`}
              >
                {hasStarted ? 'Extend Project' : 'Move Project'}
              </button>

              {Archived == true ? <Restore id={id}/> : '' }
              {isCancelled == 'CANCELLED' ? '' : <Alert id={id}/> }

            </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default ProjectsSidebar