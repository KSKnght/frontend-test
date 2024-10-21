import {z} from "zod";

export const userSchema = z.object({
    phasename: z
        .string()
        .min(3, {
            message: "Phase name must be at least 3 characters long."
        })
        .max(30, {
            message: "Phase name must be less than 30 characters."
        }),
})