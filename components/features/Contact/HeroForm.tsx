"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Phone, Printer } from "lucide-react";

const infoCard = {
  bgImage:
    "https://chandradaya-investasi.com/file-storage/YnBrNUxBOEdFaU9WTjJmc0tydThZRjJOUkxvOVlsb09UQXJkQUcveDJQZCtZZVBKYmovTlU2VWE2ckt5MmpidXhKc1d4aGpsd3FkRWpOd3dhZGxHTXc9PQ.webp",
  hashtag: "#YourGrowthPartner",
  companyName: "PT Chandra Daya Investasi Tbk",
  companySubtitle: "A member of Chandra Asri Group",
  address:
    "Wisma Barito Pacific Tower A, Lantai 5 Jl. Let. Jend. S. Parman Kav. 62 – 63, Jakarta Barat 11410, Indonesia",
  phone: "(+62-21) 530 7950",
  fax: "(+62-21) 530 8930",
};

const countryOptions = [
  { value: "", label: "Pilih Negara Anda", disabled: true },
  { value: "102", label: "Indonesia" },
  { value: "133", label: "Malaysia" },
  { value: "196", label: "Singapore" },
  { value: "230", label: "United States" },
];

const topicOptions = [
  { value: "", label: "Pilih Topik", disabled: true },
  { value: "2", label: "Pilihan" },
];

export function HeroForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryId: "",
    topicId: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.countryId &&
    formData.topicId &&
    formData.message;

  return (
    <section aria-labelledby="contact-heading" className="bg-neutral-2 py-20">
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <div className="grid lg:grid-cols-3 gap-16">
          <aside className="relative lg:max-h-[675px] lg:max-w-[456px] h-full rounded-xl flex flex-col p-6 justify-between max-lg:min-h-[456px] overflow-hidden">
            <Image
              src={infoCard.bgImage}
              alt="CDI Group Office"
              layout="fill"
              objectFit="cover"
              className="z-0"
              priority
            />
            <div className="relative z-10">
              <p className="mb-0 text-[22px] font-medium text-white">
                {infoCard.hashtag}
              </p>
            </div>
            <div className="relative z-10 rounded-xl border border-neutral-4 p-4 bg-white">
              <div className="mb-1 flex flex-col gap-2">
                <h3 className="text-[22px] text-blue-base font-medium">
                  {infoCard.companyName}
                </h3>
                <p className="text-base text-neutral-8 font-medium">
                  {infoCard.companySubtitle}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <address className="text-neutral-8 text-sm not-italic">
                  {infoCard.address}
                </address>
                <div className="flex items-center gap-x-4 gap-y-2 text-neutral-8 flex-wrap">
                  <div className="flex items-center text-xs gap-2">
                    <Phone size={14} /> {infoCard.phone}
                  </div>
                  <div className="flex items-center text-xs gap-2">
                    <Printer size={14} /> {infoCard.fax}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-2">
            <h2
              id="contact-heading"
              className="text-neutral-13 font-medium text-2xl lg:text-[38px] mb-8"
            >
              Terima kasih atas minat Anda pada CDI Group
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="firstName"
                    className="text-neutral-13 text-sm block mb-[6px]"
                  >
                    Nama Depan <span className="text-red-6">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Masukkan Nama Depan Anda"
                    className="input-custom"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="text-neutral-13 text-sm block mb-[6px]"
                  >
                    Nama Belakang <span className="text-red-6">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Masukkan Nama Belakang Anda"
                    className="input-custom"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="email"
                    className="text-neutral-13 text-sm block mb-[6px]"
                  >
                    Email <span className="text-red-6">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Masukkan Email Anda"
                    className="input-custom"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="countryId"
                    className="text-neutral-13 text-sm block mb-[6px]"
                  >
                    Negara <span className="text-red-6">*</span>
                  </label>
                  <select
                    className="input-custom"
                    required
                    name="countryId"
                    id="countryId"
                    value={formData.countryId}
                    onChange={handleChange}
                  >
                    {countryOptions.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        disabled={opt.disabled}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="topicId"
                  className="text-neutral-13 text-sm block mb-[6px]"
                >
                  Topik <span className="text-red-6">*</span>
                </label>
                <select
                  className="input-custom"
                  required
                  name="topicId"
                  id="topicId"
                  value={formData.topicId}
                  onChange={handleChange}
                >
                  {topicOptions.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      disabled={opt.disabled}
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-neutral-13 text-sm block mb-[6px]"
                >
                  Tambahkan pertanyaan Anda{" "}
                  <span className="text-red-6">*</span>
                </label>
                <textarea
                  name="message"
                  id="message"
                  className="input-custom !h-auto"
                  placeholder="Tulis komentar atau pertanyaan tambahan Anda di sini"
                  rows={8}
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex items-center gap-1 bg-blue-base px-6 py-2 rounded-full font-medium w-fit text-white cursor-pointer disabled:bg-neutral-7 disabled:cursor-not-allowed"
                disabled={!isFormValid}
              >
                Kirim
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
