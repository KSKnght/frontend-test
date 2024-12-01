'use client'

import React, { useEffect, useState } from 'react'
import { DateSchema, moveProjectSchema, projectformSchema } from '../formSchema';
import { z } from 'zod';
import { extendProjectEndDate, moveProjectDate } from '@/actionsSupabase/Update';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { getInfoProject, getProjectDate } from '@/actionsSupabase/read';

interface DateData {
  id: number;
  startDate: any;
  endDate: any;
}

const MoveProject = ({data, id}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean}>({})
  const [formData, setFormData] = useState<DateData>({
    id: id,
    startDate: new Date(data[0].startDate),
    endDate: new Date(data[0].endDate)
  });
  
  const route = useRouter();

  console.log(formData.id)
  console.log(formData.startDate)
  console.log(formData.endDate)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'startDate' || name === 'endDate' ? new Date(value) : value,
    }));
    if (touched[name]) {
      validateForm({ ...formData, [name]: new Date(value) });
    }
  };

  console.log(new Date(formData.startDate).toISOString().substring(0,10))

  const handleBlur = (name: keyof DateData) => {
    setTouched({ ...touched, [name]: true }); // Mark field as touched on blur
    validateForm(formData); // Validate the entire form on blur
  };

  const validateForm = (data: DateData) => {
    try {
      moveProjectSchema.parse(data); // Validate with Zod
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
      moveProjectSchema.parse(formData);
      const response = await moveProjectDate(formData.startDate, formData.endDate, id);
      if (response.success == false) {
        setErrors({ submit: 'Invalid Range' })
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
  const isEmpty = Object.values(formData).every(field => field === '');

  return (
    <form onSubmit={(e) => { handleSubmit(e)}}>
        <div className='flex flex-row space-x-6'>
            <div>
                <p className='text-xs font-bold flex mb-1'>Start Date</p>
                <input 
                    className={`h-6 w-auto flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.startDate && errors.startDate ? 'border-red-500' : 'border-slate-200'}`}
                    type="date" 
                    name='startDate' 
                    value={new Date(formData.startDate).toISOString().substring(0,10)}
                    onChange={handleChange}
                    onBlur={() => handleBlur('startDate')}
                />
                {touched.startDate && errors.startDate && <p className='text-red-500 text-xs mt-1 text-left'>{errors.startDate}</p>} 
            </div>
            <div>
                <p className='text-xs font-bold flex mb-1'>End Date</p>
                <input 
                    className={`h-6 w-auto flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.endDate && errors.endDate ? 'border-red-500' : 'border-slate-200'}`}
                    type="date" 
                    name='endDate' 
                    value={new Date(formData.endDate).toISOString().substring(0,10)}
                    onChange={handleChange}
                    onBlur={() => handleBlur('endDate')}
                />
                {touched.endDate && errors.endDate && <p className='text-red-500 text-xs mt-1 text-left'>{errors.endDate}</p>} 
            </div>
        </div>
        {errors.submit && <p className='text-red-500 text-xs mt-1 text-left'>{errors.submit}</p>}
        <button 
          className={`mt-8 text-sm px-4 py-1 rounded-lg text-white ${hasErrors || isEmpty ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-600'}`} type="submit"
          disabled={hasErrors || isEmpty}
        >
            Move Project
        </button>
      </form>
  )
}

export default MoveProject
