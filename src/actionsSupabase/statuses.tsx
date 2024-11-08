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

    await statusPhase(phaseID)
    
    revalidatePath('/Projects/' + projID + '/view')
}

export async function statusPhase(phaseID: Number) {
    const { data: total, error: totalError } = await supabase
    .from('phaseTasks')
    .select('progress, taskName')
    .eq('phaseID', phaseID)
    .eq('isDeleted', false)


    // check for other task in the phase
    const { data: completed, error: completedError } = await supabase
    .from('phaseTasks')
    .select('progress, taskName')
    .eq('phaseID', phaseID)
    .eq('progress', true)
    .eq('isDeleted', false)
    
    const { data: incomplete, error: incompleteError } = await supabase
    .from('phaseTasks')
    .select('progress, taskName')
    .eq('phaseID', phaseID)
    .eq('progress', false)
    .eq('isDeleted', false)


    // if theres atleast one incomplete = phase in progress
    if (incomplete.length < total.length && completed.length < total.length) {
        await supabase
        .from('phase')
        .update({
            progress: 'IN_PROGRESS'
        })
        .eq('id', phaseID)
    }

    // if all task in the phase is incomplete = phase not started
    else if (incomplete.length == total.length)
        await supabase
        .from('phase')
        .update({
            progress: 'NOT_STARTED'
        })
        .eq('id', phaseID)

    // if all task is complete = phase complete
    else if (completed.length == total.length)
        await supabase
        .from('phase')
        .update({
            progress: 'COMPLETE'
        })
        .eq('id', phaseID)
}

export async function checkTime() {
    
}