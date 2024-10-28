'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export async function statusTask(id: Number, status: boolean, phaseID: Number) {
    // update for the status of current task
    const { error: updateStatus } = await supabase
    .from('phaseTasks')
    .update({
        progress: status
    })
    .eq('id', id)
    
    if (updateStatus) console.log('Error updating task status', updateStatus)

    // check for other task in the phase
    const { data: completed, error: completedError } = await supabase
    .from('phaseTasks')
    .select('progress')
    .eq('phaseID', phaseID)
    .eq('progress', true)

    if (completedError) console.log('error looking for Complete: ', completedError)
    
    const { data: incomplete, error: incompleteError } = await supabase
    .from('phaseTasks')
    .select('progress')
    .eq('phaseID', phaseID)
    .eq('progress', false)

    if (incompleteError) console.log('error looking for Incomplete:', incompleteError)
    
    let updPhaseStatusError;

    // if theres atleast one incomplete = phase in progress
    if (incomplete.length != 0) {
        updPhaseStatusError = await supabase
        .from('phase')
        .update({
            progress: 'IN_PROGRESS'
        })
        .eq('id', phaseID)
    }

    // if all task in the phase is incomplete = phase not started
    else if (incomplete.length != 0 && completed == null)
        updPhaseStatusError = await supabase
        .from('phase')
        .update({
            progress: 'NOT_STARTED'
        })
        .eq('id', phaseID)

    // if all task is complete = phase complete
    else if (incomplete.length == 0 && completed.length != 0)
        updPhaseStatusError = await supabase
        .from('phase')
        .update({
            progress: 'NOT_STARTED'
        })
        .eq('id', phaseID)

    if (updPhaseStatusError) console.log('error updating phase status:', updPhaseStatusError)
}