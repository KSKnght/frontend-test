import React, { useState } from 'react'
import MaterialsForm from './MaterialsForm'
import SubForm from './SubForm'
import Link from 'next/link'

const AddMatSub = async ({data, state, projID, subCon, mat}) => {
  return (
    <div>
        <div>
            <Link href={'/Projects/'+projID+'/view?viewtask='+data+'&state=Mat'}>Mat</Link>
            <Link href={'/Projects/'+projID+'/view?viewtask='+data+'&state=Sub'}>Sub</Link>
        </div>
        <div>
            {state === 'Mat' && <MaterialsForm materials={mat} taskID={data} projID={projID}/>}
            {state === 'Sub' && <SubForm subCon={subCon} taskID={data} projID={projID}/>}
        </div>
    </div>
  )
}

export default AddMatSub