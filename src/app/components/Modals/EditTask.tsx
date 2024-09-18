import { getTask } from '@/actions/read'
import { updateTask } from '@/actions/Update';
import { redirect } from 'next/navigation';
import React from 'react'

const EditTask = async ({data, project}) => {
    const task = await getTask(Number(data));
    return (
        <form action={async e => {'use server'; updateTask(e, task.id, project); redirect('/Projects/' + project + '/view')}}>
            <div>
                <input type="text" name='taskName' placeholder='Task Name' defaultValue={task.taskName}/>
                <textarea className='resize-none' name='description' placeholder='Description' defaultValue={task.description}/>
                <input type="date" name='deadline' defaultValue={task.deadline.toISOString().slice(0,10)}/>
            </div>
            <button type="submit">Update</button>
        </form>
  )
}

export default EditTask
