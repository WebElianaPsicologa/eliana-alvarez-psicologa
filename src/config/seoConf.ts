// =============================================================================
// SEO Configuration Template - Simplified Version
// src/config/seoConfig.ts
// =============================================================================

import type { SEOProps } from "astro-seo";
import { services, type Service } from "./services";
import { allFAQs, type FAQItem } from "./faqs";
import { AUTHORS, getAuthorByName, type Author } from "./authorBio";

// Re-export for convenience
export { services, type Service };
export { allFAQs, type FAQItem };
export { generalFAQs } from "./faqs";
export { AUTHORS, getAuthorByName, type Author };

// =============================================================================
// 1. TYPE DEFINITIONS
// =============================================================================

export interface CompanyInfo {
  name: string;
  description: string;
  url: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    countryCode: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  logo: string;
  image: string;
  foundingDate: string;
  founders?: string[];
  socialMedia: Record<string, string>;
}

export interface MainKeywords {
  primary: string[];
  secondary: string[];
  tertiary: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  publishDate: Date;
  modifiedDate?: Date;
  tags?: string[];
  image?: string;
  author?: string;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface DynamicSEOOptions {
  pageType: string;
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  location?: string;
  customData?: Record<string, string>;
  image?: string;
}

export type JSONLDSchema = Record<string, unknown>;

// =============================================================================
// 2. COMPANY CONFIGURATION - CUSTOMIZE THIS FOR EACH PROJECT
// =============================================================================

export const COMPANY_INFO: CompanyInfo = {
  name: "Eliana Álvarez - Psicóloga",
  description:
    "Psicóloga clínica con más de 20 años de experiencia acompañando a mujeres, adolescentes y familias a sanar la ansiedad, superar duelos y reconstruir vínculos mediante una terapia integral, humana y sin fronteras.",
  url: "https://elianaalvarezpsicologa.com/",
  phone: "", // TODO: Verify this phone number
  email: "contacto@elianaalvarezpsicologa.com",
  address: {
    street: "Atención 100% Online",
    city: "São Paulo",
    region: "SP",
    postalCode: "01000-000",
    country: "Brasil",
    countryCode: "BR",
  },
  geo: {
    latitude: -23.5505,
    longitude: -46.6333,
  },
  logo: "/images/logo.png",
  image: "/images/og-image.png",
  foundingDate: "2001", // TODO: Verify this date
  founders: ["Eliana Álvarez"],
  socialMedia: {
    youtube: "https://www.youtube.com/@ElianaAlvarezPsicologa",
    instagram: "https://www.instagram.com/elianaalvarezpsicologa",
    whatsapp: "https://api.whatsapp.com/send?phone=5513997283229&text=Hola%20buen%20d%C3%ADa%2C%0AEstoy%20interesado%2Fa%20en%20el%20servicio%20de%20psicolog%C3%ADa",
  },
};

// =============================================================================
// 3. KEYWORDS CONFIGURATION - FOR JSON-LD SCHEMAS & CONTENT STRATEGY
// Note: NOT used in meta keywords tag (deprecated since 2009)
// =============================================================================

export const MAIN_KEYWORDS: MainKeywords = {
  primary: [
    "psicóloga online",
    "terapia online",
    "psicoterapia",
    "ayuda psicológica",
  ] as string[],
  secondary: [
    "terapia para ansiedad",
    "terapia de duelo",
    "terapia familiar online",
    "orientación psicológica",
    "psicoterapia cognitivo conductual",
    "terapia humanista",
    "mirada sistémica",
  ] as string[],
  tertiary: [
    "duelo migratorio",
    "terapia online para mujeres",
    "psicóloga para adolescentes",
    "orientación vocacional online",
    "terapia de pareja online",
    "ruptura amorosa",
    "comunicación familiar",
    "adaptación a nuevo país",
    "ansiedad por mudanza internacional",
    "desarrollo de habilidades emocionales",
    "crianza positiva",
    "inteligencia emocional",
    "resiliencia",
    "terapia sin fronteras",
    "psicóloga hispanohablante Brasil",
  ] as string[],
};

// =============================================================================
// 4. DEFAULT SEO CONFIGURATION
// =============================================================================

export const DEFAULT_SEO: SEOProps = {
  title: `${COMPANY_INFO.name} | Terapia Integral y Humana`,
  description: COMPANY_INFO.description,
  canonical: COMPANY_INFO.url,
  openGraph: {
    basic: {
      title: `Eliana Álvarez - Terapia Online Sin Fronteras`,
      type: "website",
      image: `${COMPANY_INFO.url}${COMPANY_INFO.image}`,
      url: COMPANY_INFO.url,
    },
    optional: {
      description: COMPANY_INFO.description,
      siteName: COMPANY_INFO.name,
      locale: "es_ES",
    },
  },
  twitter: {
    card: "summary_large_image",
    site: "@elianaalvarez",
    creator: "@elianaalvarez",
    title: `Eliana Álvarez - Terapia Online Sin Fronteras`,
    description: COMPANY_INFO.description,
    image: `${COMPANY_INFO.url}${COMPANY_INFO.image}`,
  },
  extend: {
    meta: [
      { name: "robots", content: "index, follow" },
      { name: "author", content: COMPANY_INFO.name },
      { name: "theme-color", content: "#674D72" },
      { name: "msapplication-TileColor", content: "#674D72" },
      { httpEquiv: "Content-Language", content: "es" },
      { name: "geo.region", content: "BR-SP" },
      { name: "geo.placename", content: "São Paulo" },
    ],
  },
};

// =============================================================================
// 5. DYNAMIC SEO GENERATORS
// =============================================================================

/**
 * Main function to generate dynamic SEO props for any page
 */
export function generateDynamicSEO(options: DynamicSEOOptions): SEOProps {
  const baseVars = {
    company: COMPANY_INFO.name,
    primaryKeyword: MAIN_KEYWORDS.primary[0] ?? "",
    location: options.location ?? COMPANY_INFO.address.city,
    cta: "Contact us today",
    ...options.customData,
  };

  const title = options.title ?? generateDynamicTitle(options, baseVars);
  const description =
    options.description ?? generateDynamicDescription(options, baseVars);
  const canonical = options.canonical ?? `/${options.pageType}/`;

  const fullUrl = canonical.startsWith("http")
    ? canonical
    : `${COMPANY_INFO.url}${canonical}`;
  const imageUrl = options.image
    ? `${COMPANY_INFO.url}${options.image}`
    : `${COMPANY_INFO.url}${COMPANY_INFO.image}`;

  return {
    title,
    description,
    canonical: fullUrl,
    noindex: options.noindex ?? false,
    openGraph: {
      basic: {
        title,
        type: "website",
        image: imageUrl,
        url: fullUrl,
      },
      optional: {
        description,
        siteName: COMPANY_INFO.name,
        locale: "es_ES",
      },
    },
    twitter: {
      card: "summary_large_image",
      site: "@elianaalvarez",
      creator: "@elianaalvarez",
      title,
      description,
      image: imageUrl,
    },
    extend: {
      meta: [
        { name: "author", content: COMPANY_INFO.name },
        {
          name: "robots",
          content: options.noindex ? "noindex, nofollow" : "index, follow",
        },
        { name: "theme-color", content: "#674D72" },
        { httpEquiv: "Content-Language", content: "es" },
      ],
    },
  };
}

/**
 * Generate dynamic title based on page type
 */
function generateDynamicTitle(
  options: DynamicSEOOptions,
  vars: Record<string, string>,
): string {
  const { pageType } = options;

  const titleMappings: Record<string, string> = {
    home: `${vars.company} | ${vars.primaryKeyword}`,
    about: `Quiénes Somos | ${vars.company}`,
    services: `Servicios | ${vars.company}`,
    contact: `Contacto | ${vars.company}`,
    blog: `Blog | ${vars.company}`,
    faq: `Preguntas Frecuentes | ${vars.company}`,
    privacy: `Política de Privacidad | ${vars.company}`,
    terms: `Términos de Servicio | ${vars.company}`,
  };

  if (titleMappings[pageType]) {
    return titleMappings[pageType];
  }

  const formattedType = pageType
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return `${formattedType} | ${vars.company}`;
}

/**
 * Generate dynamic description based on page type
 */
function generateDynamicDescription(
  options: DynamicSEOOptions,
  vars: Record<string, string>,
): string {
  const { pageType } = options;

  const descriptionMappings: Record<string, string> = {
    home: `${vars.company} - ${COMPANY_INFO.description}`,
    about: `Conoce a ${vars.company} y nuestra misión. Expertos en ${vars.primaryKeyword} en ${vars.location}.`,
    services: `Explora nuestros servicios profesionales. ${vars.company} ofrece soluciones de ${vars.primaryKeyword}.`,
    contact: `Ponte en contacto con ${vars.company}. Contacta a nuestros expertos en ${vars.primaryKeyword} hoy.`,
    blog: `Blog de ${vars.company} - Artículos, guías y consejos sobre ${vars.primaryKeyword}.`,
    faq: `Preguntas frecuentes sobre ${vars.company}. Encuentra respuestas a tus dudas.`,
  };

  if (descriptionMappings[pageType]) {
    return descriptionMappings[pageType];
  }

  return `${vars.company} - ${vars.primaryKeyword}. ${vars.cta}`;
}

// =============================================================================
// 6. JSON-LD SCHEMA GENERATORS
// =============================================================================

/**
 * Organization Schema with hasOfferCatalog
 */
export const ORGANIZATION_SCHEMA: JSONLDSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${COMPANY_INFO.url}#organization`,
  name: COMPANY_INFO.name,
  alternateName: [],
  description: COMPANY_INFO.description,
  url: COMPANY_INFO.url,
  logo: `${COMPANY_INFO.url}${COMPANY_INFO.logo}`,
  image: `${COMPANY_INFO.url}${COMPANY_INFO.image}`,
  foundingDate: COMPANY_INFO.foundingDate,
  telephone: COMPANY_INFO.phone,
  email: COMPANY_INFO.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY_INFO.address.street,
    addressLocality: COMPANY_INFO.address.city,
    addressRegion: COMPANY_INFO.address.region,
    postalCode: COMPANY_INFO.address.postalCode,
    addressCountry: COMPANY_INFO.address.countryCode,
  },
  ...(COMPANY_INFO.geo && {
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY_INFO.geo.latitude,
      longitude: COMPANY_INFO.geo.longitude,
    },
  }),
  founders: COMPANY_INFO.founders?.map((founder) => ({
    "@type": "Person",
    name: founder,
  })),
  sameAs: Object.values(COMPANY_INFO.socialMedia).filter(Boolean),
  areaServed: {
    "@type": "Country",
    name: COMPANY_INFO.address.country,
  },
  knowsAbout: [...MAIN_KEYWORDS.primary, ...MAIN_KEYWORDS.secondary],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Our Professional Services",
    description: "Specialized services for professionals and businesses",
    itemListElement: services.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        "@id": `${COMPANY_INFO.url}/services/${service.slug}#service`,
        name: service.title,
        description: service.seoDescription,
        url: `${COMPANY_INFO.url}/services/${service.slug}`,
        provider: {
          "@id": `${COMPANY_INFO.url}#organization`,
        },
      },
    })),
  },
};

