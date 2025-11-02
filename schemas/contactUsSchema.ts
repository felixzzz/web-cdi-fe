import { z } from "zod";

export const contactUsSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  country: z.string().min(1, { message: "Please select a country" }),
  topic: z.string().min(1, { message: "Please select a topic" }),
  questions: z
    .string()
    .min(10, { message: "Please add your questions (at least 10 characters)" })
    .max(500, { message: "Questions cannot exceed 500 characters" }),
});

export type ContactUsFormValues = z.infer<typeof contactUsSchema>;