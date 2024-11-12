'use server';

import React from 'react'
import { getClients, getInfoProject } from '@/actionsSupabase/read';
import { updateClient, updateProject } from '@/actionsSupabase/Update';
import EditProjectForm from './EditProject';
import { createClient, createProject } from '@/actionsSupabase/Create';
import AddProjectForm from './AddProject';

export const EditProject = async ({data, clients}) => {
    const project = await getInfoProject(data);
    
    return (
        <form action={async (e) => {'use server'; await updateProject(e, data);}}>
            <EditProjectForm project={project} clients={clients}/>                  
            <button className='submitButton' type='submit'>
                Update Project
            </button>
        </form>
    )
}

export const AddProject = async ({clients}) => {

    return (
        <form action={async (e) => {'use server'; await createProject(e);}}>
            <AddProjectForm clients={clients} />
            
            <button className='submitButton' name='submit' type='submit'>
                Create Project
            </button>
        </form>
    )
}

export const AddClients = async () => {
    return (
        <form action={async (e) => {'use server'; await createClient(e);}}>
            


            <button className='submitButton' name='submit' type='submit'>
                Add Client
            </button>
        </form>
    )
}

export const EditClients = async ({id}) => {
    return (
        <form action={async (e) => {'use server'; await updateClient(e, id);}}>


            <button className='submitButton' name='submit' type='submit'>
                Update Client
            </button>
        </form>
    )
}