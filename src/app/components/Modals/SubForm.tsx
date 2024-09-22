import { addSubCom } from '@/actions/Update';
import { revalidatePath } from 'next/cache';
import SubConCard from '../Cards/SubConCard'
import React from 'react'

const SubForm = ({subCon, taskID, projID}) => {
  return (
    <form action={async (e) => {'use server'; addSubCom(e, Number(taskID)); revalidatePath('/Project/'+projID+'/view');}}>
        <input id='clientName' type="text" placeholder='name' name='name'/>
        <button type='submit'>add Subcontract</button>
        <div>
          {subCon.map((sub, i) => {
            return <SubConCard data={sub} key={i}/>
          })}
        </div>
    </form>
  )
}

export default SubForm