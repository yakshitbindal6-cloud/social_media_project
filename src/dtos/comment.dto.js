import { z } from "zod";

export const createCommentSchema = z.object({
  content: z.string().min(1, "Content is required"),
});

export const updateCommentSchema = createCommentSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field must be provided for update",
  }
);
