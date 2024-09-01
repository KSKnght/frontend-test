import { addPhase } from '@/actions/Create'
import React from 'react'

const AddPhase = async ({data}) => {
    console.log(data)
  return (
    <form action={async e => {'use server'; await addPhase(e, data)}}>
        <div>
            <input type="number" name='priority' defaultValue={0} />
            <input type="text" name='phaseName' placeholder='Phase Name'/>
            {/* <textarea className=' resize-none' name='phaseName' placeholder='Phase Name'/> */}
        </div>
        <button type="submit">Submit</button>
    </form>
  )
}

export default AddPhase