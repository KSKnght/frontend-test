'use client';

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
    <div className=' my-2 w-full items-center bg-slate-400 p-3' onClick={() => {router.push('/Projects/'+ data+'/view/?task='+tasks.id)}}>
        <div>
          <h1>{tasks.taskName}</h1>
          <h2>{new Date(tasks.deadline).toDateString()}</h2>
          <p>{tasks.description}</p>
        </div>
        <MatList tasks={tasks.taskMat} />
        <SubConList subcon={tasks.subCon} />
    </div>
  )
}

export default TaskCard