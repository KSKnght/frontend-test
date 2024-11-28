'use client'; // Mark this as a client component

import React, { startTransition, use, useEffect, useState } from 'react';
import { createClient } from '@/actionsSupabase/Create';
import { revalidatePath } from 'next/cache';
import { redirect, useRouter } from 'next/navigation';
import { clientformSchema } from '../formSchema';
import { z } from 'zod';
import { duplicateClientCheck } from '@/actionsSupabase/validation';

const AddClientForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    contactNum: '',
    emailAdd: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const route = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate input on change if already touched
    if (touched[name]) {
      validateForm({ ...formData, [name]: value });
    }
  };

  const handleBlur = (name: string) => {
    setTouched({ ...touched, [name]: true }); // Mark field as touched on blur
    validateForm(formData); // Validate the entire form on blur
  };

  const validateForm = (data: typeof formData) => {
    try {
      clientformSchema.parse(data); // Validate with Zod
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
      clientformSchema.parse(formData); // Validate form data with Zod
      setErrors({}); // Clear errors if valid
      
      const formDataToSend = new FormData(e.currentTarget);
      const response = await createClient(formDataToSend);
      
      if (response.success == false) {
        setErrors({ submit: response.message })
      } else if (response.success == true) {
        route.back();
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
        console.log(error)
        setErrors({ submit: error });
      }
    }
  };

  const hasErrors = Object.keys(errors).length > 0;
  const isEmpty = Object.values(formData).every((field) => field === '');

  return (
    <form onSubmit={(e) => { handleSubmit(e);}}>
      <div className="flex flex-row justify-evenly space-x-3">
        <div>
          <p className="text-xs font-bold flex mb-1">First Name*</p>
          <input
            className={`h-8 w-full flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.firstname && errors.firstname ? 'border-red-500' : 'border-slate-200'}`}
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            onBlur={() => handleBlur('firstname')}
          />
          {touched.firstname && errors.firstname && <p className="text-red-500 text-xs mt-1 text-left">{errors.firstname}</p>}
        </div>
        <div>
          <p className="text-xs font-bold flex mb-1">Middle Initial*</p>
          <input
            className={`h-8 w-full flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.middlename && errors.middlename ? 'border-red-500' : 'border-slate-200'}`}
            type="text"
            name="middlename"
            value={formData.middlename}
            onChange={handleChange}
            onBlur={() => handleBlur('middlename')}
          />
          {touched.middlename && errors.middlename && <p className="text-red-500 text-xs mt-1 text-left">{errors.middlename}</p>}
        </div>
        <div>
          <p className="text-xs font-bold flex mb-1">Last Name*</p>
          <input
            className={`h-8 w-full flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.lastname && errors.lastname ? 'border-red-500' : 'border-slate-200'}`}
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            onBlur={() => handleBlur('lastname')}
          />
          {touched.lastname && errors.lastname && <p className="text-red-500 text-xs mt-1 text-left">{errors.lastname}</p>}
        </div>
      </div>

      <div className="flex flex-row justify-between space-x-3 mt-3">
        <div>
          <p className="text-xs font-bold flex mb-1">Contact Number*</p>
          <input
            className={`h-8 w-72 flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.contactNum && errors.contactNum ? 'border-red-500' : 'border-slate-200'}`}
            type="text"
            name="contactNum"
            value={formData.contactNum}
            onChange={handleChange}
            onBlur={() => handleBlur('contactNum')}
          />
          {touched.contactNum && errors.contactNum && <p className="text-red-500 text-xs mt-1 text-left text-wrap">{errors.contactNum}</p>}
        </div>
        <div>
          <p className="text-xs font-bold flex mb-1">Email Address*</p>
          <input
            className={`h-8 w-72 flex border focus:outline-pink-600 rounded-lg pl-1 text-sm ${touched.emailAdd && errors.emailAdd ? 'border-red-500' : 'border-slate-200'}`}
            type="text"
            name="emailAdd"
            value={formData.emailAdd}
            onChange={handleChange}
            onBlur={() => handleBlur('emailAdd')}
            placeholder="e.g. user@email.com"
          />
          {touched.emailAdd && errors.emailAdd && <p className="text-red-500 text-xs mt-1 text-left">{errors.emailAdd}</p>}
        </div>
      </div>

      <button
        className={`mt-8 text-sm px-4 py-1 rounded-lg text-white ${hasErrors || isEmpty ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-600'}`}
        type="submit"
        disabled={hasErrors || isEmpty}
      >
        Create Client
      </button>
    </form>
  );
};

export default AddClientForm;
