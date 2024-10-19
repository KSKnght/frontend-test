import { addPhase } from '@/actionsSupabase/Create'
import React from 'react'


const AddPhase = async ({data}) => {
    console.log(data)
  return (
    <form action={async e => {'use server'; await addPhase(e, data)}}>
        <div className='flex flex-row space-x-4'>
            <div>
              <p className='text-slate-700 flex text-xs font-bold mb-1'>Phase Name</p>
              <input className='border rounded-md pl-2 focus:outline-pink-600' type="text" name='phaseName' placeholder=''/>
            </div>
            
            <div>
              <p className='text-slate-700 flex text-xs font-bold mb-1'>Priority</p>
              <input className=' w-16 border rounded-md pl-2 focus:outline-pink-600' type="number" name='priority' defaultValue={0} />
            </div>
            
        </div>
        <button className='mt-8 text-sm px-4 py-1 bg-pink-600 rounded-lg text-white' type="submit">Submit</button>
    </form>
  )
}

export default AddPhase