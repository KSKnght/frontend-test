'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React from 'react'
import { MdEdit } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { MdDelete } from "react-icons/md";




const MatList = ({tasks}) => {
  if (tasks.length != 0) return (
    <div>
          <h3 className='mt-3 text-xs font-bold'>Materials List</h3>
          {tasks.map((mat, i) => {
            return <li className='text-xs'
            key={i}>{mat.materials.name + ' ' + mat.qty + ' ' + mat.unit}</li>
          })}
        </div>
  )
}

const SubConList = ({subcon}) => {
  if (subcon.length != 0) return (
    <div>
      <h3 className='mt-3 text-xs font-bold'>Subcontractors</h3>
      {subcon.map((sub, i) => {
        return <li className='text-xs' key={i}>{sub.B.Name}</li>
      })}
    </div>
  )
}


const TaskCard = ({tasks, data}) => {
  const router = useRouter()
  return (
    <div className='my-3 w-full items-center bg-slate-300 rounded-md p-3 cursor-pointer border border-slate-300 hover:border-pink-600 transition-colors' onClick={() => {router.push('/Projects/'+ data+'/view/?viewtask='+tasks.id+'&state=Mat')}}>
        <div>
          <div className='flex flex-row justify-between'>
            <h1 className='font-bold text-slate-800 leading-tight'>{tasks.taskName}</h1>
            <div className='flex flex-row justify-between -translate-y-1 translate-x-2 -space-x-[5px]'>
              <button className='text-slate-600 w-6 h-6 hover:text-pink-600 transition-colors' onClick={(e) => {e.stopPropagation(); router.push('/Projects/'+ data+'/view/?edittask='+tasks.id)}}>
                <MdEdit />
              </button>
              <button className='text-slate-600 w-6 h-6 hover:text-pink-600 transition-colors' onClick={(e) => {e.stopPropagation()}}>
                <MdDelete />
              </button>
            </div>
            {/* <Link href={'/Projects/'+ data+'/view/?edittask='+tasks.id} className=' bg-slate-500'>Edit</Link> */}
          </div>
          
          <h2 className='flex flex-row text-sm text-slate-600'>
            <IoTime className='mt-1 mr-1 w-3 h-3'/>
            {new Date(tasks.deadline).toDateString()}
          </h2>
          
          <div className='mt-4 border-t border-slate-400'>
            <p className='mt-2 text-xs font-bold'>Description</p>
            <p className='text-xs'>{tasks.description}</p>
          </div>
          
        </div>
        <MatList tasks={tasks.taskMat} />
        <SubConList subcon={tasks._phaseTasksTosubCon} />
    </div>
  )
}

export default TaskCard