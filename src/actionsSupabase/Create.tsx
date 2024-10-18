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
        await prisma.phase.create({
            data: {
                priority: Number(FormData.get('priority')),
                phaseName: FormData.get('phaseName') as string,
                progress: 'NOT_STARTED',
                project: {
                    connect: {
                        id: id
                    }
                }
            }
        })
    }
    catch (err) {
        console.log(err)
    };
    revalidatePath('/Projects/' + id + '/view');
};

export async function createTask(FormData : FormData, id: any) {
    try {
        await prisma.phaseTasks.create({
            data: {
                priority: Number(FormData.get('priority')),
                taskName: FormData.get('taskName') as string,
                description: FormData.get('description') as string,
                deadline: FormData.get('deadline') + 'T00:00:00.000Z',
                progress: 'NOT_STARTED',
                phase: {
                    connect: {
                        id: Number(id)
                    }
                }
            }
        })
    }
    catch (err) {
        console.log(err)
    }

    revalidatePath('/Projects/' + id + '/view');
}

export async function createClient(FormData : FormData) {
    try {
        await prisma.client.create({
            data: {
                lastname: FormData.get('lastname') as string,
                firstname: FormData.get('firstname') as string,
                middlename: FormData.get('middlename') as string,
                contactNum: FormData.get('contactNum') as string,
                emailAdd: FormData.get('emailAdd') as string
            }
        })
    }
    catch (err) {
        console.log(err)
    };

    revalidatePath('/Clients')
}