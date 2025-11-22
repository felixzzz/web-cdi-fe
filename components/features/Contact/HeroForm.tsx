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
  DropdownItem,
} from "@/schemas/contactUsSchema";
import { ContactInfoCard } from "./ContactInfoCard";
import { useTranslations } from "next-intl";
import { CompanyLocationResponse } from "@/types/global/footer";
import { ContactSectionData } from "@/types/Contact/Contact";
import { useState } from "react";
import { toast } from "sonner";

interface HeroFormProps {
  contactData: CompanyLocationResponse;
  pageData: ContactSectionData;
  countries: DropdownItem[];
  topics: DropdownItem[];
}

export function HeroForm({
  contactData,
  pageData,
  countries,
  topics,
}: HeroFormProps) {
  const t = useTranslations("Contact");
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const form = useForm<ContactUsFormValues>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      country_id: "",
      topic_id: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactUsFormValues) {
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_POST}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            t("submit_error_message") ||
            "Failed to send message"
        );
      }

      toast.success(
        t("submit_success_message") || "Message sent successfully!",
        {}
      );

      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Please try again later.", {});
    }
  }

  return (
    <div data-navbar-theme="dark" className="bg-gray-100 py-20">
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
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 text-sm block mb-[6px]">
                          {t("first_name")}{" "}
                          <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("first_name_placeholder")}
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
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 text-sm block mb-[6px]">
                          {t("last_name")}{" "}
                          <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("last_name")}
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
                    name="country_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 text-sm block mb-[6px]">
                          {t("country_id")}{" "}
                          <span className="text-red-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="input-custom">
                              <SelectValue
                                placeholder={t("country_id_placeholder")}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries?.map((country) => (
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
                  name="topic_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 text-sm block mb-[6px]">
                        {t("topic_id")} <span className="text-red-600">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="input-custom">
                            <SelectValue
                              placeholder={t("topic_id_placeholder")}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {topics?.map((topic) => (
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
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 text-sm block mb-[6px]">
                        {t("message")} <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t("message_placeholder")}
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
                  {form.formState.isSubmitting ? t("Submit") : t("Submit")}
                </Button>

                {submitMessage && (
                  <p
                    className={
                      submitStatus === "success"
                        ? "text-green-600"
                        : submitStatus === "error"
                        ? "text-red-600"
                        : "text-gray-900"
                    }
                  >
                    {submitMessage}
                  </p>
                )}
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}
