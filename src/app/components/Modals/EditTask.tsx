import { getTask } from '@/actions/read'
import React from 'react'

const EditTask = async ({data}) => {
    const task = await getTask(Number(data));
    console.log(task.deadline.toISOString().slice(0,10))
    return (
        <form action={async e => {'use server';}}>
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
