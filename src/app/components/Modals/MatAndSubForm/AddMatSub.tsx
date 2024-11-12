import React, { useState } from 'react'
import MaterialsForm from './MaterialsForm'
import SubForm from './SubForm'
import Link from 'next/link'

const MatList = ({tasks}) => {
  if (tasks.length != 0) return (
    <div>
          <h3 className='mt-3 text-xs font-bold'>Materials List</h3>
          <div className=' h-24 overflow-scroll'>
              {tasks.map((mat, i) => {
              return <li className='text-xs text-left'
              key={i}>{mat.materials.name + ' ' + mat.qty + ' ' + mat.unit}</li>
              })}
          </div>
        </div>
  )
}

const SubConList = ({subcon}) => {
  if (subcon.length != 0) return (
    <div>
      <h3 className='mt-3 text-xs font-bold'>Subcontractors</h3>
      <div className=' h-24 overflow-scroll'>
          {subcon.map((sub, i) => {
          return <li className='text-xs' key={i}>{sub.B.Name}</li>
          })}
      </div>
    </div>
  )
}

const AddMatSub = async ({data, state, projID, subCon, mat, status, matUsed, subUsed}) => {
  return (
    <div>
        <div className='justify-center space-x-5 mb-4 -translate-y-2'>
            <Link className='text-xs text-slate-400 font-bold py-1 px-3 border rounded-lg hover:border-slate-500 hover:text-slate-500' href={'/Projects/'+projID+'/view?viewtask='+data+'&state=Mat'}>Materials</Link>
            <Link className='text-xs text-slate-400 font-bold py-1 px-3 border rounded-lg hover:border-slate-500 hover:text-slate-500' href={'/Projects/'+projID+'/view?viewtask='+data+'&state=Sub'}>Subcontractors</Link>
        </div>
        {status != 'COMPLETED' ? 
        <div>
            {state === 'Mat' && <MaterialsForm materials={mat} taskID={data} projID={projID}/>}
            {state === 'Sub' && <SubForm subCon={subCon} taskID={data} projID={projID}/>}
        </div> 
        : 
        <div>
          {state === 'Mat' && <MatList tasks={matUsed} />}
          {state === 'Sub' && <SubConList subcon={subUsed} />}
        </div>
        }
    </div>
  )
}

export default AddMatSub