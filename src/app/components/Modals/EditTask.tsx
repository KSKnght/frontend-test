'use client';

import { getTask } from '@/actionsSupabase/read';
import { updateTask } from '@/actionsSupabase/Update';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
// import { taskSchema } from '../formSchema';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

interface TaskData {
  id: number;
  taskName: string;
  deadline: string;
  description: string;
}

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


const EditTask = ({ data, project, endDate, startDate }) => {
  const [task, setTask] = useState<TaskData | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean}>({})
  const [formData, setFormData] = useState<TaskData>({
    id: 0,
    taskName: '',
    deadline: '',
    description: '',
  });

  const route = useRouter();

  // Fetch task data
  useEffect(() => {
    console.log(data)
    const fetchTaskData = async () => {
      try {
        console.log("Fetching task for ID:", data); // Debugging
        const fetchedTask = await getTask(Number(data));
        console.log("Fetched task data:", fetchedTask); // Debugging
        if (fetchedTask) {
          setTask({
            id: fetchedTask.id,
            taskName: fetchedTask.taskName || '', // Adjust to match actual data keys
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
  const validateForm = (data: TaskData) => {
    const fieldErrors: { [key: string]: string } = {};

    if (!data.taskName.trim()) {
      fieldErrors.taskName = 'Task Name is required';
    }

    if (!data.deadline) {
      fieldErrors.deadline = 'Deadline is required';
    } else {
      if (!validateDeadline_End(data.deadline, endDate)) {
        fieldErrors.deadline = 'Deadline must not be after the project end date';
      }
      if (!validateDeadline_Start(data.deadline, startDate)) {
        fieldErrors.deadline = 'Deadline must not be before the project start date';
      }
    }

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      return; // Exit if validation fails
    }

    try {
      const formDataToSend = new FormData(e.currentTarget);
      const response = await updateTask(formDataToSend, formData.id, project);

      if (response.success) {
        revalidatePath('/Projects/' + project + '/view');
        route.push('/Projects/' + project + '/view');
      } else {
        setErrors({ submit: 'Failed to update task. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred. Please try again later.' });
    }
  };

  const hasErrors = Object.keys(errors).length > 0;
  const isEmpty = Object.values(formData).every((field) => field === '');

  return (
    <form onSubmit={(e) => { handleSubmit(e); route.push('/Projects/' + project + '/view'); }}>
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
            Update Task
          </button>
        {errors.submit && <p className='text-red-500 text-xs mt-1 text-left'>{errors.submit}</p>}
    </form>
    )
  }

export default EditTask;
