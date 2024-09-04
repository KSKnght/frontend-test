'use server';

import { type } from "@prisma/client";
import prisma from "../lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
export async function updateTask(FormData : FormData, id: number) {
    await prisma.phaseTasks.update({
        where: {id},
        data: {
            
        }
    });
    revalidatePath('/Project');
    redirect('/Project');
};