/**
 * Website Schema with SearchAction
 */
export const WEBSITE_SCHEMA: JSONLDSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${COMPANY_INFO.url}#website`,
  name: COMPANY_INFO.name,
  alternateName: COMPANY_INFO.name,
  description: COMPANY_INFO.description,
  url: COMPANY_INFO.url,
  inLanguage: "es-ES",
  copyrightYear: new Date().getFullYear(),
  copyrightHolder: {
    "@type": "Organization",
    name: COMPANY_INFO.name,
  },
  publisher: {
    "@id": `${COMPANY_INFO.url}#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${COMPANY_INFO.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/**
 * Blog Schema
 */
export const BLOG_SCHEMA: JSONLDSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${COMPANY_INFO.url}/blog#blog`,
  name: `Blog - ${COMPANY_INFO.name}`,
  description: `Artículos, guías y consejos de ${COMPANY_INFO.name}`,
  url: `${COMPANY_INFO.url}/blog`,
  inLanguage: "es-ES",
  author: {
    "@id": `${COMPANY_INFO.url}#organization`,
  },
  publisher: {
    "@id": `${COMPANY_INFO.url}#organization`,
  },
  about: {
    "@type": "Thing",
    name: MAIN_KEYWORDS.primary[0],
  },
};

/**
 * Generate BlogPosting Schema
 * Automatically resolves author to full Person schema for E-E-A-T
 *
 * HOW IT WORKS WITH CMS:
 * - CMS only needs to provide: post.author = "Eliana Álvarez" (just the name string)
 * - This function automatically looks up full author data from authorBio.ts
 * - Generates complete author schema with credentials, bio, social media
 * - Result: Rich E-E-A-T signals for better SEO & AI citations
 *
 * @param post - Blog post data from CMS (only needs author name)
 * @returns Complete BlogPosting schema with full author Person schema
 */
