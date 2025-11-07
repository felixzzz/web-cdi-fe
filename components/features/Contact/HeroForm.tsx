// components/features/ContactUs/HeroForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  contactUsSchema,
  ContactUsFormValues,
} from "@/schemas/contactUsSchema";
import { ContactInfoCard } from "./ContactInfoCard";

const countries = [
  { id: 102, name: "Indonesia" },
  { id: 133, name: "Malaysia" },
  { id: 196, name: "Singapore" },
  { id: 215, name: "Thailand" },
  { id: 236, name: "Viet Nam" },
];
const topics = [{ id: 2, name: "Pilihan" }];

export function HeroForm() {
  const form = useForm<ContactUsFormValues>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      topic: "",
      questions: "",
    },
  });

  function onSubmit(values: ContactUsFormValues) {
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <div className="bg-gray-100 py-20">
      <section className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <div className="grid lg:grid-cols-3 gap-16">
          <ContactInfoCard
            imageSrc="https://chandradaya-investasi.com/file-storage/YnBrNUxBOEdFaU9WTjJmc0tydThZRjJOUkxvOVlsb09UQXJkQUcveDJQZCtZZVBKYmovTlU2VWE2ckt5MmpidXhKc1d4aGpsd3FkRWpOd3dhZGxHTXc9PQ.webp"
            imageAlt="CDI Group Team"
            companyName="PT Chandra Daya Investasi Tbk"
            companySubtitle="A member of Chandra Asri Group"
            address="Wisma Barito Pacific Tower A, Lantai 5 Jl. Let. Jend. S. Parman Kav. 62 – 63, Jakarta Barat 11410, Indonesia"
            phone="(+62-21) 530 7950"
            email="(+62-21) 530 8930"
          />

          <div className="lg:col-span-2">
            <p className="text-gray-900 font-medium text-2xl lg:text-[38px] mb-8">
              Thank you for your interest in CDI Group
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 text-sm block mb-[6px]">
                          First Name <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Input Your First Name"
                            className="input-custom" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 text-sm block mb-[6px]">
                          Last Name <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Input Your Last Name"
                            className="input-custom"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 text-sm block mb-[6px]">
                          Email <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Input Your Email"
                            className="input-custom"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 text-sm block mb-[6px]">
                          Country <span className="text-red-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="input-custom">
                              <SelectValue placeholder="Select Your Country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem
                                key={country.id}
                                value={String(country.id)}
                              >
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 text-sm block mb-[6px]">
                        Topic <span className="text-red-600">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="input-custom">
                            <SelectValue placeholder="Select Topic" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {topics.map((topic) => (
                            <SelectItem
                              key={topic.id}
                              value={String(topic.id)}
                            >
                              {topic.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="questions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 text-sm block mb-[6px]">
                        Add your questions <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your comment or additional question here"
                          className="input-custom !h-auto"
                          rows={8}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="bg-[#47C1EA] hover:bg-[#3ab0d8] px-6 py-2 rounded-full font-medium w-fit text-white cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={form.formState.isSubmitting} 
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}