'use client';

import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const AddProjectForm = ({clients}) => {
  return (
    <>
        <div className='flex flex-row justify-between space-x-3'>
                <div className="grid w-full gap-1.5">
                    <Label className='font-bold text-xs flex'>Project Name</Label>
                    <Input type='text' name='name' />
                </div> 
                <div>
                    <p className='subHeader'>Project Type</p>
                    <select className='inputSubHeader inputSubHeader:focus w-[10rem]'
                        defaultValue={'Select'} name='type'>
                            <option value={'Select'} disabled={true}>Select type</option>
                            <option value={'BUILD'}>Build</option>
                            <option value={'DESIGN_BUILD'}>Design + Build</option>
                            <option value={'DESIGN'}>Design</option>
                    </select>
                </div>
                <div>
                    <p className='subHeader'>Start Date</p>
                    <input className='inputSubHeader inputSubHeader:focus w-[10rem]' type="date" name='startDate'/>
                </div>
            </div>
            
            <div className='flex flex-row justify-between space-x-3 mt-3'>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className='font-bold text-xs flex'>Project Address</Label>
                    <Input type='text' name='address' className='w-80' />
                </div>
                <div>
                    <p className='subHeader'>Client</p>
                    <select className='inputSubHeader inputSubHeader:focus w-[10rem]' defaultValue={'Select'} name='id'>
                        <option value={'Select'} disabled={true}>Select Client</option>
                        {clients.map((clients, i) => {
                            return <option key={i} value={clients.id}>{clients.lastname + ', ' + clients.firstname+ ' ' + clients.middlename}</option>
                        })}
                    </select>
                </div>
                <div>
                    <p className='subHeader'>End Date</p>
                    <input className='inputSubHeader inputSubHeader:focus w-[10rem]' type="date" name='endDate'/>
                </div>
            </div>
    </>
  )
}

export default AddProjectForm