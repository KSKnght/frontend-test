import { supabase } from "@/lib/supabase";
import prisma from "../lib/db";

export const revalidate = 0

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
        `)
        .eq('isArchived', false)
        .order('id', { ascending: false });
        

    if (error) {
        console.error('Error fetching projects:', error);
    }

    return data;
}

export async function getProjectsArchived() {
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
        `)
        .eq('isArchived', true)
        .order('id', { ascending: false });
        

    if (error) {
        console.error('Error fetching projects:', error);
    }

    return data;
}

export async function getProjectDate(id: number) {
    const { data, error } = await supabase
    .from('project') // Replace 'projects' with your actual table name
    .select(`
        *,
        client (
            startDate,
            endDate,
        )
    `)
    .eq('id', id) // Assuming 'id' is the project ID
    .single(); // Use .single() if you expect only one record

    if (error) {
    console.error('Error fetching project:', error);
    } else {
    // console.log('Project data:', data);
    }
    return data
}


export async function getClients() {
    const { data, error } = await supabase
        .from('client') // Replace with your actual table name
        .select('*') // You can specify specific columns if needed
        .order('id', { ascending: true });

    if (error) {
        console.error('Error fetching clients:', error);
    }

    return data;
}

export async function getInfoProject(id:number) {
    const { data, error } = await supabase
    .from('project') // Replace 'projects' with your actual table name
    .select(`
        *,
        client (
            lastname,
            firstname,
            middlename,
            contactNum,
            emailAdd
        )
    `)
    .eq('id', id) // Assuming 'id' is the project ID
    .single(); // Use .single() if you expect only one record

    if (error) {
    console.error('Error fetching project:', error);
    } else {
    // console.log('Project data:', data);
    }
    return data
}


export async function getPhases(id:number) {
    const { data, error } = await supabase
    .from('phase') // Replace 'phases' with your actual table name
    .select(`
        *,
        phaseTasks: phaseTasks (
            isDeleted,
            id,
            taskName,
            description,
            progress,
            deadline,
            phaseID,
            status,
            _phaseTasksTosubCon ( 
                id,
                B: subCon (
                    Name
                )
            ),
            taskMat: taskMat (
                id,
                qty,
                unit,
                materials (
                name
                )
            )
        )
    `)
    .eq('projectID', id) // Adjust if 'project_id' is not the actual foreign key column name
    .order('priority', { ascending: true });

    if (error) {
    console.error('Error fetching phases:', error);
    } else {
    // console.log('Phases data:', data);
    }

    return data
};

export async function getTask(id:number) {
    const { data, error } = await supabase
    .from('phaseTasks') // Replace 'phase_tasks' with your actual table name
    .select(`
        *,
        _phaseTasksTosubCon ( 
            id,
            B: subCon (
                Name
            )
        ),
        taskMat: taskMat (
            id,
            qty,
            unit,
            materials (
            name
            )
        )
        `) // Select all columns, or specify the columns you need
    .eq('id', id) // Use the ID to filter the record
    .single(); // Use .single() since you expect one record

    if (error) {
    console.error('Error fetching phase task:', error);
    }
    return data;
}

export async function getMaterials() {
    // const data = await prisma.materials.findMany();
    const { data, error } = await supabase
    .from('materials')
    .select('*');

    if (error) { 
        console.log('Error fetching materials:', error)
    }

    return data;
}

export async function getUnselectedMat(taskId:Number) {
    const {data, error} = await supabase
    .rpc('get_unconnected_materials_for_phase',{ 'phase_id': Number(taskId) })

    if (error) {
        console.log('Error fetching materials:', error)
    } else 
        return data;
}

export async function getSubcontracts() {
    // const data = await prisma.subCon.findMany();

    const { data, error } = await supabase
    .from('subCon')
    .select('*');

    if (error) { 
        console.log('Error fetching subCon:', error)
    }

    return data;
}

export async function getUnselectedSub(taskId:Number) {
    const { data, error } = await supabase
    .rpc('get_unconnected_subcontractors_for_phase', { 'phase_id': Number(taskId) })

    if (error) {
        console.log('Error fetching subCon:', error)
    } else 
        return data;
}

export async function showClient(id: number) {
    // const data = await prisma.client.findFirst({
    //     where: {
    //         id: id
    //     },
    // });
    const { data, error } = await supabase
    .from('client')
    .select('*')
    .eq('id', id)

    if (error) { 
        console.log('Error fetching client:', error)
    }

    return data
}