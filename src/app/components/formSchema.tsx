'use client'

import {z} from "zod"



//General Regex
const numberRegex = /^\d+$/
const alphabetRegex = /^[A-Za-z\s]+$/

//Client-Specific Regex
const middleInitialCheck = /^[a-zA-Z]$/
const contactAlphabetCheck = /^[\d+]+$/
const contactRegex = /^09|^\+63/
const emailAdCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const currDate = new Date();



//Client Form - Input
export const clientformSchema = z.object({
    firstname: z
        .string()
        .superRefine((value, ctx) => {
            if(value.length === 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'First name is required',
                    path: ['firstname']
                });
                return;
            }
            if(!alphabetRegex.test(value)) {
                ctx.addIssue ({
                    code: z.ZodIssueCode.custom,
                    message: 'First name should contain alphabets only',
                    path: ['firstname']
                })
            }
        }),

    middlename: z
        .string()
        .superRefine((value, ctx) => {
            if(value.length === 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Middle initial is required',
                    path: ['middlename']
                })
                return;
            }
            if(!middleInitialCheck.test(value)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Middle initial should contain an alphabet only',
                    path: ['middlename']
                })
            }
            if(value.length > 1) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Middle initial should contain one character only',
                    path: ['middlename']
                })
            }
        }),

    lastname: z
        .string()
        .superRefine((value, ctx) => {
            if(value.length === 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Last name is required',
                    path: ['lastname']
                })
                return;
            }
            if(!alphabetRegex.test(value)) {
                ctx.addIssue ({
                    code: z.ZodIssueCode.custom,
                    message: 'Last name should contain alphabets only',
                    path: ['lastname']
                })
            }
        }),

    emailAdd: z
        .string()
        .superRefine((value, ctx) => {
            if(value.length === 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Email address is required',
                    path: ['emailAdd']
                })
                return;
            }
            if(!emailAdCheck.test(value)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Invalid email format',
                    path: ['emailAdd']
                })
            }
        }),


    contactNum: z
        .string()
        .superRefine((value, ctx) => {
            if (!contactRegex.test(value)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Contact number must start with '09' or '+63'",
                    path: ['contactNum']
                });
            }
            if (!contactAlphabetCheck.test(value)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Contact number should contain numbers only',
                    path: ['contactNum']
                });
            }
            if (value.length === 0 ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Contact number is required',
                    path: ['contactNum'],
                });
                return;
            }
            if (value.startsWith('09') && value.length !== 11) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Contact number must be 11 digits if starting with "09"',
                    path: ['contactNum'], 
                });
            }
            if (value.startsWith('+63') && value.length !== 13) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Contact number must be 13 digits if starting with "+63"',
                    path: ['contactNum'], 
                });
            }
        }),
});
export type clientformData = z.infer<typeof clientformSchema>;


//Project Form - Input
export enum clientOptions {
    SELECT = 'Select Client'
}
export enum projecttypeOptions {
    SELECT = 'Select Project Type',
}
export const projectformSchema = z.object({
    name: z.string().min(1, {
        message: "Project name is required",
      }),
      address: z.string().min(1, {
        message: "Project address is required",
      }),
      type: z.string().refine((value) => value !== projecttypeOptions.SELECT, {
        message: "Select a project type",
      }),
      id: z.string().refine((value) => value !== clientOptions.SELECT, {
        message: "Select a client",
      }),
      
      startDate: z.string(),
      endDate: z.string(),
    })
    .superRefine((data, ctx) => {
      const { startDate, endDate } = data;
  
      // Validate startDate
      if (!startDate || startDate.trim() === '') {
        ctx.addIssue({
          path: ['startDate'],
          message: 'Start date is required',
          code: z.ZodIssueCode.custom,
        });
      } else if (new Date(startDate) < currDate) {
        ctx.addIssue({
          path: ['startDate'],
          message: 'Start date cannot be in the past',
          code: z.ZodIssueCode.custom,
        });
      }
  
      // Validate endDate
      if (!endDate || endDate.trim() === '') {
        ctx.addIssue({
          path: ['endDate'],
          message: 'End date is required',
          code: z.ZodIssueCode.custom,
        });
      } else if (endDate < startDate) {
        ctx.addIssue({
          path: ['endDate'],
          message: 'End date must be after start date',
          code: z.ZodIssueCode.custom,
        });
      } else if (endDate == startDate) {
        ctx.addIssue({
          path: ['endDate'],
          message: 'End date cannot be the same as start date',
          code: z.ZodIssueCode.custom,
        });
        return;
      } 
    });

export type projectData = z.infer<typeof projectformSchema>


export const DateSchema = z.object({
    startDate: z.string(),
    endDate: z.string(),
  })
  .superRefine((data, ctx) => {
    const { startDate, endDate } = data;

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    
    // Validate startDate
    if (!startDate || startDate.trim() === '') {
      ctx.addIssue({
        path: ['startDate'],
        message: 'Start date is required',
        code: z.ZodIssueCode.custom,
      });
    }
    //  else if (startDateObj < currDate) {
    //   ctx.addIssue({
    //     path: ['startDate'],
    //     message: 'Start date cannot be in the past',
    //     code: z.ZodIssueCode.custom,
    //   });
    // }

    // Validate endDate
    if (!endDate || endDate.trim() === '') {
      ctx.addIssue({
        path: ['endDate'],
        message: 'End date is required',
        code: z.ZodIssueCode.custom,
      });
    } else if (endDateObj < startDateObj) {
      ctx.addIssue({
        path: ['endDate'],
        message: 'End date must be after start date',
        code: z.ZodIssueCode.custom,
      });
    } else if (endDateObj.getTime() === startDateObj.getTime()) {
      ctx.addIssue({
        path: ['endDate'],
        message: 'End date cannot be the same as start date',
        code: z.ZodIssueCode.custom,
      });
      return;
    } 
  });
export type datesData = z.infer<typeof DateSchema>

console.log()


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





// // Task Form Schema
// export const taskSchema = z.object({
//     taskname: z.string().min(1, 'Task name is required'),

//     deadline: z
//       .string()  // Assuming the deadline comes as a string from an input field
//       .refine((val) => !isNaN(Date.parse(val)), {
//         message: 'Invalid date format',
//       })
//       .refine((val) => Date.parse(val) >= Date.now(), {
//         message: 'Deadline cannot be in the past',
//       }),

//     description: z.string().optional(),
//   });




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

export const editProjectSchema = z.object({
    name: z.string().min(1, {
        message: "Project name is required",
      }),
    projectAddress: z.string().min(1, {
    message: "Project address is required",
    }),
})

export type editProjectData = z.infer<typeof editProjectSchema>



export const moveProjectSchema = z.object({
    startDate: z.date({}),
    endDate: z.date({}),
}).refine((data) => data.startDate <= data.endDate, {
    message: "Start date must not be after the end date",
    path: ["startDate"],
}).refine((data) => data.startDate >= new Date(), {
    message: "Start date must not be in the past",
    path: ["startDate"],
}).refine((data) => data.endDate >= data.startDate, {
    message: "End date must not be before the start date",
    path: ["endDate"],
})  

export type moveProjectData = z.infer<typeof editProjectSchema>


