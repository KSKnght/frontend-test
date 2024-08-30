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
}