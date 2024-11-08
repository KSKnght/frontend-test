'use server';

import { type } from "@prisma/client";
import prisma from "../lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Build, Design, DesignBuild } from "./TypeTemp";
import { supabase } from "../lib/supabase";
import { useOptimistic } from "react";
import { statusPhase } from "./statuses";

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

        // Validate phase inputs
        const phaseError = validatePhaseInputs({ priority, phaseName });
        if (phaseError) {
            console.error(phaseError);
            return; // Exit if validation fails
        }

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

// Validation functions
function validateProjectInputs({ name, type, projectAddress, startDate, endDate, clientID }) {
    let errors = [];

    if (!name) {
        errors.push('Project name is required');
    }
    if (!type) errors.push('Project type is required');
    if (!projectAddress) errors.push('Project address is required');
    if (!startDate) errors.push('Start date is required');
    if (!endDate) errors.push('End date is required');
    if (isNaN(clientID) || clientID <= 0) errors.push('Valid client ID is required');

    // Check if end date is after start date and vice versa
    if (new Date(endDate) <= new Date(startDate)) {
        errors.push('End date must be after start date');
    } else if (new Date(startDate) >= new Date(endDate)) {
        errors.push('Start date must be before end date')
    }

    return errors.length > 0 ? errors.join('. ') : null; // Join errors into a single message
}

function validatePhaseInputs({ priority, phaseName }) {
    let errors = [];

    if (isNaN(priority) || priority <= 0) errors.push('Priority must be a positive number');
    if (!phaseName) errors.push('Phase name is required');

    return errors.length > 0 ? errors.join('. ') : null; // Join errors into a single message
}


export async function createTask(FormData : FormData, id: any, projID: number) {
    try {
        const { data, error } = await supabase
        .from('phaseTasks') // Replace 'phase_tasks' with your actual table name
        .insert({
            priority: Number(FormData.get('priority')),
            taskName: FormData.get('taskname'), // Use snake_case for column names
            description: FormData.get('description'),
            deadline: FormData.get('deadline') + 'T00:00:00.000Z', // Format the deadline
            progress: false,
            phaseID: Number(id) // Replace with the actual foreign key column name
        });

        await statusPhase(id)

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
    try {
        const lastname = FormData.get('lastname');
        const firstname = FormData.get('firstname');
        const middlename = FormData.get('middlename');
        const contactNum = FormData.get('contactNum');
        const emailAdd = FormData.get('emailAdd');

        // Validate required fields
        const validationError = validateRequiredFields({ lastname, firstname, contactNum, emailAdd });
        if (validationError) {
            console.error(validationError);
            return; // Exit the function if validation fails
        }

        // Validate contact number
        const contactError = validateContactNumber(contactNum);
        if (contactError) {
            console.error(contactError);
            return; // Exit if contact number is invalid
        }
        
        // Additional validation (example: email format)
        const emailError = validateEmail(emailAdd);
        if (emailError) {
            console.error(emailError);
            return; // Exit if email is invalid
        }

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
            console.error('Error inserting client:', error);
        } else {
            console.log('Client created:', data);
        }
    } catch (err) {
        return { success: false, message: 'An error occurred: ' + err.message };
    }

    revalidatePath('/Clients');
    redirect('/Clients');
}

function validateRequiredFields({ lastname, firstname, contactNum, emailAdd }) {
    let errors = [];
    
    if (!lastname) errors.push('Last name is required');
    if (!firstname) errors.push('First name is required');
    if (!contactNum) errors.push('Contact number is required');
    if (!emailAdd) errors.push('Email address is required');

    return errors.length > 0 ? errors.join('. ') : null; // Join errors into a single message
}

function validateContactNumber(contactNum) {
    const contactPattern = /^\d{11}$/; // Example: Validate for exactly 10 digits
    if (!contactPattern.test(contactNum)) {
        return 'Contact number must be a 11-digit number';
    }
    return null; // No errors
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return 'Invalid email format';
    }
    return null; // No errors
}


