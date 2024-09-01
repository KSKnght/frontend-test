import React from 'react'
import TaskCard from './TaskCard'
import Link from 'next/link'

const PhaseCard = ({Phase}) => {
  return (
    <div className='phaseCard p-2 bg-slate-200 m-2'>
        <div>
          <div className='flex flex-row'>
            <h1>{Phase.phaseName}</h1>
            <Link href={'/Projects/'+Phase.projectID+'/view?phase='+Phase.id}>Add Task</Link>
          </div>
          <div>
            <h2>{Phase.progress}</h2>
          </div>
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