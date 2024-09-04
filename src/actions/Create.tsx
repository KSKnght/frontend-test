'use server';

import { type } from "@prisma/client";
import prisma from "../lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(FormData : FormData) {
    console.log(FormData)
    try {
        await prisma.project.create({
            data: {
                name: FormData.get('name') as string,
                type: FormData.get('type') as type,
                projectAddress: FormData.get('address') as string,
                startDate: FormData.get('startDate') + 'T00:00:00.000Z',
                endDate: FormData.get('endDate') + 'T00:00:00.000Z',
                progress: 'NOT_STARTED',
                client: {
                    connect: {
                        id: Number(FormData.get('id'))
                    }
                }
            }
        });
        revalidatePath('/Project');
        redirect('/Project');
    } catch (err) {
        console.log(err)
    }
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