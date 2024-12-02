'use client';

import { createTask } from '@/actionsSupabase/Create';
import React, { startTransition, useState } from 'react'
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

function validateDeadline_End(deadline: string, endDate: string): boolean {
  const deadlineDate = new Date(deadline).getTime();
  const endDateParsed = new Date(endDate).getTime();
  return deadlineDate <= endDateParsed;
}

function validateDeadline_Start(deadline: string, startDate: string): boolean {
  const deadlineDate = new Date(deadline).getTime();
  const startDateParsed = new Date(startDate).getTime();
  return deadlineDate >= startDateParsed;
}

const AddTask = ({data, projID, endDate, startDate}) => {
    const [formData, setFormData] = useState({
        taskName: '',
        deadline: '',
        description: ''
      })
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const route = useRouter();

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

    const handleBlur = (name: string) => {
        setTouched({ ...touched, [name]: true }); // Mark field as touched on blur
        validateForm(formData);
    };

    async function validateForm(formData: any) {
      const fieldErrors: { [key: string]: string } = {};

      if (!formData.taskName.trim()) {
        fieldErrors.taskName = 'Task Name is required';
      }
  
      if (!formData.deadline) {
        fieldErrors.deadline = 'Deadline is required';
      } else {
        if (!validateDeadline_End(formData.deadline, endDate)) {
          fieldErrors.deadline = 'Deadline must not be after the project end date';
        }
        if (!validateDeadline_Start(formData.deadline, startDate)) {
          fieldErrors.deadline = 'Deadline must not be before the project start date';
        }
      }

      setErrors(fieldErrors);
      return Object.keys(fieldErrors).length === 0;
    };
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm(formData)) {
          return;
        }

        if (Object.keys(errors).length > 0) {
          return; 
        }

        try {
            const formDataToSend = new FormData(e.currentTarget);
            const response = await createTask(formDataToSend, data, projID);
          
            if (response.success === true) {
              revalidatePath('/Projects/' + projID + '/view');
              route.push(`/Projects/${projID}/view`);
            } else {
              setErrors({ submit: 'Failed to create project. Please try again.' });
            }
          } catch (error) {
          }
    }

    const hasErrors = Object.keys(errors).length > 0;
    const isEmpty = Object.values(formData).every(field => field === '');



    return (
      <form onSubmit={(e) => { handleSubmit(e); route.push('/Projects/' + projID + '/view'); }}>
        <div className='flex flex-row justify-evenly space-x-3'>
            
            <div>
                <p className='text-xs font-bold flex mb-1'>Task Name*</p>
                <input 
                    className={`h-6 w-auto flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.taskName && errors.taskName ? 'border-red-500' : 'border-slate-200'}`}
                    type="text" 
                    name='taskName' 
                    value={formData.taskName} 
                    onChange={handleChange}
                    onBlur={() => handleBlur('taskName')}
                />
                {touched.taskName && errors.taskName && <p className='text-red-500 text-xs mt-1 text-left'>{errors.taskName}</p>} 
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