import { z } from "zod";

export const contactUsSchema = z.object({
  first_name: z.string().min(1, { message: "First Name is required" }),
  last_name: z.string().min(1, { message: "Last Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  country_id: z.string().min(1, { message: "Please select a country" }),
  topic_id: z.string().min(1, { message: "Please select a topic" }),
  message: z
    .string()
    .min(10, { message: "Please add your questions (at least 10 characters)" })
    .max(500, { message: "Questions cannot exceed 500 characters" }),
});

export type ContactUsFormValues = z.infer<typeof contactUsSchema>;