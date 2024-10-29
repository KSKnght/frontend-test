'use client';

import { addPhase } from '@/actionsSupabase/Create'
import { revalidatePath } from 'next/cache';
import React, { startTransition, useState } from 'react'


const AddPhase = ({data}) => {
  
  const [formData, setFormData] = useState({
    phasename: '',
    priority: ''
  })  
  
const [errors, setErrors] = useState<{ [key: string]: string }>({});
const [touched, setTouched] = useState<{ [key: string]: boolean }>({}); // Track if input has been touched

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });

    // Validate input on change
    if (touched[name]) {
      const newErrors = validateInputs({ ...formData, [name]: value });
      setErrors(newErrors); // Update errors state
    }
  };

const handleBlur = (name: string) => {
  setTouched({ ...touched, [name]: true }); // Mark field as touched on blur
  const newErrors = validateInputs(formData);
  setErrors(newErrors); // Validate inputs when user leaves the field
};

const validateInputs = (data: typeof formData) => {
  console.log('Validating:', data); 
  const newErrors: {[key: string]: string} = {};
  if (!data.phasename) newErrors.phasename = 'Phase name is required';
  if (!data.priority) newErrors.priority = 'Priority is required';
  if (Number(data.priority) <= 0) newErrors.priority = 'Priority must be over 0';

  return newErrors;
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const validationErrors = validateInputs(formData);
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  // Reset errors and proceed with the submission
  const formDataToSend = new FormData(e.currentTarget);
  setErrors({});
  
  startTransition(async () => {
    try {
      console.log('Sending data to create phase:', formDataToSend);
      await addPhase(formDataToSend, data);
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to create phase. Please try again.' });
    }
  });
  
};

const hasErrors = Object.keys(errors).length > 0;
const isEmpty = Object.values(formData).every(field => field === '');


  return (
    <form onSubmit={handleSubmit}>
        <div className='flex flex-row space-x-4'>
            <div>
              <p className='text-slate-700 flex text-xs font-bold mb-1'>Phase Name</p>
              <input 
                className={`h-6 w-full flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.phasename && errors.phasename ? 'border-red-500' : 'border-slate-200'}`}
                type="text"
                name='phasename'
                value={formData.phasename}
                onChange={handleChange}
                onBlur={() => handleBlur('phasename')}
              />
            {touched.phasename && errors.phasename && <p className='text-red-500 text-xs mt-1 text-left'>{errors.phasename}</p>}
            </div>
            
            <div>
              <p className='text-slate-700 flex text-xs font-bold mb-1'>Priority</p>
                <input 
                  className={`h-6 w-auto flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.priority && errors.priority ? 'border-red-500' : 'border-slate-200'}`}
                  type="number"
                  name='priority'
                  value={formData.priority}
                  onChange={handleChange}
                  onBlur={() => handleBlur('priority')}
                />
              {touched.priority && errors.priority && <p className='text-red-500 text-xs mt-1 text-left'>{errors.priority}</p>}              </div>
          </div>
        <button 
          className={`mt-8 text-sm px-4 py-1 rounded-lg text-white ${hasErrors || isEmpty ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-600'}`}
          type="submit"
          disabled={hasErrors || isEmpty}
          >
            Submit
          </button>
        {errors.submit && <p className='text-red-500 text-xs mt-1 text-left'>{errors.submit}</p>}
    </form>
  )
}

export default AddPhase