export function generateBlogPostSchema(post: BlogPost): JSONLDSchema {
  // Resolve author name from CMS to full author data
  const author = getAuthorByName(post.author ?? "");

  // Build social media array for author
  const authorSameAs = [];
  if (author.socialMedia?.linkedin)
    authorSameAs.push(author.socialMedia.linkedin);
  if (author.socialMedia?.instagram)
    authorSameAs.push(author.socialMedia.instagram);
  if (author.socialMedia?.twitter)
    authorSameAs.push(author.socialMedia.twitter);
  if (author.socialMedia?.facebook)
    authorSameAs.push(author.socialMedia.facebook);

  // Create rich author schema for E-E-A-T
  const authorSchema: Record<string, unknown> = {
    "@type": "Person",
    "@id": `${COMPANY_INFO.url}/about#${author.name.toLowerCase().replace(/\s+/g, "-")}`,
    name: author.name,
    description: author.bio,
    jobTitle: author.role,
    knowsAbout: author.credentials,
    ...(author.image && { image: `${COMPANY_INFO.url}${author.image}` }),
    ...(author.url && { url: `${COMPANY_INFO.url}${author.url}` }),
    ...(authorSameAs.length > 0 && { sameAs: authorSameAs }),
  };

  // Add E-E-A-T enhancements
  if (author.yearsOfExperience) {
    authorSchema.yearsOfExperience = author.yearsOfExperience;
  }

  if (author.certifications && author.certifications.length > 0) {
    authorSchema.hasCredential = author.certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Certification",
      name: cert,
    }));
  }

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${COMPANY_INFO.url}/blog/${post.id}#article`,
    headline: post.title,
    description: post.description,
    url: `${COMPANY_INFO.url}/blog/${post.id}`,
    datePublished: post.publishDate.toISOString(),
    dateModified: (post.modifiedDate ?? post.publishDate).toISOString(),
    author: authorSchema,
    publisher: {
      "@id": `${COMPANY_INFO.url}#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${COMPANY_INFO.url}/blog/${post.id}`,
    },
    ...(post.image && {
      image: {
        "@type": "ImageObject",
        url: `${COMPANY_INFO.url}${post.image}`,
        width: 1200,
        height: 630,
      },
    }),
    keywords: post.tags?.join(", ") ?? MAIN_KEYWORDS.primary.join(", "),
    inLanguage: "es-ES",
    isPartOf: {
      "@id": `${COMPANY_INFO.url}/blog#blog`,
    },
    articleSection: MAIN_KEYWORDS.primary[0],
  };
}

