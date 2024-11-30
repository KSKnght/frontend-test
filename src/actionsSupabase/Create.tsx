'use server';

import { type } from "@prisma/client";
import prisma from "../lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Build, Design, DesignBuild } from "./TypeTemp";
import { supabase } from "../lib/supabase";
import { useOptimistic } from "react";

export async function createProject(FormData: FormData) {
    var success = false;
    try {
        // Extract values from FormData
        const name = FormData.get('name');
        const type = FormData.get('type');
        const projectAddress = FormData.get('address');
        const startDate = FormData.get('startDate');
        const endDate = FormData.get('endDate');
        const clientID = Number(FormData.get('id'));

        // Insert project into the database
        const { data, error } = await supabase
            .from('project')
            .insert([
                {
                    name,
                    type,
                    projectAddress,
                    startDate: new Date(startDate as string),
                    endDate: new Date(endDate as string),
                    progress: 'NOT_STARTED',
                    clientID
                }
            ])
            .select();

        if (error) {
           throw error
        } else {
            console.log('Project created:', data[0].id);

            // Call appropriate function based on project type
            if (type === 'BUILD') {
                Build(data[0].id);
            } else if (type === 'DESIGN_BUILD') {
                DesignBuild(data[0].id);
            } else {
                Design(data[0].id);
            };
            
            success = true;

        }
    } catch (err) {
        console.error('Error creating project:', err);
        return err;
    }
    
    if (success == true)
        redirect('/Projects');
}

export async function addPhase(FormData: FormData, id: any) {
    try {
        // Extract values from FormData
        const priority = Number(FormData.get('priority'));
        const phaseName = FormData.get('phasename');
        console.log(FormData)

        // Insert phase into the database
        const { data, error } = await supabase
            .from('phase')
            .insert({
                priority,
                phaseName,
                progress: 'NOT_STARTED',
                projectID: id
            });

        if (error) {
            console.error('Error inserting phase:', error);
        } else {
            console.log('Phase created:', data);
        }
    } catch (err) {
        return { success: false, message: 'An error occurred: ' + err.message };
    }
    revalidatePath('/Projects/' + id + '/view');
    redirect('/Projects/' + id + '/view');
}

export async function createTask(FormData : FormData, id: any, projID: number) {
    try {
        const { data, error } = await supabase
        .from('phaseTasks') // Replace 'phase_tasks' with your actual table name
        .insert({
            taskName: FormData.get('taskname'), // Use snake_case for column names
            description: FormData.get('description'),
            deadline: FormData.get('deadline') + 'T00:00:00.000Z', // Format the deadline
            progress: false,
            phaseID: Number(id) // Replace with the actual foreign key column name
        });

        if (error) {
        console.error('Error inserting phase task:', error);
        } else {
        console.log('Phase task created:', data);
        }
    }
    catch (err) {
        return { success: false, message: 'An error occurred: ' + err.message };
    }

    revalidatePath('/Projects/' + projID + '/view');
    redirect('/Projects/' + projID + '/view')
}

export async function createClient(FormData: FormData) {
    var errorCheck = false
    try {
        const lastname = FormData.get('lastname');
        const firstname = FormData.get('firstname');
        const middlename = FormData.get('middlename');
        const contactNum = FormData.get('contactNum');
        const emailAdd = FormData.get('emailAdd');
        // Insert into the database
        const { data, error } = await supabase
            .from('client') // Replace 'client' with your actual table name
            .insert({
                lastname,
                firstname,
                middlename,
                contactNum, // Use snake_case for column names
                emailAdd // Use snake_case for column names
            });

        if (error) {
            errorCheck = true;
            console.error('Error inserting client:', error);
            throw error;
        } else {
            console.log('Client created:', data);
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
}


