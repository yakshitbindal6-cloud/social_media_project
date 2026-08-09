import {z} from 'zod';

export const createUserSchema=z.object({
        username:z.string().min(5,"Username must be at least 5 characters long"),
        email:z.email("Invalid email address"),
        role:z.enum(["user","admin"],"Role must be either 'user' or 'admin'").optional()
})
export const updateUserSchema=z.object({
     username:z.string().min(5,"Username must be at least 5 characters long").optional(),
     email:z.email("Invalid email address").optional(),
      role:z.enum(["user","admin"],"Role must be either 'user' or 'admin'").optional()
}).refine((data)=>data.username || data.email || data.role,{
    message:"At least one field must be provided for update",})