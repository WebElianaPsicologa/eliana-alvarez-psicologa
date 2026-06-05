// =============================================================================
// AUTHORS CONFIGURATION FOR E-E-A-T & SEO
// src/config/authorBio.ts
// =============================================================================
//
// This file manages author data for blog posts to enhance E-E-A-T signals
// (Experience, Expertise, Authoritativeness, Trustworthiness) for both
// traditional SEO and AI-powered search engines (ChatGPT, Perplexity, etc.)
//
// HOW IT WORKS WITH CMS:
// - Your CMS only needs to provide the author NAME (e.g., "Eliana Álvarez")
// - All detailed author information (bio, credentials, social media) is managed HERE
// - This ensures consistent E-E-A-T signals and proper schema markup
// - The `getAuthorByName()` function matches CMS author name to full author data
//
// WHY THIS APPROACH:
// - ✅ Centralized E-E-A-T data (credentials, expertise) for better SEO
// - ✅ Consistent author schemas across all blog posts
// - ✅ Easy to update author bios without touching CMS
// - ✅ Simple CMS integration (only pass author name string)
// - ✅ Supports multiple authors for team blogs
//
// =============================================================================

export interface Author {
  /** Author's full name - MUST match exactly with CMS author field */
  name: string;

  /** Professional role/title - displayed on author cards and schema */
  role: string;

  /** Short bio (1-2 sentences) - enhances E-E-A-T by showing expertise */
  bio: string;

  /** Author's profile image URL (optional but recommended for trust signals) */
  image?: string;

  /** Professional credentials - critical for E-E-A-T and schema markup */
  credentials: string[];

  /** Social media profiles - provides authority signals for SEO */
  socialMedia?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };

  /** Author's profile page URL on this site (optional) */
  url?: string;

  /** Years of experience (optional but recommended for E-E-A-T) */
  yearsOfExperience?: number;

  /** Professional licenses/certifications (optional, great for E-E-A-T) */
  certifications?: string[];
}

export const AUTHORS: Author[] = [
  {
    name: "Eliana Alvarez",
    role: "Psicóloga",
    bio: "Psicóloga con más de 20 años de experiencia acompañando adultos, adolescentes y familias. Especialista en duelo migratorio y atención a población hispanohablante desde Brasil.",
    image: "/images/team/eliana-alvarez.jpg",
    credentials: [
      "Terapia Cognitivo-Conductual",
      "Terapia Humanista",
      "Terapia Sistémica",
      "Duelo Migratorio",
      "Terapia Familiar",
      "Orientación Vocacional",
    ],
    yearsOfExperience: 23,
    certifications: [
      "Licenciada en Psicología (2001)",
      "Enfoque Pluralista (TCC, Humanista, Sistémica)",
      "Especialista en Migrantes y Duelo Migratorio",
    ],
    socialMedia: {
      instagram: "",
      linkedin: "",
    },
    url: "/sobre-mi",
  },
  // Add more authors as your team grows
  // {
  //   name: "Another Author",
  //   role: "Guest Contributor",
  //   bio: "...",
  //   credentials: [...],
  // },
];

// =============================================================================
// DEFAULT AUTHOR (FALLBACK)
// =============================================================================
//
// Used when:
// 1. CMS author name doesn't match any author in AUTHORS array
// 2. Blog post has no author field
// 3. Generic/organization content
//
// For SEO best practices, this uses the organization as the author with
// generic credentials. However, individual authors with specific expertise
// perform MUCH better for E-E-A-T.
//
// =============================================================================

export const DEFAULT_AUTHOR: Author = {
  name: "Eliana Alvarez - Psicóloga",
  role: "Psicóloga",
  bio: "Psicóloga con más de 20 años de experiencia acompañando a adultos, adolescentes y familias mediante una terapia integral, humana y sin fronteras.",
  credentials: [
    "Terapia Cognitivo-Conductual",
    "Terapia Humanista",
    "Terapia Sistémica",
    "Duelo Migratorio",
    "Terapia Familiar",
  ],
  socialMedia: {
    instagram: "",
    linkedin: "",
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get author by name (matches CMS author field)
 *
 * @param name - Author name from CMS (can be undefined/empty)
 * @returns Author object with full data for schema generation
 *
 * @example
 * // In your blog post template:
 * const post = await getCMSPost();
 * const author = getAuthorByName(post.author); // "Eliana Álvarez"
 * // Now use author.name, author.bio, author.credentials for display & schema
 */
export function getAuthorByName(name?: string): Author {
  // Handle missing or empty author name
  if (!name || name.trim() === "") {
    return DEFAULT_AUTHOR;
  }

  // Find author by exact name match (case-insensitive for flexibility)
  const foundAuthor = AUTHORS.find(
    (author) => author.name.toLowerCase() === name.toLowerCase(),
  );

  return foundAuthor || DEFAULT_AUTHOR;
}

/**
 * Get all authors (useful for team/about pages)
 *
 * @returns Array of all configured authors
 *
 * @example
 * // On your About/Team page:
 * const team = getAllAuthors();
 * // Display all team members with their credentials
 */
export function getAllAuthors(): Author[] {
  return AUTHORS;
}

/**
 * Validate if author name exists in database
 * Useful for CMS validation or author selection UI
 *
 * @param name - Author name to validate
 * @returns true if author exists, false otherwise
 */
export function isValidAuthor(name: string): boolean {
  return AUTHORS.some(
    (author) => author.name.toLowerCase() === name.toLowerCase(),
  );
}

/**
 * Get list of all author names (useful for CMS author dropdown)
 *
 * @returns Array of author name strings
 *
 * @example
 * // For CMS author field options:
 * const authorOptions = getAuthorNames();
 * // ["Eliana Álvarez", "Another Author", ...]
 */
export function getAuthorNames(): string[] {
  return AUTHORS.map((author) => author.name);
}
