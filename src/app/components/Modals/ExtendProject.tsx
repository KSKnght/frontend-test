'use client'

import React, { useEffect, useState } from 'react'
import { projectformSchema } from '../formSchema';
import { z } from 'zod';
import { extendProjectEndDate } from '@/actionsSupabase/Update';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { getInfoProject } from '@/actionsSupabase/read';

interface DateData {
  id: number;
  startDate: string;
  endDate: string;
}

const ExtendProject = (data, projID) => {
  const [date, setDate] = useState<DateData | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean}>({})
  const [formData, setFormData] = useState<DateData>({
    id: 0,
    startDate: '',
    endDate: ''
  });
  
  const route = useRouter();

  useEffect(() => {
    console.log(data)
    const fetchDateData = async () => {
      try {
        console.log("Fetching date for ID:", data); // Debugging
        const fetchedDate = await getInfoProject(Number(data));
        console.log("Fetched date data:", fetchedDate); // Debugging
        if (fetchedDate) {
          setDate({
            id: fetchedDate.id,
            startDate: fetchedDate.taskName || '', // Adjust to match actual data keys
            endDate: fetchedDate.priority || '',
          });
        }
      } catch (err) {
        console.error("Error fetching date data:", err);
      }
    };

    fetchDateData();
  }, [data]);


  useEffect(() => {
    if (date) {
      console.log("Setting formData with date:", date); // Debugging
      setFormData(date);
    }
  }, [date]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'priority' ? Number(value) : value,
    }));
  };

  const handleBlur = (name: keyof DateData) => {
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
      const response = await extendProjectEndDate(formDataToSend, projID);

      if (response.success) {
        revalidatePath('/Projects/' + projID + '/view');
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

  return (
    <form onSubmit={(e) => { handleSubmit(e); route.push('/Projects/' + projID + '/view'); }}>
        <div className='flex flex-row space-x-6'>
            <div>
                <p className='text-xs font-bold flex mb-1'>Start Date</p>
                <input type='date' className='`h-6 w-auto flex border disabled:outline-slate-500 disabled:bg-slate-300 disabled:text-slate-500 rounded-lg pl-1 text-sm' disabled></input>
            </div>
            <div>
                <p className='text-xs font-bold flex mb-1'>End Date</p>
                <input 
                    className={`h-6 w-auto flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.endDate && errors.priority ? 'border-red-500' : 'border-slate-200'}`}
                    type="date" 
                    name='priority' 
                    value={formData.endDate} 
                    onChange={handleChange}
                    onBlur={() => handleBlur('endDate')}
                />
                {touched.endDate && errors.endDate && <p className='text-red-500 text-xs mt-1 text-left'>{errors.endDate}</p>} 
            </div>
        </div>
        <button 
          className={`mt-8 text-sm px-4 py-1 rounded-lg text-white bg-pink-600`}
          type="submit"
          >
            Extend Project
        </button>
      </form>
  )
}

export default ExtendProject
