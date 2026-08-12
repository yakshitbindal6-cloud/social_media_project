import {z} from 'zod';
export const createPostSchema=z.object({
    caption:z.string().min(1,"Caption is required"),
    image:z.url("Invalid URL")
})

export const updatePostSchema=createPostSchema.partial();