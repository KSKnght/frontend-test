import React  from 'react'
import MatCard from '../../Cards/MatCard'
import { addMaterial } from '@/actionsSupabase/Update'
import { revalidatePath } from 'next/cache'

const MaterialsForm = async ({materials, taskID, projID}) => {
    return (
        <form action={async (e) => {'use server'; await addMaterial(e, Number(taskID)); revalidatePath('/Projects/'+projID+'/view'); revalidatePath('/Projects/'+projID+'/view?viewtask=' + taskID + '&state=Mat')}}>
            <div>
                <p className='flex text-xs font-bold'>Material Name</p>
                <input className='mt-1 w-full flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                       id='name' type="text" name='name' placeholder=''/>
            </div>
            <div className='flex flex-row justify-evenly space-x-2 mt-3'> 
                <div>
                    <p className='flex text-xs font-bold'>Quantity</p>
                    <input className='mt-1 w-full flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm' 
                           type="number" name='qty' placeholder=''/>
                </div>
                <div>
                    <p className='flex text-xs font-bold'>Unit</p>
                    <select className='mt-1 w-full flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                            name='unit' id='unit'>
                                <option id='KG' value="KG">kg</option>
                                <option id='PC' value="PC">pc</option>
                                <option id='INCH' value="INCH">inch</option>
                                <option id='METER' value="METER">meter</option>
                    </select>
                </div>
            </div>
            <button  className='mt-5 text-sm px-4 py-1 bg-pink-600 rounded-lg text-white mb-3' type='submit'>Add Material</button>
            {/* <input id='unit' type="text" name='unit' placeholder='unit'/> */}
            <div className='mt-4'>
                <p className='flex font-bold text-xs mb-2'>Select Material</p>
                <div className="relative bg-slate-300 h-[10.7rem]">
                    <div className='h-[10.7rem] overflow-y-scroll'>
                        {materials.length === 0 ? (
                            <div className="relative h-[10.7rem] flex items-center justify-center">
                                <p className="text-xs text-gray-500 italic">All materials have been assigned already.</p>
                            </div>
                        ) : materials.map((mat, i) => {
                        return <MatCard data={mat} key={i}/>
                        })}
                    </div>
                </div>
            </div>
        </form>
    )
}

export default MaterialsForm