/**
 * Generate FAQPage Schema
 */
export function generateFAQSchema(faqItems: FAQItem[]): JSONLDSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(
  breadcrumbs: BreadcrumbItem[],
): JSONLDSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${COMPANY_INFO.url}${crumb.path}`,
    })),
  };
}

/**
 * Generate Service Schema for individual service pages
 * Use on /services/[slug] pages
 */
export function generateServiceSchema(service: Service): JSONLDSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${COMPANY_INFO.url}/services/${service.slug}#service`,
    name: service.title,
    description: service.seoDescription,
    url: `${COMPANY_INFO.url}/services/${service.slug}`,
    provider: {
      "@id": `${COMPANY_INFO.url}#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: COMPANY_INFO.address.country,
    },
    ...(service.image && {
      image: {
        "@type": "ImageObject",
        url: `${COMPANY_INFO.url}${service.image}`,
      },
    }),
    ...(service.benefits &&
      service.benefits.length > 0 && {
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${service.title} - Beneficios`,
          itemListElement: service.benefits.map((benefit, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: benefit,
            },
          })),
        },
      }),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `${COMPANY_INFO.url}/services/${service.slug}`,
      seller: {
        "@id": `${COMPANY_INFO.url}#organization`,
      },
    },
  };
}

/**
 * ProfessionalService Schema for psychology practice
 * More appropriate than LocalBusiness for therapy/counseling services
 * Critical for establishing professional credentials (E-E-A-T)
 */
