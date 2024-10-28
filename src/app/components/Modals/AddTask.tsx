import { createTask } from '@/actionsSupabase/Create';
import React, { useState } from 'react'
import { revalidatePath } from 'next/cache';

const AddTask = async ({data, projID}) => {
    const [formData, setFormData] = useState({
        priority: '',
        taskname: '',
        deadline: '',
    })

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});

        //Validate input on change
        if (touched[name]) {
            const newErrors = validateInputs({...formData, [name]: value});
            setErrors(newErrors);
        }
    };

    const handleBlur = (name: string) => {
        setTouched({...touched, [name]: true}) //Mark field as touched on blur
        const newErrors = validateInputs(formData);
        setErrors(newErrors); //Validate inputs when user leaves the field
    };

    const validateInputs = (data: typeof formData) => {
        const newErrors: {[key: string]: string} = {};
        const priorityValue = Number(data.priority);
        if (priorityValue <= 0) newErrors.priority = 'Priority should be more than 0';
        if (!data.taskname) newErrors.taskname = 'Task name is required';
        if (!data.deadline) newErrors.deadline = 'Deadline is required';
    }


    return (
        <form action={async e => {'use server'; await createTask(e, data, projID)}}>
        <div className='flex flex-row justify-evenly space-x-3'>
            <div>
                <p className='text-xs font-bold flex mb-1'>Priority</p>
                <input className='w-16 flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm' 
                       type="number" name='priority' defaultValue={0} />
            </div>
            
            <div>
                <p className='text-xs font-bold flex mb-1'>Task Name</p>
                <input className='w-64 flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm' 
                       type="text" name='taskName' placeholder=''/>
            </div>
            
            <div>
                <p className='text-xs font-bold flex mb-1'>Deadline</p>
                <input className='w-30 flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm' 
                       type="date" name='deadline'/>
            </div>
        </div>
        <div className='mt-3'>
            <p className='text-xs font-bold flex mb-1'>Description</p>
            <textarea className='resize-none w-full flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm h-20'
                    name='description' placeholder='Description'/>
        </div>

        <button className='mt-8 text-sm px-4 py-1 bg-pink-600 rounded-lg text-white' type="submit">Add</button>
    </form>
    )
  }

export default AddTask