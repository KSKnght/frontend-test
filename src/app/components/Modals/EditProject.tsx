'use client';

import { getClients, getInfoProject } from '@/actionsSupabase/read';
import { updateProject } from '@/actionsSupabase/Update';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { clientOptions, editProjectSchema, projecttypeOptions } from '../formSchema';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

interface ProjectData {
    id: number;
    name: string;
    projectAddress: string;
    type: projecttypeOptions.SELECT;
    clientID: number;
}

const EditProjectForm = ({data, clients}) => {
    console.log(data)
    // const [project, setProject] = useState<ProjectData | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean}>({});
    const [formData, setFormData] = useState<ProjectData>({
        id: data.id,
        name: data.name,
        projectAddress: data.projectAddress,
        type: data.type,
        clientID: data.clientID
    });
    const route = useRouter();

    console.log(formData)

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value, 
        }));
      
        if (touched[name]) {
          validateForm({ ...formData, [name]: value });
        }
      };

      const handleBlur = (name: keyof ProjectData) => {
        setTouched({ ...touched, [name]: true }); // Mark field as touched on blur
        validateForm(formData); // Validate the entire form on blur
      };      

      const validateForm = (data: ProjectData) => {
        try {
          editProjectSchema.parse(data); // Validate with Zod
          setErrors({}); // Clear errors if valid
        } catch (error) {
          if (error instanceof z.ZodError) {
            const fieldErrors: { [key: string]: string } = {};
            error.errors.forEach((err) => {
              const errorMessage = `Path: ${err.path.join('.')} | Message: ${err.message}`;
              console.log(errorMessage); // Log each error message
              if (err.path[0]) {
                fieldErrors[err.path[0] as string] = err.message;
              }
            });
            setErrors(fieldErrors); // Set errors from Zod validation
          }
        }
      };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();      

        try {
            editProjectSchema.parse(formData);
            setErrors({});
      
            const formDataToSend = new FormData(e.currentTarget);
            const response = await updateProject(formDataToSend, formData.id);
      
            if (response.success == true) {
              route.back()
            } else {
              setErrors({ submit: 'Failed to update project. Please try again.' });
            }
          } catch (error) {
            if (error instanceof z.ZodError) {
              const fieldErrors: { [key: string]: string } = {};
              error.errors.forEach((err) => {
                if (err.path[0]) {
                  fieldErrors[err.path[0] as string] = err.message;
                  console.log(err.message)
                }
              });
              setErrors(fieldErrors);
            } else {
            }
          }
        };
      
        const hasErrors = Object.keys(errors).length > 0;
        const isEmpty = Object.values(formData).every((field) => field === '');        

    
        return (
            <form onSubmit={(e) => { handleSubmit(e)}}>
                  <div className='w-[25rem] space-y-8'>
                    <div className="grid w-full gap-1.5 text-left">
                        <div>
                          <Label className='font-bold text-xs flex'>Project Name</Label>
                          <input
                              className={`h-8 w-full flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.name && errors.name ? 'border-red-500' : 'border-slate-200'}`}
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              onBlur={() => handleBlur('name')}
                          />
                          {touched.name && errors.name && <p className="text-red-500 text-xs mt-1 text-left">{errors.name}</p>}
                        </div>
                        <div>
                            <Label className="font-bold text-xs text-left">Project Type</Label>
                            <input
                                className="h-8 w-full flex border border-slate-200 bg-gray-100 rounded-lg pl-1 text-sm cursor-not-allowed"
                                type="text"
                                name="type"
                                value={formData.type}
                                disabled
                            />
                            {touched.type && errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                        </div>
                        <div className='mt-2'>
                            <Label className='font-bold text-xs flex'>Project Address</Label>
                            <input
                                className={`h-8 w-full flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.projectAddress && errors.projectAddress ? 'border-red-500' : 'border-slate-200'}`}
                                type="text"
                                name="projectAddress"
                                value={formData.projectAddress}
                                onChange={handleChange}
                                onBlur={() => handleBlur('projectAddress')}
                            />
                            {touched.projectAddress && errors.projectAddress && <p className="text-red-500 text-xs mt-1 text-left">{errors.projectAddress}</p>}
                        </div>
                        <div>
                            <Label className="font-bold text-xs">Client</Label>
                            <select
                                className={`h-8 w-full flex bg-gray-100 border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.clientID && errors.clientID ? 'border-red-500' : 'border-slate-200'}`}
                                name="clientID"
                                value={formData.clientID}
                                disabled
                            >
                            {clients.map((client, i) => (
                                <option key={i} value={client.id}>
                                    {client.lastname + ', ' + client.firstname + ' ' + client.middlename}
                                </option>
                            ))}                          
                            </select>
                            {touched.clientID && errors.clientID && <p className="text-red-500 text-xs mt-1">{errors.clientID}</p>}
                        </div>
                    </div>
                </div>

            {errors.submit && <p className='text-red-500 text-xs mt-1 text-left'>{errors.submit}</p>}
            <button 
              className={`mt-8 text-sm px-4 py-1 rounded-lg text-white ${hasErrors || isEmpty ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-600'}`}          type="submit"
              disabled={hasErrors || isEmpty}
            >
                Update Project
            </button>
            </form>
        )
    }

export default EditProjectForm