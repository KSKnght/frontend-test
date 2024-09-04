import prisma from "../lib/db";

export async function getProjects() {
    const data = await prisma.project.findMany({
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

    return data;
}

export async function getClients() {
    const data = await prisma.client.findMany();

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
    })
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
    })
    return data
};

export async function getTask(id:number) {
    const data = await prisma.phaseTasks.findFirst({
        where: {
            id: id
        }
    })
    return data;
}