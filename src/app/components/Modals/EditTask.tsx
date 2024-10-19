import { getTask } from '@/actionsSupabase/read'
import { updateTask } from '@/actionsSupabase/Update';
import { redirect } from 'next/navigation';
import React from 'react'

const EditTask = async ({data, project}) => {
    const task = await getTask(Number(data));
    return (
        <form action={async e => {'use server'; updateTask(e, task.id, project); redirect('/Projects/' + project + '/view')}}>
            <div className='flex flex-row justify-evenly space-x-3'>
                <div>
                    <p className='text-xs font-bold flex mb-1'>Task Name</p>
                    <input className='w-64 flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                           type="text" name='taskName' placeholder='Task Name' defaultValue={task.taskName}/>
                </div>
                <div>
                    <p className='text-xs font-bold flex mb-1'>Deadline</p>
                    <input className='w-30 flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                           type="date" name='deadline' defaultValue={new Date(task.deadline).toISOString().slice(0,10)}/>
                </div>
            </div>
            <div>
                <div className='mt-3'>
                    <p className='text-xs font-bold flex mb-1'>Description</p>
                    <textarea className='resize-none w-full flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm h-20'
                              name='description' placeholder='Description' defaultValue={task.description}/>
                </div>
            </div>

            <button className='mt-8 text-sm px-4 py-1 bg-pink-600 rounded-lg text-white' type="submit">Update</button>
        </form>
  )
}

export default EditTask
