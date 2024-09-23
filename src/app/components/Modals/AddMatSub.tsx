import React, { useState } from 'react'
import MaterialsForm from './MaterialsForm'
import SubForm from './SubForm'
import Link from 'next/link'

const AddMatSub = async ({data, state, projID, subCon, mat}) => {
  return (
    <div>
        <div className='justify-center space-x-5 mb-4 -translate-y-2'>
            <Link className='text-xs text-slate-400 font-bold py-1 px-3 border rounded-lg hover:border-slate-500 hover:text-slate-500' href={'/Projects/'+projID+'/view?viewtask='+data+'&state=Mat'}>Materials</Link>
            <Link className='text-xs text-slate-400 font-bold py-1 px-3 border rounded-lg hover:border-slate-500 hover:text-slate-500' href={'/Projects/'+projID+'/view?viewtask='+data+'&state=Sub'}>Subcontractors</Link>
        </div>
        <div>
            {state === 'Mat' && <MaterialsForm materials={mat} taskID={data} projID={projID}/>}
            {state === 'Sub' && <SubForm subCon={subCon} taskID={data} projID={projID}/>}
        </div>
    </div>
  )
}

export default AddMatSub