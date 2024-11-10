'use server';

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function statusTask(id: Number, status: boolean, phaseID: Number, projID: Number) {
    // update for the status of current task
    const { error: updateStatus } = await supabase
    .from('phaseTasks')
    .update({
        progress: status
    })
    .eq('id', id)
    
    if (updateStatus) console.log('Error updating task status', updateStatus)
    
    revalidatePath('/Projects/' + projID + '/view')
}