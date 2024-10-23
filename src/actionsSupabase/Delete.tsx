'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

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