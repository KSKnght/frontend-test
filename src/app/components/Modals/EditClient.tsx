import { revalidatePath } from 'next/cache';
import { updateClient } from '@/actionsSupabase/Update';
import { showClient } from '@/actionsSupabase/read';
import React from 'react'

const EditClient = async ({data}) => {
  const client = await showClient(Number(data));
  return (
    <form action={async (e) =>{'use server'; updateClient(e, client.id); revalidatePath('/Clients')}}>
      
      <div className='flex flex-row justify-evenly space-x-3'>
        <div>
          <p className='text-xs font-bold flex mb-1'>First Name</p>
          <input className='h-6 w-full flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                type="text" name='firstname' placeholder='' defaultValue={client.firstname}/>
        </div>
        <div>
          <p className='text-xs font-bold flex mb-1'>Middle Name</p>
          <input className='h-6 w-full flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                type="text" name='middlename' placeholder='' defaultValue={client.middlename}/>
        </div>
        <div>
          <p className='text-xs font-bold flex mb-1'>Last Name</p>
          <input className='h-6 w-full flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                type="text" name='lastname' placeholder='' defaultValue={client.lastname}/>
        </div>
      </div>

      <div className='flex flex-row justify-between space-x-3 mt-3'>
        <div>
          <p className='text-xs font-bold flex mb-1'>Contact Number</p>
          <input className='h-6 w-72 flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                type="text" name='contactNum' placeholder='' defaultValue={client.contactNum}/>
        </div>
        <div>
          <p className='text-xs font-bold flex mb-1'>Email Address</p>
          <input className='h-6 w-72 flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                type="text" name='emailAdd' placeholder='' defaultValue={client.emailAdd}/>        
        </div>
      </div>
      
      <button className='mt-8 text-sm px-4 py-1 bg-pink-600 rounded-lg text-white' type='submit'>Save Changes</button>
    </form>
  )
}

export default EditClient