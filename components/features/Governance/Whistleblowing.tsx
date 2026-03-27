"use client";

import Image from "next/image";
import React from "react";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { GovernanceSection } from "@/types/Governances/Governance";
import { useTranslations } from "next-intl";

interface WhistleblowingProps {
    data: GovernanceSection;
    image: string;
    locale: string;
}

export function Whistleblowing({ data, image, locale }: WhistleblowingProps) {
    const t = useTranslations("Investor.Governance");

    const TITLE = data.title || "Whistleblowing";
    const CONTENT_HTML = data.content || "";
    const IMAGE_URL = locale === "id" ? image : data.file_url;
    const IMAGE_ALT = data.title || "Whistleblowing";

    const handleLinkClick = () => {
        window.dispatchEvent(new Event("startProgressBar"));
    };

    return (
        <section
            id="whistleblowing"
            className="bg-[#091A24] py-20 text-white"
        >
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-3">
                        <h2 className="text-2xl lg:text-[38px] font-medium mb-4">
                            {TITLE}
                        </h2>

                        <div
                            className="prose prose-invert text-sm lg:text-base leading-relaxed text-justify"
                            dangerouslySetInnerHTML={{ __html: CONTENT_HTML }}
                        />

                        {/* 🖼️ TIMELINE IMAGE (KEEP THIS) */}
                        <div className="w-full mx-auto mt-5 py-6">
                            <Image
                                src={IMAGE_URL}
                                alt={IMAGE_ALT}
                                width={600}
                                height={400}
                                className="w-full h-auto rounded-lg"
                                priority
                            />
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="lg:col-span-2 space-y-6">

                        <div className="relative">

                            {/* 🔵 FLOATING HEADER */}
                            <div className="flex items-end">
                                <div className="bg-[#B9C6D3] rounded-t-xl px-6 py-3 relative z-3"><h2
                                    className="text-xl md:text-[20px] font-bold text-gray-900">{t("Whistleblower_channel")}</h2></div>
                                <div className="bg-[#337ABC] rounded-t-xl h-[40px] w-16 -ml-3 relative z-2"></div>
                                <div className="bg-[#53C3D9] rounded-t-xl h-[40px] w-16 -ml-3 relative z-1"></div>
                            </div>

                            {/* 🧊 MAIN CARD */}
                            <div
                                className="bg-[#B9C6D3] text-[#091A24] rounded-b-2xl rounded-tr-2xl p-6 md:p-8 relative z-3 -mt-[1px]">

                                <div className="space-y-6 text-sm">

                                    {/* Email */}
                                    <div className="flex gap-4">
                                        <div
                                            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2F6FA3] text-white">
                                            <Mail size={18}/>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{t("Whistleblower_hotline_email")}</p>
                                            <p className="text-gray-700">
                                                corporatesecretary.cdi@capcx.com
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex gap-4">
                                        <div
                                            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2F6FA3] text-white">
                                            <Phone size={18}/>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{t("Whistleblower_hotline_phone")}</p>
                                            <ul className="list-disc list-inside text-gray-700">
                                                <li>021-5307950</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="flex gap-4">
                                        <div
                                            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2F6FA3] text-white">
                                            <MapPin size={18}/>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{t("Whistleblower_dropbox")}:</p>

                                            <div className="text-gray-700 mt-1">
                                                <p className="font-semibold">Head Office</p>
                                                <p>Wisma Barito Pacific Tower A, 5th Floor</p>
                                                <p>Jl Let. Jend. S. Parman Kav. 62–63, Jakarta 11410</p>
                                                <p>Indonesia</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>


                        <Link
                            onClick={handleLinkClick}
                            href="mailto:whistleblower.channels@capcx.com"
                            className="px-6 py-2 rounded-full border border-white flex items-center gap-2 w-fit mt-8"
                        >
                            {t("cta_whistle")}
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}