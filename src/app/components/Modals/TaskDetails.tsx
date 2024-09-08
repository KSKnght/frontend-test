import React from 'react';
import { getTask } from '@/actions/read'

const TaskDetails = async ({data}) => {
    const task = await getTask(Number(data));
  return (
    <div>
        <div>
            <input type="text" name='taskName' placeholder='Task Name' defaultValue={task.taskName}/>
            <textarea className='resize-none' name='description' placeholder='Description' defaultValue={task.description}/>
            <input type="date" name='deadline' defaultValue={task.deadline.toISOString().slice(0,10)}/>
        </div>
        <div>
            <div>
                add Materials
            </div>
            <div>
                add Subcon
            </div>
        </div>
    </div>
  )
}

export default TaskDetails
