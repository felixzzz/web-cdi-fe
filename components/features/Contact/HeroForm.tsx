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
import { useTranslations } from "next-intl";
import { CompanyLocationResponse } from "@/types/global/footer";
import { ContactSectionData } from "@/types/Contact/Contact";

const countries = [
  { id: 102, name: "Indonesia" },
  { id: 133, name: "Malaysia" },
  { id: 196, name: "Singapore" },
  { id: 215, name: "Thailand" },
  { id: 236, name: "Viet Nam" },
];
const topics = [{ id: 2, name: "Pilihan" }];

interface HeroFormProps {
  contactData: CompanyLocationResponse;
  pageData: ContactSectionData;
}

export function HeroForm({ contactData, pageData }: HeroFormProps) {
  const t = useTranslations("Contact");
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
      <section className="container mx-auto px-4 md:px-8 lg:px-20 2xl:px-44 pt-[5%]">
        <div className="grid md:grid-cols-3 gap-16">
          <ContactInfoCard
            imageSrc={pageData.file_url}
            imageAlt="CDI Group Team"
            hastag={pageData.title}
            companyName={contactData.name}
            companySubtitle={contactData.sub_title}
            address={contactData.localized_main.address}
            phone={contactData.localized_main.phone}
            email={contactData.localized_main.fax}
          />

          <div className="md:col-span-2">
            <h1 className="text-gray-900 font-medium text-2xl md:text-[38px] mb-8">
              {pageData.title}
            </h1>

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
                          {t("firstname")}{" "}
                          <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("firstname_placeholder")}
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
                          {t("lastname")}{" "}
                          <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            // placeholder=""
                            placeholder={t("lastname")}
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
                            // placeholder=""
                            placeholder={t("email_placeholder")}
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
                          {t("county")} <span className="text-red-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="input-custom">
                              <SelectValue
                                placeholder={t("county_placeholder")}
                                // placeholder=""
                              />
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
                        {t("topic")} <span className="text-red-600">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="input-custom">
                            <SelectValue
                              placeholder={t("topic_placeholder")}
                              //  placeholder=""
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {topics.map((topic) => (
                            <SelectItem key={topic.id} value={String(topic.id)}>
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
                        {t("question")} <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t("question_placeholder")}
                          // placeholder=""
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
                  {t("Submit")}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}
