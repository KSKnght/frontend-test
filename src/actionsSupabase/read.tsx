import { supabase } from "@/lib/supabase";
import prisma from "../lib/db";

export async function getProjects() {
    const { data, error } = await supabase
        .from('project')
        .select(`
            *,
            client (
                lastname,
                firstname,
                middlename,
                contactNum,
                emailAdd
            )
        `);

    if (error) {
        console.error('Error fetching projects:', error);
        return;
    }

    return data;
}

export async function getClients() {
    const { data, error } = await supabase
        .from('client') // Replace with your actual table name
        .select('*') // You can specify specific columns if needed
        .order('id', { ascending: true });

    if (error) {
        console.error('Error fetching clients:', error);
        return;
    }

    return data;
}

export async function getInfoProject(id:number) {
    const data = await prisma.project.findFirst({
        where: {
            id
        },
        include: {
            client: {
                select: {
                    lastname: true,
                    firstname: true,
                    middlename: true,
                    contactNum: true,
                    emailAdd: true
                }
            }
        },
    });
    return data
}

export async function getPhases(id:number) {
    const data = await prisma.phase.findMany({
        where: {
            project: {
                id
            }
        },
        include: {
            phaseTasks: {
                select: {
                    id: true,
                    taskName: true,
                    description: true,
                    progress: true,
                    deadline: true,

                    subCon: {
                        select: {
                            Name: true
                        }
                    },

                    taskMat: {
                        select: {
                            qty: true,
                            unit: true,

                            materials: {
                                select: {
                                    name: true,
                                }
                            }
                        }
                    }
                }
            }
    
        },
        orderBy: {
            priority: 'asc'
        }
    });
    return data
};

export async function getTask(id:number) {
    const data = await prisma.phaseTasks.findFirst({
        where: {
            id: id
        }
    });
    return data;
}

export async function getMaterials() {
    const data = await prisma.materials.findMany();

    return data;
}

export async function getSubcontracts() {
    const data = await prisma.subCon.findMany();

    return data;
}

export async function showClient(id: number) {
    const data = await prisma.client.findFirst({
        where: {
            id: id
        },
    });

    return data
}