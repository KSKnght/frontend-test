'use server';

import { type, unit } from "@prisma/client";
import prisma from "../lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Router } from "next/router";


export async function updateProject(FormData : FormData, id: number) {
    await prisma.project.update({
        where: {id},
        data: {
            name: FormData.get('name') as string,
            type: FormData.get('type') as type,
            projectAddress: FormData.get('address') as string,
            startDate: FormData.get('startDate') + 'T00:00:00.000Z',
            endDate: FormData.get('endDate') + 'T00:00:00.000Z',
            client: {
                connect: {
                    id: Number(FormData.get('id'))
                }
            }
        }
    });
    revalidatePath('/Project');
    redirect('/Project');
};
export async function updateTask(FormData : FormData, id: number, projID: number) {
    await prisma.phaseTasks.update({
        where: {id},
        data: {
            taskName: FormData.get('taskName') as string,
            description: FormData.get('description') as string,
            deadline: FormData.get('deadline') + 'T00:00:00.000Z',
        }
    });
    revalidatePath('/Project');
    redirect('/Project');
};

export async function addMaterial(FormData : FormData, taskID : number) {
    await prisma.taskMat.create({
        data: {
            phaseTasks: {
                connect: {
                    id: taskID
                }
            },
            qty: Number(FormData.get('qty')),
            unit: FormData.get('unit') as unit,
            materials: {
                connectOrCreate: {
                    where: {
                        name: FormData.get('materialName') as string
                    },
                    create: {
                        name: FormData.get('materialName') as string
                    }
                }
            }
        }
    })
}

export async function addSubCom(FormData : FormData, taskID : number) {
    await prisma.phaseTasks.update({
        where: {
            id: Number(taskID)
        },
        data: {
            subCon: {
                connectOrCreate: {
                    where: {
                        Name: FormData.get('SubConName') as string
                    },
                    create: {
                        Name: FormData.get('SubConName') as string
                    }
                }
            }
        }
    })
}