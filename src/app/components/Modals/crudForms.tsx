'use server';

import React from 'react'
import { getClients, getInfoProject, getProjectDate } from '@/actionsSupabase/read';
import { updateClient, updateProject } from '@/actionsSupabase/Update';
import  EditProjectForm from './EditProject';
import { createClient, createProject } from '@/actionsSupabase/Create';
import AddProjectForm from './AddProject';
import Extend from '@/app/components/Modals/ExtendProject';
import Move from '@/app/components/Modals/MoveProject'

export const EditProject = async ({data, clients}) => {
    const project = await getInfoProject(data);
    
    return (
        <EditProjectForm data={project} clients={clients}/>                  
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

export const ExtendProject = async ({data}) => {
    const project = await getProjectDate(data);
    
    return (
        <Extend data={project} id={data} />
    )
}

export const MoveProject = async ({data}) => {
    const project = await getProjectDate(data);
    
    return (
        <Move data={project} id={data} />
    )
}