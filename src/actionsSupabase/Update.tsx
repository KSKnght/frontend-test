'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";


export async function updateProject(FormData : FormData, id: number) {
    const { data, error } = await supabase
    .from('project')
    .update({
        name: FormData.get('name'),
        type: FormData.get('type'),
        projectAddress: FormData.get('address'),
        clientID: Number(FormData.get('id')) // Assuming you have a client_id column
    })
    .eq('id', id);

    if (error) {
    console.error('Error updating project:', error);
    return {success : false}
    } else {
    console.log('Project updated successfully:', data);
    return {success : true}
    }
    revalidatePath('/Projects');
    redirect('/Projects');
};


export async function updateTask(FormData : FormData, id: number, projID: number) {
    try {
        const { data, error } = await supabase
        .from('phaseTasks') // Make sure to match your table name
        .update({
            taskName: FormData.get('taskname'),
            description: FormData.get('description'),
            deadline: new Date(FormData.get('deadline') + 'T00:00:00.000Z'),
        })
        .eq('id', id);

        if (error) {
            console.error('Error updating phase task:', error);
            throw error
        } else {
            console.log('Phase task updated successfully:', data);
            revalidatePath('/Projects/' + projID + '/view');
            return {success: true}
        }

    } catch (err) {
        return { success: false, message: err.message };
    }

    
    redirect('/Projects/' + projID + '/view')
};


export async function addMaterial(FormData : FormData, taskID : number) {
    const { data: materialData, error: materialError } = await supabase
  .from('materials')
  .select('*')
  .eq('name', FormData.get('name'))
  .single();

let materialID;

if (materialError) {
  // Create the material if it doesn't exist
  const { data: newMaterial, error: newMaterialError } = await supabase
        .from('materials')
        .insert([
        {
            name: FormData.get('name'),
            unit: FormData.get('unit'),
        },
        ])
        .select();

    if (newMaterialError) {
        console.error(newMaterialError);
    } else {
        materialID = newMaterial[0].id;
    }
} else {
    materialID = materialData.id;
}

    // Create the taskMat entry
    const { error: taskMatError } = await supabase
    .from('taskMat')
    .insert([
        {
        taskId: taskID, // Replace with the correct foreign key if needed
        qty: Number(FormData.get('qty')),
        unit: FormData.get('unit'),
        matId: materialID, // Assuming there's a foreign key relationship
        },
    ]);

    if (taskMatError) {
    console.error(taskMatError);
    }
}

export async function addSubCom(FormData : FormData, taskID : number) {
    let subCon
    
    const {data: checkSubcon , error } = await supabase
    .from('subCon')
    .select('*')
    .eq('Name', FormData.get('name'));

    console.log(checkSubcon)

    if (checkSubcon.length == 0) {
        const {data: newSubCon, error: erNewSubCon} = await supabase
        .from('subCon')
        .insert({
            Name: FormData.get('name')
        })
        .select();

        if (erNewSubCon) {
            console.log(erNewSubCon)
        } else {
            subCon = newSubCon[0]
        }
        
    } else (
        subCon = checkSubcon[0]
    )


    const { error: connectData} = await supabase
    .from('_phaseTasksTosubCon')
    .insert({
        A: taskID,
        B: subCon.id
    })

    if (connectData) { 
        console.log(connectData)
    }
}

export async function updateClient(FormData : FormData, id: number) {
    var errorCheck = false
    const { error } = await supabase
    .from('client')
    .update({
        lastname: FormData.get('lastname'),
        firstname: FormData.get('firstname'),
        middlename: FormData.get('middlename'),
        contactNum: FormData.get('contactNum'),
        emailAdd: FormData.get('emailAdd')
    })
    .eq('id', id);
    try {
        if (error) {
            console.error('Error updating client:', error);
            throw error;
        } else {
            console.log('Client updated!');
            
            return {success: true}
        }
    } catch (err) {
        return { success: false, message: err.message, code: err.code };
    }

    if (errorCheck === false) {
        // revalidatePath('/Clients');
        // redirect('/Clients');
        return { success: true, message: 'successfully added client!'};
    }
    
    revalidatePath('/Clients')
    redirect('/Clients')
}

export async function updatePhaseName(id: number, name: string) {
    try {
        const { error } = await supabase
        .from('phase')
        .update({
            phaseName: name
        })
        .eq('id', id);
    
        if (error) {
            console.error('Error updating phase name:', error);
            throw error;
        } else {
            console.log('Phase name updated!');
            return {success: true}
        }
    } catch (error) {
        return {success: false, error: error.message}
    }

    
}

export async function cancelProject(id: number) {
    const { error } = await supabase
    .from('project')
    .update({
        progress: 'CANCELLED'
    })
    .eq('id', id);

    if (error){
        console.log('error cancelling project:', error)
    } else {
        console.log('project cancelled')
    }
}

export async function moveProjectDate(FormData : FormData, id: number) {
    const { error } = await supabase
    .from('project')
    .update({
        startDate: new Date(FormData.get('startDate') + 'T00:00:00.000Z'),
        endDate: new Date(FormData.get('endDate') + 'T00:00:00.000Z'),
    })
    .eq('id', id);

    if (error){
        console.log('error moving project dates:', error)
        return {success: false}
    } else {
        console.log('project has been moved')
        return {success: true}
    }
}

export async function extendProjectEndDate(FormData: FormData, id : number) {
    const { error } = await supabase
    .from('project')
    .update({
        endDate: new Date(FormData.get('endDate') + 'T00:00:00.000Z'),
    })
    .eq('id', id);

    if (error){
        console.log('error moving project endDate:', error)
    } else {
        console.log('project end Date has been extended')
    }
}

export async function archiveProject(id: number) {
    const { error } = await supabase
    .from('project')
    .update({
        isArchived: true
    })
    .eq('id', id);

    if (error){
        console.log('error moving project to archive:', error)
    } else {
        console.log('project moved to archive')
    }
}

export async function unarchiveProject(id: number) {
    const { error } = await supabase
    .from('project')
    .update({
        isArchived: false
    })
    .eq('id', id);

    if (error){
        console.log('error moving project to archive:', error)
    } else {
        console.log('project moved to archive')
    }
}

export async function movePriority(id: number, priority: number) {
    const { error } = await supabase
    .from('phase')
    .update({
        priority: priority
    })
    .eq('id', id);
    if (error){
        console.log('error moving phase priority:', error)
    } else {
        console.log('phase has been moved to other step')
    }
}