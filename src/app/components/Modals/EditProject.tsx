import { getClients, getInfoProject } from '@/actionsSupabase/read';
import { updateProject } from '@/actionsSupabase/Update';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { redirect } from 'next/navigation';
import React from 'react'

const EditProjectForm = async ({project, clients}) => {

    return (
        <>
            <div className='flex flex-row justify-between space-x-3'>
                <div className="grid w-full gap-1.5">
                    <Label className='font-bold text-xs flex'>Project Name</Label>
                    <Input defaultValue={project.name} type='text' name='name' />
                </div>
                <div>
                    <p className='subHeader'>Project Type</p>
                    <select className='inputSubHeader inputSubHeader:focus w-[10rem]'
                        defaultValue={project.type} name='type'>
                            <option value={'Select'} disabled={true}>Select type</option>
                            <option value={'BUILD'}>Build</option>
                            <option value={'DESIGN_BUILD'}>Design + Build</option>
                            <option value={'DESIGN'}>Design</option>
                    </select>
                </div>
            </div>
            
            <div className='flex flex-row justify-between space-x-3 mt-3'>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className='font-bold text-xs flex'>Project Address</Label>
                    <Input defaultValue={project.projectAddress} type='text' name='address' className='w-80' />
                </div>
                <div>
                    <p className='subHeader'>Client</p>
                    <select className='inputSubHeader inputSubHeader:focus w-[16rem]' defaultValue={project.clientID} name='id'>
                        <option value={'Select'} disabled={true}>Select Client</option>
                        {clients.map((clients, i) => {
                            return <option key={i} value={clients.id}>{clients.lastname + ', ' + clients.firstname+ ' ' + clients.middlename}</option>
                        })}
                    </select>
                </div>
            </div>
        </>
    )
}

export default EditProjectForm