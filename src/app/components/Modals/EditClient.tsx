'use client'; // Add this line to make this component a Client Component

import React, { useState, useEffect, useTransition, startTransition } from 'react';
import { revalidatePath } from 'next/cache';
import { updateClient } from '@/actionsSupabase/Update';
import { showClient } from '@/actionsSupabase/read';
import { Router, useRouter } from 'next/router';
import { redirect } from 'next/dist/server/api-utils';

// Define the shape of the client data
interface ClientData {
  id: number; // Add id property
  firstname: string;
  middlename: string;
  lastname: string;
  contactNum: string;
  emailAdd: string;
}

const EditClient = ({ data }) => {
  const [client, setClient] = useState<ClientData | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({}); // Track if input has been touched
  const [formData, setFormData] = useState<ClientData>({
    id: 0, // Initialize id (you may change this as needed)
    firstname: '',
    middlename: '',
    lastname: '',
    contactNum: '',
    emailAdd: ''
  });

  // Fetch client data on mount
  useEffect(() => {
    const fetchClientData = async () => {
      const fetchedClient = await showClient(Number(data));
      if (fetchedClient.length > 0) {
        setClient(fetchedClient[0]);
      }
    };

    fetchClientData();
  }, [data]);

  // Update formData when client data is fetched
  useEffect(() => {
    if (client) {
      setFormData({
        id: client.id, // Include the id in formData
        firstname: client.firstname || '',
        middlename: client.middlename || '',
        lastname: client.lastname || '',
        contactNum: client.contactNum || '',
        emailAdd: client.emailAdd || ''
      });
    }
  }, [client]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Validate input on change if touched
    if (touched[name]) {
      const newErrors = validateInputs({ ...formData, [name]: value });
      setErrors(newErrors);
    }
  };

  // Mark input as touched on blur and validate
  const handleBlur = (name: keyof ClientData) => {
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    const newErrors = validateInputs(formData);
    setErrors(newErrors);
  };

  // Validation function
  const validateInputs = (data: ClientData) => {
    const newErrors: { [key: string]: string } = {};
    if (!data.firstname) newErrors.firstname = 'First name is required';
    if (!data.lastname) newErrors.lastname = 'Last name is required';
    if (!data.middlename) newErrors.middlename = 'Middle name is required';
    if (!data.contactNum) newErrors.contactNum = 'Contact number is required';
    if (!data.emailAdd) newErrors.emailAdd = 'Email address is required';
    if (!/^\d{11}$/.test(data.contactNum)) newErrors.contactNum = 'Contact number must be 11 digits';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailAdd)) newErrors.emailAdd = 'Invalid email format';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateInputs(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Reset errors and proceed with submission
    const formDataToSend = new FormData(e.currentTarget);
    setErrors({});

    startTransition(async () => {
      try {
        console.log('Sending data to update client:', formDataToSend);
        await updateClient(formDataToSend, client.id); // Update client details
      } catch (error) {
        setErrors({ submit: error.message || 'Failed to update client. Please try again.' });
      }
    });

  };

  const hasErrors = Object.keys(errors).length > 0;
  const isEmpty = Object.values(formData).every(field => field === '');

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-row justify-evenly space-x-3'>
        <div>
          <p className='text-xs font-bold flex mb-1'>First Name</p>
          <input
            className={`h-6 w-full flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.firstname && errors.firstname ? 'border-red-500' : 'border-slate-200'}`}
            type="text"
            name='firstname'
            value={formData.firstname}
            onChange={handleChange}
            onBlur={() => handleBlur('firstname')}
          />
          {touched.firstname && errors.firstname && <p className='text-red-500 text-xs mt-1 text-left'>{errors.firstname}</p>}
        </div>
        <div>
          <p className='text-xs font-bold flex mb-1'>Middle Name</p>
          <input
            className={`h-6 w-full flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.middlename && errors.middlename ? 'border-red-500' : 'border-slate-200'}`}
            type="text"
            name='middlename'
            value={formData.middlename}
            onChange={handleChange}
            onBlur={() => handleBlur('middlename')}
          />
          {touched.middlename && errors.middlename && <p className='text-red-500 text-xs mt-1 text-left'>{errors.middlename}</p>}
        </div>
        <div>
          <p className='text-xs font-bold flex mb-1'>Last Name</p>
          <input
            className={`h-6 w-full flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.lastname && errors.lastname ? 'border-red-500' : 'border-slate-200'}`}
            type="text"
            name='lastname'
            value={formData.lastname}
            onChange={handleChange}
            onBlur={() => handleBlur('lastname')}
          />
          {touched.lastname && errors.lastname && <p className='text-red-500 text-xs mt-1 text-left'>{errors.lastname}</p>}
        </div>
      </div>

      <div className='flex flex-row justify-between space-x-3 mt-3'>
        <div>
          <p className='text-xs font-bold flex mb-1'>Contact Number</p>
          <input
            className={`h-6 w-72 flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.contactNum && errors.contactNum ? 'border-red-500' : 'border-slate-200'}`}
            type="text"
            name='contactNum'
            value={formData.contactNum}
            onChange={handleChange}
            onBlur={() => handleBlur('contactNum')}
          />
          {touched.contactNum && errors.contactNum && <p className='text-red-500 text-xs mt-1 text-left'>{errors.contactNum}</p>}
        </div>
        <div>
          <p className='text-xs font-bold flex mb-1'>Email Address</p>
          <input
            className={`h-6 w-72 flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.emailAdd && errors.emailAdd ? 'border-red-500' : 'border-slate-200'}`}
            type="text"
            name='emailAdd'
            value={formData.emailAdd}
            onChange={handleChange}
            onBlur={() => handleBlur('emailAdd')}
            placeholder='e.g. user@email.com'
          />
          {touched.emailAdd && errors.emailAdd && <p className='text-red-500 text-xs mt-1 text-left'>{errors.emailAdd}</p>}
        </div>
      </div>

      <button
        className={`mt-8 text-sm px-4 py-1 rounded-lg text-white ${hasErrors || isEmpty ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-600'}`}
        type='submit'
        disabled={hasErrors || isEmpty}
      >
        Save Changes
      </button>
      {errors.submit && <p className='text-red-500 text-xs mt-1 text-left'>{errors.submit}</p>}
    </form>
  );
};

export default EditClient;
