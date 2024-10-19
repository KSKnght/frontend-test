import React from 'react';
import { getMaterials, getSubcontracts, getTask } from '@/actionsSupabase/read'
import AddMatSub from '../Modals/AddMatSub'

const TaskDetails = async ({data, state, projID}) => {
    const task = await getTask(Number(data));
    const materials = await getMaterials();
    const sucon = await getSubcontracts();
    
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
                    <label className='w-64 h-auto flex rounded-lg pl-1 text-sm'>{task.deadline.toISOString().slice(0,10)}</label>
                </div>
            </div>
        </div>
        <div className='border-l border-slate-400 ml-2 pl-8 h-64 w-64'>
            <AddMatSub data={task.id} state={state} projID={projID} mat={materials} subCon={sucon}/>
        </div>
    </div>
  )
}

export default TaskDetails
