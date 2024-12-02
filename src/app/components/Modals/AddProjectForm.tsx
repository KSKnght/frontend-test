'use client';

import React, { useState } from 'react'
import { getClients } from '@/actionsSupabase/read'
import { createProject } from '../../../actionsSupabase/Create'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { clientOptions, projectformSchema, projecttypeOptions } from '../formSchema'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation';


const AddProjectForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: projecttypeOptions.SELECT,
        id: clientOptions.SELECT,
        address: '',
        startDate: '',
        endDate: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const [clients, setClients] = useState([]);
    const route = useRouter();

    React.useEffect(() => {
        const fetchClients = async () => {
          const fetchedClients = await getClients();
          setClients(fetchedClients);
        };
        fetchClients();
      }, []);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Validate input on change if already touched
        if (touched[name]) {
            validateForm({ ...formData, [name]: value });
          }
    }

    const handleBlur = (name: string) => {
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
            const response = await createProject(formDataToSend);
          
            if (response.success) {
              revalidatePath('/Projects');
              route.push('/Projects')
            } else {

            }
          } catch (error) {
            if (error instanceof z.ZodError) {
              const fieldErrors = error.errors.reduce((acc: { [key: string]: string }, err) => {
                if (err.path[0]) acc[err.path[0] as string] = err.message;
                return acc;
              }, {});
              setErrors(fieldErrors);
            } else {
                route.push('/Projects')
            }
          }
    }
          
      
        const hasErrors = Object.keys(errors).length > 0;
        const isEmpty = Object.values(formData).every((field) => field === '');        


    return (
        <form onSubmit={(e) => { handleSubmit(e); route.push('/Projects'); }}>
            <div className='w-[25rem] space-y-5'>
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
                    {touched.name && errors.name && <p className="text-red-500 text-xs text-left">{errors.name}</p>}
                </div>
                <div>
                    <p className='subHeader'>Project Type</p>
                    <select
                    className={`h-8 w-full flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.type && errors.type ? 'border-red-500' : 'border-slate-200'}`}
                    name="type"
                    value={formData.type} // Controlled component, bind to formData
                    onChange={handleChange}
                    onBlur={() => handleBlur('type')}
                    >
                        <option value={projecttypeOptions.SELECT} disabled>
                            {projecttypeOptions.SELECT}
                        </option>
                        <option value={'BUILD'}>
                            Build
                        </option>
                        <option value={'DESIGN'}>
                            Design + Build
                        </option>
                        <option value={'DESIGN'}>
                            Design
                        </option>
                    </select>
                    {touched.type && errors.type && <p className="text-red-500 text-xs mt-1 text-left">{errors.type}</p>}
                </div>
                <div className="grid w-full max-w-sm items-center">
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
                    <p className='subHeader'>Client</p>
                    <select 
                    className={`h-8 w-full flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.id && errors.id ? 'border-red-500' : 'border-slate-200'}`}
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    onBlur={() => handleBlur('id')}
                    >
                        <option value={clientOptions.SELECT} disabled>
                            {clientOptions.SELECT}
                        </option>
                        {clients.map((client, i) => (
                            <option key={i} value={client.id}>
                                {client.lastname + ', ' + client.firstname + ' ' + client.middlename}
                            </option>
                        ))}
                    </select>
                {touched.id && errors.id && <p className="text-red-500 text-xs mt-1 text-left">{errors.id}</p>}
                <div className='flex flex-row space-x-3 mt-6 justify-between'>
                    <div>
                        <p className='subHeader'>Start Date</p>
                        <input
                            className={`h-8 w-[11rem] flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.startDate && errors.startDate ? 'border-red-500' : 'border-slate-200'}`}
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            onBlur={() => handleBlur('startDate')}
                        />
                        {touched.startDate && errors.startDate && <p className="text-red-500 text-xs mt-1 text-left">{errors.startDate}</p>}
                    </div>
                    <div>
                        <p className='subHeader'>End Date</p>
                        <input
                            className={`h-8 w-[11rem] flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.endDate && errors.endDate ? 'border-red-500' : 'border-slate-200'}`}
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            onBlur={() => handleBlur('endDate')}
                        />
                        {touched.endDate && errors.endDate && <p className="text-red-500 text-xs mt-1 text-left">{errors.endDate}</p>}
                    </div>

                </div>
            </div>
            </div>
            
            <button 
            className={`mt-12 text-sm px-4 py-1 rounded-lg text-white ${hasErrors || isEmpty ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-600'}`}
            type="submit"
            disabled={hasErrors || isEmpty}
            >
                Create Project
          </button>
        {errors.submit && <p className='text-red-500 text-xs mt-1 text-left'>{errors.submit}</p>}
        </form>
    )
}

export default AddProjectForm
