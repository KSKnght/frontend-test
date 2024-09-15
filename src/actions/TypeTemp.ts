'use server';

import { type } from "@prisma/client";
import prisma from "../lib/db";


export async function Design(id : number) {
    await prisma.phase.createMany({
        data: [
            {phaseName: 'Preliminary Design', projectID: id, priority: 0, progress: 'NOT_STARTED'},
            {phaseName: 'Second Design', projectID: id, priority: 1, progress: 'NOT_STARTED'},
            {phaseName: 'Finalizing', projectID: id, priority: 2, progress: 'NOT_STARTED'},
            {phaseName: 'Final Phase', projectID: id, priority: 3, progress: 'NOT_STARTED'}
        ]
    })
}

export async function DesignBuild(id : number) {
    await prisma.phase.createMany({
        data: [
            {phaseName: 'Preliminary Design', projectID: id, priority: 0, progress: 'NOT_STARTED'},
            {phaseName: 'Second Design', projectID: id, priority: 1, progress: 'NOT_STARTED'},
            {phaseName: 'Layouting', projectID: id, priority: 0, progress: 'NOT_STARTED'},
            {phaseName: 'Constructing', projectID: id, priority: 1, progress: 'NOT_STARTED'},
            {phaseName: 'Intstallations', projectID: id, priority: 2, progress: 'NOT_STARTED'},
            {phaseName: 'Polishing', projectID: id, priority: 2, progress: 'NOT_STARTED'},
            {phaseName: 'Finalizing', projectID: id, priority: 2, progress: 'NOT_STARTED'},
            {phaseName: 'Final Phase', projectID: id, priority: 3, progress: 'NOT_STARTED'}
        ]
    })
}

export async function Build(id : number) {
    await prisma.phase.createMany({
        data: [
            {phaseName: 'Layouting', projectID: id, priority: 0, progress: 'NOT_STARTED'},
            {phaseName: 'Constructing', projectID: id, priority: 1, progress: 'NOT_STARTED'},
            {phaseName: 'Intstallations', projectID: id, priority: 2, progress: 'NOT_STARTED'},
            {phaseName: 'Polishing', projectID: id, priority: 2, progress: 'NOT_STARTED'},
            {phaseName: 'Final Phase', projectID: id, priority: 3, progress: 'NOT_STARTED'}
        ]
    })
}