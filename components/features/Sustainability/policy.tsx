export function SustainabilitySection() {
    return (
        <section className="bg-gray-100 py-16 lg:py-24">
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                    {/* LEFT: Title */}
                    <div>
                        <h2 className="text-2xl lg:text-4xl font-semibold text-gray-900 leading-tight">
                            Our Sustainability Policy and Framework
                        </h2>
                    </div>

                    {/* RIGHT: Description + Button */}
                    <div className="max-w-xl">
                        <p className="text-gray-600 text-sm lg:text-base leading-relaxed mb-6">
                            Our Sustainability Framework and Policy guide our strategic decisions
                            across all aspects of our operations, ensuring business success aligns
                            with environmental stewardship, and creates positive impact through
                            responsible practices.
                        </p>

                        <a
                            href="https://comsite-s3.s3.ap-southeast-3.amazonaws.com/images/post/0VLXCY4ZTZyzwGSYEdTDNFMWwpQHjiliAu9f2Q9l.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 rounded-full bg-[#47C1EA] text-white text-sm font-medium hover:bg-[#36a9cf] transition"
                        >
                            Sustainability Policy
                        </a>
                    </div>

                </div>

            </div>
        </section>
    );
}