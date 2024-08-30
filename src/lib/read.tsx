import prisma from "./db";

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
        }
    })
    
}