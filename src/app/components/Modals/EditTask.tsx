'use client';

import { getTask } from '@/actionsSupabase/read';
import { updateTask } from '@/actionsSupabase/Update';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { taskSchema } from '../formSchema';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

interface TaskData {
  id: number;
  taskname: string;
  priority: number;
  deadline: string;
  description: string;
}

const EditTask = ({ data, project }) => {
  const [task, setTask] = useState<TaskData | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean}>({})
  const [formData, setFormData] = useState<TaskData>({
    id: 0,
    taskname: '',
    priority: 0,
    deadline: '',
    description: '',
  });

  const route = useRouter();

  // Fetch task data
  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        console.log("Fetching task for ID:", data); // Debugging
        const fetchedTask = await getTask(Number(data));
        console.log("Fetched task data:", fetchedTask); // Debugging
        if (fetchedTask) {
          setTask({
            id: fetchedTask.id,
            taskname: fetchedTask.taskName || '', // Adjust to match actual data keys
            priority: fetchedTask.priority || 0,
            deadline: fetchedTask.deadline || '',
            description: fetchedTask.description || '',
          });
        }
      } catch (err) {
        console.error("Error fetching task data:", err);
      }
    };

    fetchTaskData();
  }, [data]);

  // Update formData when task is fetched
  useEffect(() => {
    if (task) {
      console.log("Setting formData with task:", task); // Debugging
      setFormData(task);
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'priority' ? Number(value) : value,
    }));
  };

  // Mark input as touched on blur and validate
  const handleBlur = (name: keyof TaskData) => {
    setTouched({ ...touched, [name]: true }); // Mark field as touched on blur
    validateForm(formData); // Validate the entire form on blur
  };

  // Validation function
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

    try {
      taskSchema.parse(formData);
      setErrors({});

      const formDataToSend = new FormData(e.currentTarget);
      const response = await updateTask(formDataToSend, formData.id, project);

      if (response.success) {
        await revalidatePath('/Projects/' + project + '/view');
        await revalidatePath('/Projects/' + project + '/view??edittask='+formData.id);

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
        setErrors({ submit: 'An unexpected error occurred. Please try again.' });
      }
    }
  };

  const hasErrors = Object.keys(errors).length > 0;
  const isEmpty = Object.values(formData).every((field) => field === '');

  return (
    <form action={async (e) => {handleSubmit}}>
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
            Update Task
          </button>
        {errors.submit && <p className='text-red-500 text-xs mt-1 text-left'>{errors.submit}</p>}
    </form>
    )
  }

export default EditTask;
