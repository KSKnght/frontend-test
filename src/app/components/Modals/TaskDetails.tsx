import React from 'react';
import { getMaterials, getSubcontracts, getTask } from '@/actions/read'
import AddMatSub from '../Modals/AddMatSub'

const TaskDetails = async ({data, state, projID}) => {
    const task = await getTask(Number(data));
    const materials = await getMaterials();
    const sucon = await getSubcontracts();
    
  return (
    <div className='flex flex-row'>
        <div>
            <div className='flex flex-col'>
                <input type="text" name='taskName' placeholder='Task Name' defaultValue={task.taskName}/>
                <textarea className='resize-none' name='description' placeholder='Description' defaultValue={task.description}/>
                <input type="date" name='deadline' defaultValue={task.deadline.toISOString().slice(0,10)}/>
            </div>
        </div>
        <div>
            <AddMatSub data={task.id} state={state} projID={projID} mat={materials} subCon={sucon}/>
        </div>
    </div>
  )
}

export default TaskDetails
