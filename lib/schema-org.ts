/**
 * Utility functions for generating fallback JSON-LD schemas and rendering
 * backend-managed schemas with safety checks.
 */

export interface OrganizationParams {
  logoUrl?: string;
  contactNumber?: string;
  socialLinks?: string[];
  locale?: string;
}

export interface ArticleParams {
  headline: string;
  imageUrl?: string;
  datePublished: string;
  authorName?: string;
  url: string;
}

export interface ServiceParams {
  name: string;
  description: string;
  url: string;
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

/**
 * Strips surrounding <script> tags if they were accidentally added by the admin.
 */
export function cleanJsonLdString(raw?: string | null): string | null {
  if (!raw) return null;
  let trimmed = raw.trim();
  
  // Strip opening <script ...> tag
  trimmed = trimmed.replace(/^<script\b[^>]*>/i, '');
  // Strip closing </script> tag
  trimmed = trimmed.replace(/<\/script>$/i, '');
  
  return trimmed.trim();
}

/**
 * Organization Schema fallback generator
 */
export function buildOrganizationSchema(params?: OrganizationParams) {
  const isId = params?.locale === 'id';
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PT Chandra Daya Investasi Tbk',
    alternateName: 'CDI',
    url: 'https://chandradaya-investasi.com',
    logo: params?.logoUrl || 'https://chandradaya-investasi.com/assets/frontend/images/logo.png',
    contactPoint: params?.contactNumber ? {
      '@type': 'ContactPoint',
      telephone: params.contactNumber,
      contactType: isId ? 'layanan pelanggan' : 'customer service',
      areaServed: 'ID',
      availableLanguage: ['Indonesian', 'English']
    } : undefined,
    sameAs: params?.socialLinks || [
      'https://www.youtube.com/@chandradayainvestasi',
      'https://www.linkedin.com/company/pt-chandra-daya-investasi'
    ]
  };
}

/**
 * WebSite Schema fallback generator
 */
export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PT Chandra Daya Investasi Tbk',
    url: 'https://chandradaya-investasi.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://chandradaya-investasi.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * BreadcrumbList Schema generator
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item
    }))
  };
}

/**
 * Article Schema fallback generator
 */
export function buildArticleSchema(params: ArticleParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: params.headline,
    image: params.imageUrl ? [params.imageUrl] : [],
    datePublished: params.datePublished,
    dateModified: params.datePublished,
    author: {
      '@type': 'Organization',
      name: params.authorName || 'PT Chandra Daya Investasi Tbk'
    },
    publisher: {
      '@type': 'Organization',
      name: 'PT Chandra Daya Investasi Tbk',
      logo: {
        '@type': 'ImageObject',
        url: 'https://chandradaya-investasi.com/assets/frontend/images/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': params.url
    }
  };
}

/**
 * Service Schema fallback generator
 */
export function buildServiceSchema(params: ServiceParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    provider: {
      '@type': 'Organization',
      name: 'PT Chandra Daya Investasi Tbk',
      url: 'https://chandradaya-investasi.com'
    },
    serviceType: params.name,
    url: params.url
  };
}
