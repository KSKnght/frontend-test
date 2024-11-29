'use client';

import { getClients, getInfoProject } from '@/actionsSupabase/read';
import { updateProject } from '@/actionsSupabase/Update';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { clientOptions, projectformSchema, projecttypeOptions } from '../formSchema';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';


interface ProjectData {
    projID: number;
    name: string;
    address: string;
    type: string;
    id: string;
}

const EditProject = async ({data}) => {
    const [project, setProject] = useState<ProjectData | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean}>({});
    const [formData, setFormData] = useState<ProjectData>({
        projID: 0,
        name: '',
        address: '',
        type: '',
        id: ''
    });
    const route = useRouter();
    
    useEffect(() => {
        console.log(data)
        const fetchProjectData = async () => {
          try {
            console.log("Fetching project for ID:", data); // Debugging
            const fetchedProject = await getInfoProject(Number(data));
            console.log("Fetched project data:", fetchedProject); // Debugging
            if (fetchedProject) {
              setProject({
                projID: fetchedProject.projID,
                name: fetchedProject.name || '',
                address: fetchedProject.address || '',
                type: fetchedProject.type || '',
                id: fetchedProject.id || ''
              });
            }
          } catch (err) {
            console.error("Error fetching project data:", err);
          }
        };
    
        fetchProjectData();
      }, [data]);

      useEffect(() => {
        if (project) {
          console.log("Setting formData with task:", project); // Debugging
          setFormData(project);
        }
      }, [project]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: name === 'priority' ? Number(value) : value,
        }));
      };

      const handleBlur = (name: keyof ProjectData) => {
        setTouched({ ...touched, [name]: true }); // Mark field as touched on blur
        validateForm(formData); // Validate the entire form on blur
      };      

      const validateForm = (data: typeof formData) => {
        try {
          projectformSchema.parse(data); // Validate with Zod
          setErrors({}); // Clear errors if valid
        } catch (error) {
          if (error instanceof z.ZodError) {
            const fieldErrors: { [key: string]: string } = {};
            error.errors.forEach((err) => {
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
            projectformSchema.parse(formData);
            setErrors({});
      
            const formDataToSend = new FormData(e.currentTarget);
            const response = await updateProject(formDataToSend, data);
      
            if (response.success) {
              revalidatePath('/Projects');
              route.push('/Projects')
            } else {
              setErrors({ submit: 'Failed to update task. Please try again.' });
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
            <form onSubmit={(e) => { handleSubmit(e); route.push('/Projects'); }}>
                <div className='flex flex-row justify-between space-x-3'>
                    <div className="grid w-full gap-1.5">
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
                        <Label className="font-bold text-xs">Project Type</Label>
                        <input
                            className="h-8 w-full flex border border-slate-200 bg-gray-100 rounded-lg pl-1 text-sm cursor-not-allowed"
                            type="text"
                            name="type"
                            value={formData.type}
                            disabled
                        />
                        {touched.type && errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                    </div>
                </div>
                
                <div className='flex flex-row justify-between space-x-3 mt-3'>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label className='font-bold text-xs flex'>Project Address</Label>
                        <input
                            className={`h-8 w-full flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.address && errors.address ? 'border-red-500' : 'border-slate-200'}`}
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            onBlur={() => handleBlur('address')}
                        />
                        {touched.address && errors.address && <p className="text-red-500 text-xs mt-1 text-left">{errors.address}</p>}
                    </div>
                    <div>
                        <Label className="font-bold text-xs">Client</Label>
                        <input
                            className="h-8 w-full flex border border-slate-200 bg-gray-100 rounded-lg pl-1 text-sm cursor-not-allowed"
                            type="text"
                            name="id"
                            value={formData.id}
                            disabled
                        />
                        {touched.id && errors.id && <p className="text-red-500 text-xs mt-1">{errors.id}</p>}
                    </div>
                </div>
                

            {errors.submit && <p className='text-red-500 text-xs mt-1 text-left'>{errors.submit}</p>}
            </form>
        )
    }

export default EditProject