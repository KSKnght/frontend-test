import React  from 'react'
import MatCard from '../Cards/MatCard'
import { addMaterial } from '@/actions/Update'
import { revalidatePath } from 'next/cache'


const MaterialsForm = ({materials, taskID, projID}) => {
    return (
        <form action={async (e) => {'use server'; addMaterial(e, Number(taskID)); revalidatePath('/Project/'+projID+'/view');}}>
            <input id='name' type="text" name='name' placeholder='Material Name'/>
            <input type="number" name='qty' placeholder='qty'/>
            <select name='unit' id='unit'>
                <option id='KG' value="KG">kg</option>
                <option id='PC' value="PC">pc</option>
                <option id='INCH' value="INCH">inch</option>
                <option id='METER' value="METER">meter</option>
            </select>
            <button type='submit'>Add Material</button>
            {/* <input id='unit' type="text" name='unit' placeholder='unit'/> */}
            <div>
                {materials.map((mat, i) => {
                    return <MatCard data={mat} key={i}/>
                })}
            </div>
        </form>
    )
}

export default MaterialsForm