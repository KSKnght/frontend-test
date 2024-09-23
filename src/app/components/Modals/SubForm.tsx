import { addSubCom } from '@/actions/Update';
import { revalidatePath } from 'next/cache';
import SubConCard from '../Cards/SubConCard'
import React from 'react'

const SubForm = ({subCon, taskID, projID}) => {
  return (
    <form action={async (e) => {'use server'; addSubCom(e, Number(taskID)); revalidatePath('/Project/'+projID+'/view');}}>
        <div>
          <p className='flex text-xs font-bold mb-1'>Subcontractor Name</p>
          <input className='w-full flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                 id='clientName' type="text" placeholder='' name='name'/>
        </div>
        <button className='mt-5 text-sm px-4 py-1 bg-pink-600 rounded-lg text-white' 
                type='submit'>Add Subcontractor</button>
        <div className='mt-3'>
          <p className='flex font-bold text-xs'>Select Subcontractor</p>
          <div className='overflow-y-auto h-24 mt-1'>
            {subCon.map((sub, i) => {
              return <SubConCard data={sub} key={i}/>
            })}
          </div>
        </div>
    </form>
  )
}

export default SubForm