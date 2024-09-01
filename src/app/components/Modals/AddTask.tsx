import { createTask } from '@/actions/Create';
import React from 'react'

const AddTask = async ({data}) => {
    return (
        <form action={async e => {'use server'; await createTask(e, data)}}>
        <div>
            <input type="number" name='priority' defaultValue={0} />
            <input type="text" name='taskName' placeholder='Task Name'/>
            <textarea className='resize-none' name='description' placeholder='Description'/>
            <input type="date" name='deadline'/>
        </div>
        <button type="submit">Submit</button>
    </form>
    )
  }

export default AddTask