import { addPhase } from '@/actions/Create'
import React from 'react'


const AddPhase = async ({data}) => {
    console.log(data)
  return (
    <form action={async e => {'use server'; await addPhase(e, data)}}>
        <div className='flex flex-row space-x-4'>
            <div>
              <p className='text-slate-700 flex'>Phase Name</p>
              <input className='border rounded-md pl-2 focus:outline-pink-600' type="text" name='phaseName' placeholder=''/>
            </div>
            
            <div>
              <p className='text-slate-700 flex'>Priority Number</p>
              <input className='border rounded-md pl-2 focus:outline-pink-600' type="number" name='priority' defaultValue={0} />
            </div>
            
        </div>
        <button className='mt-6 bg-pink-600 px-3 py-1 text-white rounded-md' type="submit">Submit</button>
    </form>
  )
}

export default AddPhase