'use client'; // Mark this as a client component

import React, { useState } from 'react';
import { createClient } from '@/actionsSupabase/Create';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/dist/server/api-utils';

const AddClientForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    contactNum: '',
    emailAdd: ''
  });

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
    const newErrors: { [key: string]: string } = {};

    if (!data.firstname) newErrors.firstname = 'First name is required';
    if (!data.lastname) newErrors.lastname = 'Last name is required';
    if (!data.middlename) newErrors.middlename = 'Middle name is required';
    if (!data.contactNum) {
      newErrors.contactNum = 'Contact number is required';
    } else {
      if (!/^09|^\+63/.test(data.contactNum)) {
        newErrors.contactNum = 'Contact number must start with "09" or "+63"';
      } else {
        if (data.contactNum.startsWith("09") && data.contactNum.length !== 11) {
          newErrors.contactNum = 'Contact number must be 11 digits if starting with "09"';
        } else if (data.contactNum.startsWith("+63") && data.contactNum.length !== 13) {
          newErrors.contactNum = 'Contact number must be 13 digits if starting with "+63"';
        }
      }
    }
  
    if (!data.emailAdd) {
      newErrors.emailAdd = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailAdd)) {
      newErrors.emailAdd = 'Invalid email format';
    }

    return newErrors;
  };

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
    
    try {
      const response = await createClient(formDataToSend); // pass FormData for server action
      if (response.success) {
        revalidatePath('/Clients');
      } else {
        setErrors({ submit: 'Failed to create client. Please try again.' }); // Handle error from server
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred. Please try again.' }); // Catch any unexpected errors
    }
    
  };

  const hasErrors = Object.keys(errors).length > 0; // Check if there are any errors
  const isEmpty = Object.values(formData).every(field => field === ''); // Check if all fields are empty

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-row justify-evenly space-x-3'>
        <div>
          <p className='text-xs font-bold flex mb-1'>First Name*</p>
          <input
            className={`h-8 w-full flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.firstname && errors.firstname ? 'border-red-500' : 'border-slate-200'}`}
            type="text" name='firstname' value={formData.firstname} onChange={handleChange} onBlur={() => handleBlur('firstname')}
          />
          {touched.firstname && errors.firstname && <p className='text-red-500 text-xs mt-1 text-left'>{errors.firstname}</p>}
        </div>
        <div>
          <p className='text-xs font-bold flex mb-1'>Middle Name*</p>
          <input
            className={`h-8 w-full flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.middlename && errors.middlename ? 'border-red-500' : 'border-slate-200'}`}
            type="text" name='middlename' value={formData.middlename} onChange={handleChange} onBlur={() => handleBlur('middlename')}
          />
          {touched.middlename && errors.middlename && <p className='text-red-500 text-xs mt-1 text-left'>{errors.middlename}</p>}
        </div>
        <div>
          <p className='text-xs font-bold flex mb-1'>Last Name*</p>
          <input
            className={`h-8 w-full flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.lastname && errors.lastname ? 'border-red-500' : 'border-slate-200'}`}
            type="text" name='lastname' value={formData.lastname} onChange={handleChange} onBlur={() => handleBlur('lastname')}
          />
          {touched.lastname && errors.lastname && <p className='text-red-500 text-xs mt-1 text-left'>{errors.lastname}</p>}
        </div>
      </div>

      <div className='flex flex-row justify-between space-x-3 mt-3'>
        <div>
          <p className='text-xs font-bold flex mb-1'>Contact Number*</p>
          <input
            className={`h-8 w-72 flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.contactNum && errors.contactNum ? 'border-red-500' : 'border-slate-200'}`}
            type="text" name='contactNum' value={formData.contactNum} onChange={handleChange} onBlur={() => handleBlur('contactNum')}
          />
          {touched.contactNum && errors.contactNum && <p className='text-red-500 text-xs mt-1 text-left text-wrap'>{errors.contactNum}</p>}
        </div>
        <div>
          <p className='text-xs font-bold flex mb-1'>Email Address*</p>
          <input
            className={`h-8 w-72 flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.emailAdd && errors.emailAdd ? 'border-red-500' : 'border-slate-200'}`}
            type="text" name='emailAdd' value={formData.emailAdd} onChange={handleChange} onBlur={() => handleBlur('emailAdd')}
            placeholder='e.g. user@email.com'
          />
          {touched.emailAdd && errors.emailAdd && <p className='text-red-500 text-xs mt-1 text-left'>{errors.emailAdd}</p>}
        </div>
      </div>

      <button
        className={`mt-8 text-sm px-4 py-1 rounded-lg text-white ${hasErrors || isEmpty ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-600'}`}
        type='submit'
        disabled={hasErrors || isEmpty} // Disable the button if there are errors or if all fields are empty
      >
        Create Client
      </button>
    </form>
  );
};

export default AddClientForm;
