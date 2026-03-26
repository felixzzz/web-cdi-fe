import {useTranslations} from "next-intl";

export function SustainabilitySection() {
    const t = useTranslations("Sustainability");
    return (
        <section className="bg-gray-100 py-16 lg:py-24">
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                    {/* LEFT: Title */}
                    <div>
                        <h2 className="text-2xl lg:text-4xl font-semibold text-gray-900 leading-tight">
                            {t("Sustainability_policy")}
                        </h2>
                    </div>

                    {/* RIGHT: Description + Button */}
                    <div className="max-w-xl">
                        <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-6">
                            {t("Sustainability_desc")}
                        </p>

                        <a
                            href="https://drive.google.com/file/d/1lfFI0OxcUDRp_ymqR4WnpT4Cw1X1qJm_/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 rounded-full bg-[#47C1EA] text-white text-sm font-medium hover:bg-[#36a9cf] transition"
                        >
                            {t("Sustainability_button")}
                        </a>
                    </div>

                </div>

            </div>
        </section>
    );
}