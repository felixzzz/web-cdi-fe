/**
 * Default fallback generators for /llms.txt and /llms-full.txt
 * when backend content is empty or unreachable.
 */

function getSiteBaseUrl(): string {
  let baseUrl = process.env.NEXT_PUBLIC_URL_LP ?? "https://chandradaya-investasi.com";
  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.slice(0, -1);
  }
  return baseUrl;
}

export function buildDefaultLlmsTxt(): string {
  const baseUrl = getSiteBaseUrl();

  return `# PT Chandra Daya Investasi Tbk (CDI Group)

> PT Chandra Daya Investasi Tbk (CDI Group) is an infrastructure investment arm of Chandra Asri Group, a leading chemical and energy solutions provider in Southeast Asia, and EGCO Group, a leading power and energy holding company in Thailand. CDI Group delivers reliable, sustainable infrastructure solutions across Energy, Water, Ports & Storage, and Logistics in Indonesia and Southeast Asia.

## About Us

- [Who We Are](${baseUrl}/en/about-us): Company overview, vision, mission, corporate history, and milestones of PT Chandra Daya Investasi Tbk.
- [Management](${baseUrl}/en/about-us/management): Board of Commissioners, Board of Directors, organizational structure, corporate structure, and work guidelines.
- [Awards & Certifications](${baseUrl}/en/about-us/awards): Recognitions, awards, ISO certifications, and industry memberships.

## Our Business

- [Our Business Overview](${baseUrl}/en/our-business): Overview of CDI Group's core infrastructure business pillars.
- [Energy](${baseUrl}/en/our-business/energy): Power generation, distribution, and sustainable energy solutions supporting industrial and regional growth.
- [Water](${baseUrl}/en/our-business/water): Integrated industrial water supply, water treatment, and wastewater management solutions.
- [Ports & Storage](${baseUrl}/en/our-business/ports-and-storage): Chemical and liquid bulk storage tank terminals, jetties, and integrated port services.
- [Logistics](${baseUrl}/en/our-business/logistics): End-to-end maritime and land logistics solutions, shipping, and supply chain infrastructure.

## Sustainability (ESG)

- [Sustainability Overview](${baseUrl}/en/sustainability): CDI Group's sustainability policy, framework, ESG ratings, and recognitions.
- [Environment](${baseUrl}/en/sustainability/environment): Climate action, energy efficiency, water stewardship, emissions management, and circularity.
- [Social](${baseUrl}/en/sustainability/social): Occupational health and safety (OHS), human capital development, and community empowerment.
- [Governance (ESG)](${baseUrl}/en/sustainability/governance): Ethical business conduct, compliance, and sustainability governance structure.

## Corporate Governance

- [Corporate Governance](${baseUrl}/en/governance): Good Corporate Governance (GCG) structure, Corporate Secretary, Internal Audit Unit, Committees, Risk Management, and Code of Conduct.
- [Governance Policies](${baseUrl}/en/governance/policy): Corporate policies, SHE regulations, and governance charters.
- [Whistleblowing System](${baseUrl}/en/governance/whistleblowing): Confidential whistleblowing reporting mechanism and ethics hotline.

## Investor Relations

- [Reports](${baseUrl}/en/investor/report): Annual reports, financial statements, sustainability reports, and supporting institutions.
- [Financial Information](${baseUrl}/en/investor/financial-information): Financial highlights, financial calendar, and performance reports.
- [Shares Information](${baseUrl}/en/investor/shares-information): Shareholder composition, dividend information, and bonds/securities data.
- [Publications for Investors](${baseUrl}/en/investor/publications-for-investors): Prospectus, General Meeting of Shareholders (GMS), public disclosures, and earnings/investor updates.

## Media & Contact

- [News & Media](${baseUrl}/en/media/news): Latest corporate news, press releases, and industry articles.
- [Contact Us](${baseUrl}/en/contact-us): Head office location, operational office addresses, and inquiry form.
- [Full LLM Documentation](${baseUrl}/llms-full.txt): Comprehensive reference documentation about PT Chandra Daya Investasi Tbk (CDI Group).

## Optional

- [Indonesian Website (Bahasa Indonesia)](${baseUrl}/id): Full corporate website in Bahasa Indonesia.
- [Privacy Policy](${baseUrl}/en/privacy-policy): Data privacy and personal data protection policy.
- [Terms & Conditions](${baseUrl}/en/terms-and-conditions): Website terms of use.
- [Cookies Notice](${baseUrl}/en/cookies-notice): Cookie usage and consent policy.
- [Disclaimer](${baseUrl}/en/disclaimer): Legal and investment disclaimer.
`;
}

