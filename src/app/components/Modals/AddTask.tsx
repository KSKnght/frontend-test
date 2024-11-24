'use client';

import { createTask } from '@/actionsSupabase/Create';
import React, { startTransition, useState } from 'react'
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { taskSchema } from '../formSchema';
import { z } from 'zod';

const AddTask = ({data, projID, project}) => {

    const [formData, setFormData] = useState({
        taskname: '',
        priority: 0,
        deadline: '',
        description: ''
      })

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const route = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
  
      // Convert priority to a number, keep others as strings
      setFormData({
        ...formData,
        [name]: name === 'priority' ? Number(value) : value,
      });
  
      if (touched[name]) {
        validateForm({ ...formData, [name]: name === 'priority' ? Number(value) : value });
      }
    };

    const handleBlur = (name: string) => {
        setTouched({ ...touched, [name]: true }); // Mark field as touched on blur
        validateForm(formData);
    };

    const validateForm = (data: typeof formData) => {
      try {
        taskSchema.parse(data); // Validate with Zod
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
  

    // Final validation on submit
    try {
        taskSchema.parse(formData); // Validate form data with Zod
        setErrors({}); // Clear errors if valid

        const formDataToSend = new FormData(e.currentTarget);
        const response = await createTask(formDataToSend, data, projID);

        if (response.success) {
          revalidatePath('/Projects/' + project + '/view');
        } else {
          setErrors({ submit: 'Failed to create task. Please try again.' });
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldErrors: { [key: string]: string } = {};
          error.errors.forEach((err) => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors); // Set errors from Zod validation
        } else {
          setErrors({ submit: 'An unexpected error occurred. Please try again.' });
        }
      }
    };
    
    const hasErrors = Object.keys(errors).length > 0;
    const isEmpty = Object.values(formData).every(field => field === '');



    return (
        <form onSubmit={handleSubmit}>
        <div className='flex flex-row justify-evenly space-x-3'>
            <div>
                <p className='text-xs font-bold flex mb-1'>Priority*</p>
                <input 
                    className={`h-6 w-auto flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.priority && errors.priority ? 'border-red-500' : 'border-slate-200'}`}
                    type="number" 
                    name='priority' 
                    value={formData.priority} 
                    onChange={handleChange}
                    onBlur={() => handleBlur('priority')}
                />
                {touched.priority && errors.priority && <p className='text-red-500 text-xs mt-1 text-left'>{errors.priority}</p>} 
            </div>
            
            <div>
                <p className='text-xs font-bold flex mb-1'>Task Name*</p>
                <input 
                    className={`h-6 w-auto flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.taskname && errors.taskname ? 'border-red-500' : 'border-slate-200'}`}
                    type="text" 
                    name='taskname' 
                    value={formData.taskname} 
                    onChange={handleChange}
                    onBlur={() => handleBlur('taskname')}
                />
                {touched.taskname && errors.taskname && <p className='text-red-500 text-xs mt-1 text-left'>{errors.taskname}</p>} 
            </div>
            
            <div>
                <p className='text-xs font-bold flex mb-1'>Deadline*</p>
                <input 
                    className={`h-6 w-auto flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.deadline && errors.deadline ? 'border-red-500' : 'border-slate-200'}`}
                    type="date" 
                    name='deadline'
                    value={formData.deadline} 
                    onChange={handleChange}
                    onBlur={() => handleBlur('deadline')}
                />
                {touched.deadline && errors.deadline && <p className='text-red-500 text-xs mt-1 text-left'>{errors.deadline}</p>} 
            </div>
        </div>
        <div className='mt-3'>
            <p className='text-xs font-bold flex mb-1'>Description</p>
            <textarea className='resize-none w-full flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm h-20'
                    name='description' placeholder='Add description of the task'/>
        </div>

        <button 
          className={`mt-8 text-sm px-4 py-1 rounded-lg text-white ${hasErrors || isEmpty ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-600'}`}
          type="submit"
          disabled={hasErrors || isEmpty}
          >
            Add Task
          </button>
        {errors.submit && <p className='text-red-500 text-xs mt-1 text-left'>{errors.submit}</p>}
    </form>
    )
  }

export default AddTask