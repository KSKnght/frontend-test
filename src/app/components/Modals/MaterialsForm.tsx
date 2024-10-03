import React  from 'react'
import MatCard from '../Cards/MatCard'
import { addMaterial } from '@/actions/Update'
import { revalidatePath } from 'next/cache'


const MaterialsForm = ({materials, taskID, projID}) => {
    return (
        <form action={async (e) => {'use server'; addMaterial(e, Number(taskID)); revalidatePath('/Project/'+projID+'/view');}}>
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
            <div>
                <p className='flex font-bold text-xs'>Select Material</p>
                {materials.map((mat, i) => {
                    return <MatCard data={mat} key={i}/>
                })}
            </div>
        </form>
    )
}

export default MaterialsForm