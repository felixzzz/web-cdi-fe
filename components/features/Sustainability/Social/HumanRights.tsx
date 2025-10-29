import React from "react";

const TITLE = "Human Rights";
const CONTENT_HTML = `
  <p>CDI Group's places significant emphasis on respecting human rights and fostering justice in the workplace, guided by fundamental principles of equality and fairness without bias. We hold ourselves to international human rights norms and are committed to equitable treatment, equal opportunities, and a supportive workplace culture that values employee contributions. This is ensured through training on human rights for everyone who works for or with CDI Group.</p>
  <p>Our Human Rights Policy showcases a deep commitment to upholding essential human rights that are aligned with the United Nations Universal as well as the International Labor Organization. This policy reflects stringent business ethics standards and includes a Whistleblowing Management Policy, providing a secure channel for employees and stakeholders to report concerns of discrimination or unfair treatment confidentially, fostering a culture of support and respect within the organization.</p>
`;

export function HumanRights() {
  return (
    <section
      aria-labelledby="human-rights-heading"
      className="py-28 text-white bg-[#091A24] !bg-blue-dark-black relative"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-[1]">
        <div className="flex flex-col gap-8 lg:max-w-[100%] me-auto">
          <div>
            <h2
              id="human-rights-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-4"
            >
              {TITLE}
            </h2>

            <div
              className="content !text-neutral-6"
              dangerouslySetInnerHTML={{ __html: CONTENT_HTML }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
