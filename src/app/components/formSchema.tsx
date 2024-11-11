'use client'

import {z} from "zod"

//Client Form - Duplication
const emailDuplicationCheck = async (emailaddress: string) => {
    const existingEmails = []
    return existingEmails.includes(emailaddress);
}

const contactDuplicationCheck = async (contactnum: string) => {
    const existingContacts = []
    return existingContacts.includes(contactnum)
}

//Client Form - Input
export const clientformSchema = z.object({
    firstname: z.string().min(1, {
        message: "First name is required"
    }),
    middleinitial: z.string().min(1, {
        message: "Middle initial is required"
    }).max(1, {
        message: "Middle initial should contain one character only"
    }),
    lastname: z.string().min(1, {
        message: "Last name is required"
    }),
    emailAddress: z.string().min(1, {
        message: "Email address is required"
    }).email({
        message: "Invalid email address"
    }),
    contactNumber: z.string().min(1, {
        message: "Contact number is required"
    }).regex(
        /^09|^\+63/, {message: "Invalid phone number format"
    }).refine((value) => {
        if (value.startsWith('09') && value.length === 11) return true;
        if (value.startsWith('+63') && value.length === 13) return true;
        return false;
    }, {message: 'Contact number must be 11 digits if starting with "09" or 13 digits if starting with "+63"'}),
});
export type clientformData = z.infer<typeof clientformSchema>;


//Project Form - Duplication
const projectDuplicationCheck = async (projectName: string) => {
    const existingProjects = []
    return existingProjects.includes(projectName)
}

//Project Form - Input
export enum clientOptions {
    SELECT = 'Select Client'
}

export enum projecttypeOptions {
    SELECT = 'Select Project Type'
}

export const projectformSchema = z.object({
    projectName: z.string().min(1, {
        message: "Project name is required"
    }),
    projectAddress: z.string().min(1, {
        message: "Project address is required"
    }),
    projecttype: z.string().min(1, {
        message: 'You must select a project type'
    }).refine((value) => value ! == projecttypeOptions.SELECT, {
        message: "Select a valid project type"
    }),
    client: z.string().min(1, {
        message: 'You must select a client'
    }).refine((value) => value ! == clientOptions.SELECT, {
        message: "Select a valid client"
    })
})
export type projectData = z.infer<typeof projectformSchema>

//Phase Form - Duplication
const phasenameDuplicationCheck = async (phaseName: string) => {
    const existingPhaseNames = []
    return existingPhaseNames.includes(phaseName);
}

//Phase Form - Input
export const phaseSchema = z.object({
    phaseName: z.string().min(1, {
        message: "Phase name is required"
    }),
    priority: z.number().positive({
        message: "Priority should be more than 0"
    }),
})
export type phaseData = z.infer<typeof phaseSchema>

//Project Form - Date Range
export const daterangeSchema = z.object({
    startDate: z.date({
        message: "Start date is required"
    }),
    endDate: z.date({
        message: "End date is required"
    }),
}).refine((data) => {
    return data.startDate < data.endDate
}, {
    message: "Invalid date range",
    path: ["startDate"],
})
export type dateData = z.infer<typeof daterangeSchema>;

//Task Form - Input and Date Range 
export const taskSchema = z.object({
    taskName: z.string().min(1, {
        message: "Task name is required"
    }),
    priority: z.number().positive({
        message: "Priority should be more than 0"
    }),
    dueDate: z.date({
        message: 'Due date is required'
    }),
    startDate: z.date({
        message: 'Start date is required',
      }),
      endDate: z.date({
        message: 'End date is required',
      }),
}).refine((data) => {
    const {startDate, endDate} = data
    if (startDate && endDate && data.dueDate) {
        return data.dueDate >= startDate && data.dueDate <= endDate
    }
    return true;
},{
    message: 'Due date must be within the project date range',
    path: ['dueDate'],
})

export type taskData = z.infer<typeof taskSchema>



//Materials Form - Input

export enum measurementOptions {
    SELECT = 'Select Unit'
}

export const materialsSchema = z.object({
    materialName: z.string().min(1, {
        message: "Material name is required"
    }),     
    unitmeasurement: z.string().min(1, {
        message: 'Unit of measurement is required'
    }).refine((value) => value ! == measurementOptions.SELECT, {
        message: 'Select valid unit of measurement'
    })
})
export type materialsData = z.infer<typeof materialsSchema>

//Subcontractors Form
export const subcontractorsSchema = z.object({
    subcontractorName: z.string().min(1, {
        message: "Subcontractor name is required"
    }),
    quantity: z.number().positive({
        message: "Quantity must be more than 0"
    }),
})
export type subcontractorsData = z.infer<typeof subcontractorsSchema>