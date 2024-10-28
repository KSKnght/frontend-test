'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { statusPhase } from "./statuses";

export async function softdelProject(id: Number) {
    const { error } = await supabase
    .from('project')
    .update({
        isDeleted: true
    })
    .eq('id', id)

    if (error) console.log('Error deleting Project:', error)

    revalidatePath('/Projects')
}

export async function softDelTasks(id: Number, projID: Number) {
    const { data, error } = await supabase
    .from('phaseTasks')
    .update({
        isDeleted: true
    })
    .eq('id', id)
    .select('phaseID')

    await statusPhase(data[0].phaseID)

    if (error) console.log('Error deleting Tasks:', error)
    
    revalidatePath('/Projects/' + projID + '/view')
}

export async function softDelPhase(id: Number, projID: Number) {
    const { error } = await supabase
    .from('phase')
    .update({
        isDeleted: true
    })
    .eq('id', id)

    revalidatePath('/Projects/' + projID + '/view')
}

