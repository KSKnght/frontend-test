import React from 'react';
import { getMaterials, getSubcontracts, getTask, getUnselectedMat, getUnselectedSub } from '@/actionsSupabase/read'
import AddMatSub from './AddMatSub'

const MatList = ({tasks}) => {
    if (tasks.length != 0) return (
      <div>
            <h3 className='mt-3 text-xs font-bold'>Materials List</h3>
            <div className=' h-24 overflow-scroll'>
                {tasks.map((mat, i) => {
                return <li className='text-xs text-left'
                key={i}>{mat.materials.name + ' ' + mat.qty + ' ' + mat.unit}</li>
                })}
            </div>
          </div>
    )
  }
  
  const SubConList = ({subcon}) => {
    if (subcon.length != 0) return (
      <div>
        <h3 className='mt-3 text-xs font-bold'>Subcontractors</h3>
        <div className=' h-24 overflow-scroll'>
            {subcon.map((sub, i) => {
            return <li className='text-xs' key={i}>{sub.B.Name}</li>
            })}
        </div>
      </div>
    )
  }

const TaskDetails = async ({data, state, projID}) => {
    const task = await getTask(Number(data));
    const materialsUnselected = await getUnselectedMat(data);
    const sucon = await getUnselectedSub(data);
    
    console.log(task);

  return (
    <div className='flex flex-row'>
        <div>
            <div className='flex flex-col'>
                <div>
                    <p className='text-xs font-bold flex mb-1'>Task Name</p>
                    <label className='w-64 flex rounded-lg pl-1 text-sm'>{task.taskName}</label>
                </div>
                <div className='mt-3'>
                    <p className='text-xs font-bold flex mb-1' >Description</p>
                    <label className='w-64 h-auto flex rounded-lg pl-1 text-sm text-left'>{task.description}</label>
                </div>
                <div className='mt-3'>
                    <p className='text-xs font-bold flex mb-1'>Deadline</p>
                    <label className='w-64 h-auto flex rounded-lg pl-1 text-sm'>{new Date(task.deadline).toISOString().slice(0,10)}</label>
                </div>
            </div>
            {task.status != 'COMPLETED' ? 
            <div>
            {state === 'Mat' && <MatList tasks={task.taskMat} />}
            {state === 'Sub' && <SubConList subcon={task._phaseTasksTosubCon} />}
            </div> : <div className=' items-center text-center'>
            <p className=' w-48 text-center'>Note: you can no longer edit when task is complete</p>
            </div>}
            
        </div>

        <div className='border-l border-slate-400 ml-2 pl-8 h-64 w-64'>
            <AddMatSub mat={materialsUnselected ?? []} data={task.id} state={state} projID={projID} subCon={sucon} status={task.status} matUsed={task.taskMat} subUsed={task._phaseTasksTosubCon}/>
        </div>
    </div>
  )
}

export default TaskDetails
