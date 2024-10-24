// src/components/AddClientForm.tsx

'use client'; // Mark this as a client component

import React, { useState } from 'react';
import { createClient } from '@/actionsSupabase/Create';
import { revalidatePath } from 'next/cache';

const AddClientForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    contactNum: '',
    emailAdd: ''
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateInputs = () => {
    const newErrors: string[] = [];
    if (!formData.firstname) newErrors.push('First name is required');
    if (!formData.lastname) newErrors.push('Last name is required');
    if (!/^\d{11}$/.test(formData.contactNum)) newErrors.push('Contact number must be 11 digits');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAdd)) newErrors.push('Invalid email format');
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Reset errors and proceed with the submission
    setErrors([]);
    const response = await createClient(new FormData(e.currentTarget)); // pass FormData for server action
    if (response.success) {
      revalidatePath('/Clients');
    } else {
      // Handle server errors if needed
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-row justify-evenly space-x-3'>
        <div>
          <p className='text-xs font-bold flex mb-1'>First Name</p>
          <input className='h-6 w-full flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                 type="text" name='firstname' value={formData.firstname} onChange={handleChange} />
        </div>
        <div>
          <p className='text-xs font-bold flex mb-1'>Middle Name</p>
          <input className='h-6 w-full flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                 type="text" name='middlename' value={formData.middlename} onChange={handleChange} />
        </div>
        <div>
          <p className='text-xs font-bold flex mb-1'>Last Name</p>
          <input className='h-6 w-full flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                 type="text" name='lastname' value={formData.lastname} onChange={handleChange} />
        </div>
      </div>

      <div className='flex flex-row justify-between space-x-3 mt-3'>
        <div>
          <p className='text-xs font-bold flex mb-1'>Contact Number</p>
          <input className='h-6 w-72 flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                 type="text" name='contactNum' value={formData.contactNum} onChange={handleChange} />
        </div>
        <div>
          <p className='text-xs font-bold flex mb-1'>Email Address</p>
          <input className='h-6 w-72 flex border border-slate-200 focus:outline-pink-600 rounded-lg pl-1 text-sm'
                 type="text" name='emailAdd' value={formData.emailAdd} onChange={handleChange} placeholder='e.g. user@email.com' />
        </div>
      </div>

      {errors.length > 0 && (
        <div className='text-red-500 text-sm mt-2'>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <button className='mt-8 text-sm px-4 py-1 bg-pink-600 rounded-lg text-white' type='submit'>
        Create Client
      </button>
    </form>
  );
};

export default AddClientForm;
