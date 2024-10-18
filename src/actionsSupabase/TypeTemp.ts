'use server';

import { supabase } from "@/lib/supabase";
import prisma from "../lib/db";


export async function Design(id : number) {
    const phases = [
        { phaseName: 'Preliminary Design', projectID: id, priority: 0, progress: 'NOT_STARTED' },
        { phaseName: 'Second Design', projectID: id, priority: 1, progress: 'NOT_STARTED' },
        { phaseName: 'Finalizing', projectID: id, priority: 2, progress: 'NOT_STARTED' },
        { phaseName: 'Final Phase', projectID: id, priority: 3, progress: 'NOT_STARTED' }
    ];
    
    // Insert multiple rows into the 'phase' table
    const { data, error } = await supabase
        .from('phase')
        .insert(phases);
    
    if (error) {
        console.error('Error inserting phases:', error);
    } else {
        console.log('Phases inserted:', data);
    }
}

export async function DesignBuild(id : number) {
    // Insert multiple rows into the 'phase' table
    const { data, error } = await supabase
        .from('phase')
        .insert([
            {phaseName: 'Preliminary Design', projectID: id, priority: 0, progress: 'NOT_STARTED'},
            {phaseName: 'Second Design', projectID: id, priority: 1, progress: 'NOT_STARTED'},
            {phaseName: 'Layouting', projectID: id, priority: 0, progress: 'NOT_STARTED'},
            {phaseName: 'Constructing', projectID: id, priority: 1, progress: 'NOT_STARTED'},
            {phaseName: 'Intstallations', projectID: id, priority: 2, progress: 'NOT_STARTED'},
            {phaseName: 'Polishing', projectID: id, priority: 2, progress: 'NOT_STARTED'},
            {phaseName: 'Finalizing', projectID: id, priority: 2, progress: 'NOT_STARTED'},
            {phaseName: 'Final Phase', projectID: id, priority: 3, progress: 'NOT_STARTED'}
        ]);
    
    if (error) {
        console.error('Error inserting phases:', error);
    } else {
        console.log('Phases inserted:', data);
    }
}

export async function Build(id : number) {
    // Insert multiple rows into the 'phase' table
    const { data, error } = await supabase
        .from('phase')
        .insert([
            {phaseName: 'Layouting', projectID: id, priority: 0, progress: 'NOT_STARTED'},
            {phaseName: 'Constructing', projectID: id, priority: 1, progress: 'NOT_STARTED'},
            {phaseName: 'Intstallations', projectID: id, priority: 2, progress: 'NOT_STARTED'},
            {phaseName: 'Polishing', projectID: id, priority: 2, progress: 'NOT_STARTED'},
            {phaseName: 'Final Phase', projectID: id, priority: 3, progress: 'NOT_STARTED'}
        ]);
    
    if (error) {
        console.error('Error inserting phases:', error);
    } else {
        console.log('Phases inserted:', data);
    }
}