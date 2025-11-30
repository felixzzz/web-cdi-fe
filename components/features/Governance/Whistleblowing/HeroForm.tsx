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
  WhistleblowingSchema,
  WhistleblowingFormValues,
  DropdownItem,
} from "@/schemas/WhistleblowingSchema";
import { useTranslations } from "next-intl";
import { CompanyLocationResponse } from "@/types/global/footer";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ContactInfoCard } from "./ContactInfoCard";
import { GovernanceSection } from "@/types/Governances/Whistleblowing";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface HeroFormProps {
  contactData: CompanyLocationResponse;
  governance_whistleblowing: GovernanceSection;
  governance_whistleblowing_detail: GovernanceSection;
  countries: DropdownItem[];
  topics: DropdownItem[];
}

export function HeroForm({
  contactData,
  governance_whistleblowing,
  governance_whistleblowing_detail,
  countries,
  topics,
}: HeroFormProps) {
  const t = useTranslations("Investor.Governance.WhistleblowingPage");
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const form = useForm<WhistleblowingFormValues>({
    resolver: zodResolver(WhistleblowingSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      country_id: "",
      topic_id: "",
      message: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  async function onSubmit(values: WhistleblowingFormValues) {
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_POST_WHISTLEBLOWING}`, {
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
      toast.error(
        error instanceof Error ? error.message : "Please try again later.",
        {}
      );
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("finishProgressBar"));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div data-navbar-theme="dark" className="bg-gray-100 py-36 lg:py-20">
      <section className="container mx-auto px-4 md:px-4 lg:px-20 xl:px-8 2xl:px-44 pt-[5%]">
        <div className="flex gap-1 text-neutral-10 items-center text-sm md:text-base">
          <Link className="text-[#2474A5] hover:underline" href="/governance">
            Governance
          </Link>
          <ChevronRight className="text-lg w-4 h-4" />
          <span className="font-medium">{t("Whistleblowing")}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-16 mt-8">
          <ContactInfoCard
            imageSrc={governance_whistleblowing_detail.file_url}
            imageAlt="CDI Group Team"
            hastag={governance_whistleblowing_detail.title || ""}
            companyName={contactData.name}
            companySubtitle={contactData.sub_title}
            address={contactData.localized_main.address}
            phone={contactData.localized_main.phone}
            email={contactData.localized_main.fax}
          />

          <div className="pt-10 md:pt-0 md:col-span-2">
            <h1 className="text-gray-900 font-medium text-2xl md:leading-snug md:text-[38px] mb-4">
              {governance_whistleblowing.title}
            </h1>

            <div
              className="max-w-full prose prose-invert prose-base text-neutral-800 mb-8 text-[10px] md:text-[12px] leading-normal md:leading-[24px] text-justify text-justify"
              dangerouslySetInnerHTML={{
                __html: governance_whistleblowing.content || "",
              }}
            />

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-8"
              >
                <div className="grid grid-cols-2 gap-8">
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

                <div className="grid grid-cols-2 gap-8">
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
                  className="bg-[#47C1EA] hover:bg-[#3ab0d8] px-6 py-2 rounded-full font-medium w-fit text-white cursor-pointer disabled:bg-neutral-700 disabled:text-neutral-200 disabled:cursor-not-allowed"
                  disabled={!isValid || isSubmitting}
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