export function buildDefaultLlmsFullTxt(): string {
  const baseUrl = getSiteBaseUrl();

  return `# PT Chandra Daya Investasi Tbk (CDI Group) — Comprehensive Documentation

> PT Chandra Daya Investasi Tbk (CDI Group) is an infrastructure investment arm of Chandra Asri Group, a leading chemical and energy solutions provider in Southeast Asia, and EGCO Group, a leading power and energy holding company in Thailand. CDI Group's diverse operations encompass Energy, Water Supply & Treatment, Ports & Storage, and Logistics.

---

## 1. Company Overview

- **Legal Name:** PT Chandra Daya Investasi Tbk
- **Brand / Short Name:** CDI Group / Chandra Daya Investasi
- **Website:** ${baseUrl}
- **Languages Supported:** English (\`/en\`) and Bahasa Indonesia (\`/id\`)
- **Strategic Shareholders:**
  - **Chandra Asri Group (PT Chandra Asri Pacific Tbk):** A leading chemical and infrastructure solutions company in Indonesia and Southeast Asia.
  - **EGCO Group (Electricity Generating Public Company Limited):** A major power and energy holding company based in Thailand.

### About CDI Group
PT Chandra Daya Investasi Tbk (CDI Group) invests in, develops, and operates critical industrial and utility infrastructure across Indonesia and Southeast Asia. By combining deep operational expertise with strategic partnerships, CDI Group provides essential infrastructure backbone services—spanning electric power, industrial water, port and bulk liquid terminals, and integrated logistics—that enable industrial growth and sustainable development.

---

## 2. Core Business Pillars

### 2.1 Energy
- **URL:** ${baseUrl}/en/our-business/energy (EN) | ${baseUrl}/id/our-business/energy (ID)
- **Overview:** CDI Group operates reliable power generation and electricity distribution assets serving industrial estates, commercial customers, and national grid requirements.
- **Key Capabilities:**
  - Combined-cycle and cogeneration power plants
  - Power distribution and substation infrastructure
  - Renewable and low-carbon energy initiatives (solar PV, clean energy transition)
  - High-reliability industrial power supply

### 2.2 Water
- **URL:** ${baseUrl}/en/our-business/water (EN) | ${baseUrl}/id/our-business/water (ID)
- **Overview:** Integrated industrial water management solutions supporting major industrial complexes in Cilegon, Banten, and surrounding regions.
- **Key Capabilities:**
  - Raw water intake, treatment, and pipeline distribution
  - Demineralized and process water production for petrochemical and heavy industries
  - Industrial wastewater treatment and water recycling initiatives

### 2.3 Ports & Storage
- **URL:** ${baseUrl}/en/our-business/ports-and-storage (EN) | ${baseUrl}/id/our-business/ports-and-storage (ID)
- **Overview:** Strategic marine port infrastructure and bulk liquid/chemical storage terminals located along key maritime corridors.
- **Key Capabilities:**
  - Dedicated jetties and berth facilities for liquid, gas, and dry bulk vessels
  - Chemical and petroleum product storage tank terminals
  - Pipeline connectivity and cargo handling services with international safety standards

### 2.4 Logistics
- **URL:** ${baseUrl}/en/our-business/logistics (EN) | ${baseUrl}/id/our-business/logistics (ID)
- **Overview:** End-to-end maritime shipping and land logistics infrastructure connecting manufacturers with domestic and regional markets.
- **Key Capabilities:**
  - Chemical and gas carrier vessels / maritime shipping fleet
  - Land transportation, trucking fleet, and intermodal logistics
  - Supply chain management and warehousing services

---

## 3. Sustainability & ESG

CDI Group integrates Environmental, Social, and Governance (ESG) principles into all investment and operational decisions.

- **Sustainability Overview:** ${baseUrl}/en/sustainability
  - Sustainability Policy & Framework guiding responsible infrastructure operations.
  - ESG Ratings, awards, and international sustainability recognitions.
- **Environment:** ${baseUrl}/en/sustainability/environment
  - Decarbonization, energy efficiency, renewable energy adoption, water conservation, waste reduction, and biodiversity protection.
- **Social:** ${baseUrl}/en/sustainability/social
  - Zero-harm occupational health, safety, and environment (SHE) culture, employee development, diversity & inclusion, and community development programs.
- **Governance (ESG):** ${baseUrl}/en/sustainability/governance
  - Board-level sustainability oversight, risk management, anti-corruption, and supply chain responsibility.

---

## 4. Corporate Governance (GCG)

CDI Group upholds Good Corporate Governance (GCG) in accordance with Indonesian Financial Services Authority (OJK) regulations and international best practices.

- **Governance Overview:** ${baseUrl}/en/governance
  - **Board of Commissioners & Board of Directors:** ${baseUrl}/en/about-us/management
  - **Corporate Secretary:** Manages regulatory compliance, investor communications, and public disclosures.
  - **Internal Audit Unit:** Provides independent assurance on internal controls and governance processes.
  - **Board Committees:** Audit Committee, Sustainability Committee, and other governance committees.
  - **Risk Management:** Enterprise-wide risk identification, mitigation, and monitoring framework.
  - **Code of Conduct & SHE Regulations:** Ethical standards and Safety, Health, and Environment (SHE) rules binding all employees and partners.
- **Governance Policies:** ${baseUrl}/en/governance/policy
- **Whistleblowing System:** ${baseUrl}/en/governance/whistleblowing
  - Secure and confidential channel for reporting suspected violations of laws, regulations, or the Code of Conduct.

---

## 5. Investor Relations

- **Reports:** ${baseUrl}/en/investor/report
  - Annual Reports, Audited Financial Statements, Sustainability Reports, and Supporting Institutions & Professionals.
- **Financial Information:** ${baseUrl}/en/investor/financial-information
  - Key financial ratios, balance sheet and income statement highlights, and financial calendar.
- **Shares Information:** ${baseUrl}/en/investor/shares-information
  - Shareholder structure, dividend policy and history, and bond/debt securities information.
- **Publications for Investors:** ${baseUrl}/en/investor/publications-for-investors
  - Initial Public Offering (IPO) / Corporate Prospectus, General Meeting of Shareholders (GMS) announcements and minutes, Information Disclosures, Earnings Updates, and Investor Presentations.

---

## 6. Media, Legal & Contact Directory

- **News & Press Releases:** ${baseUrl}/en/media/news
- **Contact Us:** ${baseUrl}/en/contact-us
- **Privacy Policy:** ${baseUrl}/en/privacy-policy
- **Terms & Conditions:** ${baseUrl}/en/terms-and-conditions
- **Cookies Notice:** ${baseUrl}/en/cookies-notice
- **Disclaimer:** ${baseUrl}/en/disclaimer
- **Sitemap:** ${baseUrl}/sitemap.xml
`;
}
