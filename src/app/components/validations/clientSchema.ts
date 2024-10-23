import {z} from "zod";

export const clientSchema = z.object({
    firstname: z.string().trim().min(1, {
        message: "First name is required."
    }),
    middlename: z.string().trim().min(1, {
        message: "Middle name is required"
    }),
    lastname: z.string().trim().min(1, {
        message: "Last name is required."
    }),
    email: z.string().trim().email({ message: "Invalid email address"})
                            .min(1, { message: "Email is required." })
})