'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React from 'react'

const MatList = ({tasks}) => {
  if (tasks.length != 0) return (
    <div>
          <h3>Materials List:</h3>
          {tasks.map((mat, i) => {
            return <li key={i}>{mat.materials.name}</li>
          })}
        </div>
  )
}

const SubConList = ({subcon}) => {
  if (subcon.length != 0) return (
    <div>
      <h3>Subcontractors:</h3>
      {subcon.map((sub, i) => {
        return <li key={i}>{sub.Name}</li>
      })}
    </div>
  )
}


const TaskCard = ({tasks, data}) => {
  const router = useRouter()
  return (
    <div className=' my-2 w-full items-center bg-slate-400 p-3' onClick={() => {router.push('/Projects/'+ data+'/view/?viewtask='+tasks.id)}}>
        <div>
          <div className='flex flex-row'>
            <h1>{tasks.taskName}</h1>
            <button className=' bg-slate-500' onClick={(e) => {e.stopPropagation(); router.push('/Projects/'+ data+'/view/?edittask='+tasks.id)}}>Edit</button>
            {/* <Link href={'/Projects/'+ data+'/view/?edittask='+tasks.id} className=' bg-slate-500'>Edit</Link> */}
          </div>
          <h2>{new Date(tasks.deadline).toDateString()}</h2>
          <p>{tasks.description}</p>
        </div>
        <MatList tasks={tasks.taskMat} />
        <SubConList subcon={tasks.subCon} />
    </div>
  )
}

export default TaskCard