export const LOCAL_BUSINESS_SCHEMA: JSONLDSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${COMPANY_INFO.url}#professional-service`,
  name: COMPANY_INFO.name,
  description: COMPANY_INFO.description,
  url: COMPANY_INFO.url,
  telephone: COMPANY_INFO.phone,
  email: COMPANY_INFO.email,
  logo: `${COMPANY_INFO.url}${COMPANY_INFO.logo}`,
  image: `${COMPANY_INFO.url}${COMPANY_INFO.image}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY_INFO.address.street,
    addressLocality: COMPANY_INFO.address.city,
    addressRegion: COMPANY_INFO.address.region,
    postalCode: COMPANY_INFO.address.postalCode,
    addressCountry: COMPANY_INFO.address.countryCode,
  },
  ...(COMPANY_INFO.geo && {
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY_INFO.geo.latitude,
      longitude: COMPANY_INFO.geo.longitude,
    },
  }),
  sameAs: Object.values(COMPANY_INFO.socialMedia).filter(Boolean),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "19:00",
  },
  priceRange: "$$",
  paymentAccepted: "Transferencia bancaria, PayPal, Tarjeta de crédito",
  areaServed: [
    { "@type": "Country", name: "España" },
    { "@type": "Country", name: "México" },
    { "@type": "Country", name: "Argentina" },
    { "@type": "Country", name: "Colombia" },
    { "@type": "Country", name: "Brasil" },
    { "@type": "Country", name: "Chile" },
    { "@type": "Country", name: "Perú" },
  ],
  knowsAbout: [
    "Terapia Cognitivo-Conductual",
    "Terapia Humanista",
    "Terapia Sistémica",
    "Duelo Migratorio",
    "Ansiedad",
    "Terapia Familiar",
    "Orientación Vocacional",
  ],
};

/**
 * Generate Author/Person Schema for E-E-A-T
 * Use for blog posts and about page
 *
 * CRITICAL FOR SEO & AI CITATIONS:
 * - Establishes author expertise (E-E-A-T)
 * - Helps ChatGPT/Perplexity identify authoritative sources
 * - Links author to organization for trust signals
 * - Includes credentials and social proof
 */
export function generateAuthorSchema(author: Author): JSONLDSchema {
  // Collect all social media profiles for authority signals
  const sameAs = [];
  if (author.socialMedia?.linkedin) sameAs.push(author.socialMedia.linkedin);
  if (author.socialMedia?.instagram) sameAs.push(author.socialMedia.instagram);
  if (author.socialMedia?.twitter) sameAs.push(author.socialMedia.twitter);
  if (author.socialMedia?.facebook) sameAs.push(author.socialMedia.facebook);

  const schema: JSONLDSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${COMPANY_INFO.url}/about#${author.name.toLowerCase().replace(/\s+/g, "-")}`,
    name: author.name,
    description: author.bio,
    jobTitle: author.role,
    ...(author.image && { image: `${COMPANY_INFO.url}${author.image}` }),
    ...(author.url && { url: `${COMPANY_INFO.url}${author.url}` }),
    worksFor: {
      "@id": `${COMPANY_INFO.url}#organization`,
    },
    knowsAbout: author.credentials,
    ...(sameAs.length > 0 && { sameAs }),
  };

  // Add optional E-E-A-T enhancements if available
  if (author.yearsOfExperience) {
    schema.yearsOfExperience = author.yearsOfExperience;
  }

  if (author.certifications && author.certifications.length > 0) {
    schema.hasCredential = author.certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Certification",
      name: cert,
    }));
  }

  return schema;
}

/**
 * Generate all author schemas for about page
 */
export function generateAllAuthorsSchemas(): JSONLDSchema[] {
  return AUTHORS.map((author) => generateAuthorSchema(author));
}

// =============================================================================
// 7. EXPORT ALL SCHEMAS FOR EASY ACCESS
// =============================================================================

export const ALL_BASE_SCHEMAS = {
  organization: ORGANIZATION_SCHEMA,
  website: WEBSITE_SCHEMA,
  blog: BLOG_SCHEMA,
  localBusiness: LOCAL_BUSINESS_SCHEMA,
};
