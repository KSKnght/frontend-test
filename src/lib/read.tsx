import prisma from "./db";

export default async function getProjects() {
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