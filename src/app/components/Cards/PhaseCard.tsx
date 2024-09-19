import React from 'react'
import TaskCard from './TaskCard'
import Link from 'next/link'
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";

const PhaseCard = ({Phase}) => {
  return (
    <div className='h-auto w-64 rounded-lg bg-slate-100 ml-5 mt-2 mb-auto p-4 shadow-sm border'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row justify-between'>
            <h1 className='mt-1 text-xl font-semibold text-pink-600'>{Phase.phaseName}</h1>
          </div>
        <div className='flex flex-row text-slate-600'>
            <Link href={'/Projects/'+Phase.projectID+'/view?phase='+Phase.id}>
              <IoIosAddCircle className='w-6 h-6 mx-1 text-slate-600 hover:text-pink-600 transition-colors ease-out'/>
            </Link>
            <MdEdit className='w-6 h-6 text-slate-600 hover:text-pink-600 transition-colors ease-out'/>
        </div>
        </div>

        <div className='mt-2 mb-8'>
          <h2>{Phase.progress}</h2>
        </div>
        {
            Phase.phaseTasks.map((task, i) => {
              return <TaskCard tasks={task} data={Phase.projectID} key={i}/>
            })
        }
    </div>
  )
}

export default PhaseCard