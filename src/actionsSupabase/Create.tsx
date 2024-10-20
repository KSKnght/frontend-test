'use server';

import { type } from "@prisma/client";
import prisma from "../lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Build, Design, DesignBuild } from "./TypeTemp";
import { supabase } from "../lib/supabase";
import { useOptimistic } from "react";

export async function createProject(FormData : FormData) {
    console.log(FormData)
    try {
        const { data, error } = await supabase
        .from('project')
        .insert([
            {
            name: FormData.get('name'),
            type: FormData.get('type'),
            projectAddress: FormData.get('address'), // Use the appropriate column name from your table
            startDate: new Date(FormData.get('startDate') + 'T00:00:00.000Z'),
            endDate: new Date(FormData.get('endDate') + 'T00:00:00.000Z'),
            progress: 'NOT_STARTED',
            clientID: Number(FormData.get('id')) // Assuming this is the foreign key in your projects table
        }
        ])
        .select();

        if (error) {
        console.error('Error creating project:', error);
        } else {
        console.log('Project created:' + data[0].id);
        }

        if (FormData.get('type') == 'BUILD') {
            Build(data[0].id);
        }
        else if (FormData.get('type') == 'DESIGN_BUILD') {
            DesignBuild(data[0].id)
        }
        else {
            Design(data[0].id)
        }

        revalidatePath('/Projects');
        revalidatePath('/Projects?show=true');
        
    } catch (err) {
        console.log(err)
    };
}

export async function addPhase(FormData : FormData, id: any) {
    try {
        const { data, error } = await supabase
        .from('phase')
        .insert({
            priority: Number(FormData.get('priority')),
            phaseName: FormData.get('phaseName'),
            progress: 'NOT_STARTED',
            projectID: id
        });

        if (error) {
        console.error('Error inserting phase:', error);
        } else {
        console.log('Phase created:', data);
        }
    }
    catch (err) {
        console.log(err)
    };
    revalidatePath('/Projects/' + id + '/view');
};

export async function createTask(FormData : FormData, id: any, projID: number) {
    try {
        const { data, error } = await supabase
        .from('phaseTasks') // Replace 'phase_tasks' with your actual table name
        .insert({
            priority: Number(FormData.get('priority')),
            taskName: FormData.get('taskName'), // Use snake_case for column names
            description: FormData.get('description'),
            deadline: FormData.get('deadline') + 'T00:00:00.000Z', // Format the deadline
            progress: 'NOT_STARTED',
            phaseID: Number(id) // Replace with the actual foreign key column name
        });

        if (error) {
        console.error('Error inserting phase task:', error);
        } else {
        console.log('Phase task created:', data);
        }
    }
    catch (err) {
        console.log(err)
    }

    revalidatePath('/Projects/' + projID + '/view');
    redirect('/Projects/' + projID + '/view')
}

export async function createClient(FormData : FormData) {
    try {
        const { data, error } = await supabase
        .from('client') // Replace 'clients' with your actual table name
        .insert({
            lastname: FormData.get('lastname'),
            firstname: FormData.get('firstname'),
            middlename: FormData.get('middlename'),
            contactNum: FormData.get('contactNum'), // Use snake_case for column names
            emailAdd: FormData.get('emailAdd') // Use snake_case for column names
        });

        if (error) {
        console.error('Error inserting client:', error);
        } else {
        console.log('Client created:', data);
        }
    }
    catch (err) {
        console.log(err)
    };

    revalidatePath('/Clients');
}