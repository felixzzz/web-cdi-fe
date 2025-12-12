import { z } from "zod";

export const WhistleblowingSchema = z.object({
  first_name: z.string().min(1, { message: "First Name is required" }),
  last_name: z.string().min(1, { message: "Last Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  country_id: z.string().min(1, { message: "Please select a country" }),
  topic_id: z.string().min(1, { message: "Please select a topic" }),
  // topic_id: z.string(),
  message: z
    .string()
    .min(10, { message: "Please add your questions (at least 10 characters)" })
    .max(500, { message: "Questions cannot exceed 500 characters" }),
});

export type WhistleblowingFormValues = z.infer<typeof WhistleblowingSchema>;

export interface Country {
  id: number;
  name: string;
}

export type CountryList = Country[];

export interface Option {
  id: number;
  name: string;
}

export type OptionList = Option[];

export interface DropdownItem {
  id: number;
  name: string;
}