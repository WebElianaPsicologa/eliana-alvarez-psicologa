# Author Configuration & CMS Integration Guide

## Overview

This guide explains how the author system works for your blog posts and how to integrate it with your CMS for optimal SEO and E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals.

---

## 🎯 Key Concept: Name-Only CMS Integration

**Your CMS only needs to store the author NAME** (e.g., `"Eliana Álvarez"`).

All other author details (bio, credentials, social media, years of experience) are managed in `src/config/authorBio.ts`. This approach provides:

- ✅ **Better SEO**: Centralized E-E-A-T data ensures consistency
- ✅ **Simple CMS**: No complex author objects needed
- ✅ **Easy Updates**: Change author bio once, affects all posts
- ✅ **Rich Schemas**: Automatic generation of detailed Person schemas
- ✅ **AI Citations**: ChatGPT & Perplexity get proper author credentials

---

## 📁 File Structure

```
src/config/
├── authorBio.ts          ← Author database (you edit this)
├── seoConf.ts           ← SEO configuration (uses author data)
└── AUTHOR_CMS_GUIDE.md  ← This file
```

---

## 🔧 How It Works

### 1. Configure Authors (One-Time Setup)

Edit `src/config/authorBio.ts`:

```typescript
export const AUTHORS: Author[] = [
  {
    name: "Eliana Álvarez",  // ← MUST match CMS author name exactly
    role: "Psicóloga Clínica",
    bio: "Psicóloga clínica con más de 10 años de experiencia...",
    image: "/images/team/eliana-alvarez.jpg",
    credentials: [
      "Psicología Clínica",
      "Terapia Cognitivo-Conductual",
      // ... more credentials
    ],
    yearsOfExperience: 10,
    certifications: [
      "Licenciada en Psicología",
      "Especialista en Terapia Cognitivo-Conductual"
    ],
    socialMedia: {
      instagram: "https://www.instagram.com/elianapsicologia/",
      linkedin: "https://www.linkedin.com/in/eliana-alvarez-psicologa/",
    },
    url: "/sobre-mi",
  },
  // Add more authors as needed
];
```

### 2. CMS Configuration (Your Content Management System)

In your CMS, create a simple author field:

**Option A: Text Field (Recommended)**
```yaml
author:
  type: text
  label: Author Name
  default: "Eliana Álvarez"
  help: "Enter the author's full name (must match exactly)"
```

**Option B: Select Field**
```yaml
author:
  type: select
  label: Author
  options:
    - Eliana Álvarez
    # Add more authors as you configure them
```

**That's it!** No need to store bio, credentials, social media, etc. in your CMS.

### 3. Create Blog Posts in CMS

Your CMS blog post only needs:

```yaml
---
title: "Cómo Manejar la Ansiedad en el Trabajo"
description: "Estrategias prácticas para reducir el estrés laboral..."
author: "Eliana Álvarez"  # ← Just the name string!
publishDate: 2024-01-15
image: /images/blog/ansiedad-trabajo.jpg
tags: [ansiedad, trabajo, salud-mental]
---

Your blog post content here...
```

### 4. Use in Astro Templates

In your blog post template (`src/pages/blog/[slug].astro`):

```astro
---
import { getAuthorByName } from "@/config/authorBio";
import { generateBlogPostSchema } from "@/config/seoConf";

// Get post from CMS
const post = await getCMSPost(slug);

// Automatically resolve full author data from just the name
const author = getAuthorByName(post.author);
// Now author has: name, bio, credentials, social media, etc.

// Generate rich schema with E-E-A-T signals
const blogSchema = generateBlogPostSchema(post);
---

<!-- Display author info -->
<article>
  <h1>{post.title}</h1>

  <!-- Author card with full details -->
  <div class="author-card">
    <img src={author.image} alt={author.name} />
    <div>
      <h3>{author.name}</h3>
      <p class="role">{author.role}</p>
      <p class="bio">{author.bio}</p>

      <!-- Social media links -->
      {author.socialMedia?.linkedin && (
        <a href={author.socialMedia.linkedin}>LinkedIn</a>
      )}
    </div>
  </div>

  <!-- Post content -->
  <div set:html={post.content} />
</article>

<!-- Inject schema for SEO -->
<script type="application/ld+json" set:html={JSON.stringify(blogSchema)} />
```

---

## 🎨 What Gets Generated Automatically

When you use `getAuthorByName("Eliana Álvarez")`, you get:

```typescript
{
  name: "Eliana Álvarez",
  role: "Psicóloga Clínica",
  bio: "Psicóloga clínica con más de 10 años de experiencia...",
  image: "/images/team/eliana-alvarez.jpg",
  credentials: ["Psicología Clínica", "TCC", ...],
  yearsOfExperience: 10,
  certifications: ["Licenciada en Psicología", ...],
  socialMedia: { instagram: "...", linkedin: "..." },
  url: "/sobre-mi"
}
```

When you use `generateBlogPostSchema(post)`, you get rich JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "author": {
    "@type": "Person",
    "@id": "https://yoursite.com/about#eliana-alvarez",
    "name": "Eliana Álvarez",
    "description": "Psicóloga clínica con más de 10 años...",
    "jobTitle": "Psicóloga Clínica",
    "knowsAbout": ["Psicología Clínica", "TCC", ...],
    "yearsOfExperience": 10,
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Licenciada en Psicología"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/elianapsicologia/",
      "https://www.linkedin.com/in/eliana-alvarez-psicologa/"
    ]
  },
  "publisher": { "@id": "..." },
  // ... full blog post schema
}
```

---

## 📊 SEO Benefits (Why This Matters)

### Traditional SEO (Google/Bing)
- ✅ **Rich Snippets**: Author name, image, bio appear in search results
- ✅ **E-E-A-T Signals**: Credentials establish expertise
- ✅ **Author Authority**: Years of experience build trust
- ✅ **Social Proof**: LinkedIn/Instagram profiles verify identity

### AEO (Answer Engine Optimization)
- ✅ **Featured Snippets**: Author credentials help win "People Also Ask"
- ✅ **Voice Search**: Structured data helps Alexa/Siri attribute sources

### GEO (Generative Engine Optimization)
- ✅ **ChatGPT Citations**: Proper author schema helps AI cite your content
- ✅ **Perplexity Sources**: Credentials make you an authoritative source
- ✅ **Claude/Gemini**: Professional certifications build AI trust

---

## 🔄 Common Workflows

### Adding a New Author

1. Edit `src/config/authorBio.ts`
2. Add new author to `AUTHORS` array:
   ```typescript
   {
     name: "Dr. María López",  // Must match CMS author name
     role: "Psicóloga Infantil",
     bio: "...",
     credentials: [...],
     // ... full details
   }
   ```
3. In CMS, use `"Dr. María López"` as author name
4. Done! All schemas auto-generate

### Updating Author Bio

1. Edit `src/config/authorBio.ts`
2. Update author details
3. All existing blog posts automatically get updated schema
4. No CMS changes needed

### Handling Guest Authors

**Option A**: Add them to `AUTHORS` array (recommended)
```typescript
{
  name: "Guest Expert Name",
  role: "Guest Contributor",
  bio: "Brief guest bio...",
  credentials: ["Specialty 1", "Specialty 2"],
  // Minimal data is fine
}
```

**Option B**: Use empty/null author in CMS
- Falls back to `DEFAULT_AUTHOR` (your organization)
- Less ideal for E-E-A-T, but works

---

## 🚨 Important Rules

### ❌ DON'T DO THIS:
```typescript
// ❌ Don't store full author object in CMS
const post = {
  author: {
    name: "Eliana",
    bio: "...",
    // Complex object
  }
}
```

### ✅ DO THIS:
```typescript
// ✅ Store only the name string
const post = {
  author: "Eliana Álvarez"  // Simple string
}
```

### ⚠️ Name Matching Rules:
- Author name in CMS **must exactly match** `name` in `authorBio.ts`
- Matching is **case-insensitive** (`"eliana álvarez"` works)
- Whitespace is trimmed automatically
- If no match found, uses `DEFAULT_AUTHOR`

---

## 🔍 Helper Functions Available

### `getAuthorByName(name?: string): Author`
Returns full author data from just a name string.

```typescript
const author = getAuthorByName("Eliana Álvarez");
// Returns full Author object with bio, credentials, etc.

const fallback = getAuthorByName("");
// Returns DEFAULT_AUTHOR if name is empty/missing

const notFound = getAuthorByName("Unknown Person");
// Returns DEFAULT_AUTHOR if name not in database
```

### `getAllAuthors(): Author[]`
Returns all configured authors (useful for team page).

```typescript
const team = getAllAuthors();
// [{ name: "Eliana Álvarez", ... }, { name: "Dr. López", ... }]
```

### `isValidAuthor(name: string): boolean`
Check if an author exists (useful for CMS validation).

```typescript
if (isValidAuthor("Eliana Álvarez")) {
  // Author exists in database
}
```

### `getAuthorNames(): string[]`
Get list of all author names (useful for CMS dropdown).

```typescript
const authorOptions = getAuthorNames();
// ["Eliana Álvarez", "Dr. María López"]
```

---

## 📝 Example: Complete Blog Post Template

```astro
---
// src/pages/blog/[slug].astro
import MainLayout from "@/layouts/MainLayout.astro";
import { getAuthorByName } from "@/config/authorBio";
import { generateBlogPostSchema, generateDynamicSEO } from "@/config/seoConf";

// Get post from your CMS
const { slug } = Astro.params;
const post = await getPostFromCMS(slug);

// Resolve author (CMS only provides name string)
const author = getAuthorByName(post.author);

// Generate SEO
const seoProps = generateDynamicSEO({
  pageType: "blog-post",
  title: post.title,
  description: post.description,
  image: post.image,
  canonical: `/blog/${slug}`,
});

// Generate schema
const schemas = [generateBlogPostSchema(post)];
---

<MainLayout {seoProps} {schemas}>
  <article class="blog-post">
    <header>
      <h1>{post.title}</h1>
      <p class="description">{post.description}</p>

      <!-- Rich author card with E-E-A-T signals -->
      <div class="author-card">
        {author.image && (
          <img src={author.image} alt={author.name} loading="lazy" />
        )}
        <div class="author-info">
          <h3>{author.name}</h3>
          <p class="role">{author.role}</p>
          <p class="bio">{author.bio}</p>

          <!-- Show credentials for trust -->
          {author.yearsOfExperience && (
            <p class="experience">
              {author.yearsOfExperience} años de experiencia
            </p>
          )}

          <!-- Social proof -->
          <div class="social-links">
            {author.socialMedia?.linkedin && (
              <a href={author.socialMedia.linkedin} target="_blank" rel="noopener">
                LinkedIn
              </a>
            )}
            {author.socialMedia?.instagram && (
              <a href={author.socialMedia.instagram} target="_blank" rel="noopener">
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </header>

    <!-- Post content -->
    <div class="content" set:html={post.content} />
  </article>
</MainLayout>
```

---

## 🎯 Summary

1. **Configure authors once** in `src/config/authorBio.ts` with full E-E-A-T details
2. **CMS stores only author name** as a simple string
3. **Templates automatically resolve** full author data using `getAuthorByName()`
4. **Schemas auto-generate** with rich E-E-A-T signals for SEO
5. **AI search engines** get proper credentials for citations

This approach gives you **maximum SEO benefits** with **minimum CMS complexity**.

---

## 📚 Related Files

- [`src/config/authorBio.ts`](./authorBio.ts) - Author database configuration
- [`src/config/seoConf.ts`](./seoConf.ts) - SEO & schema generators
- Example blog template: Create at `src/pages/blog/[slug].astro`

---

**Questions?** Check the inline comments in `authorBio.ts` and `seoConf.ts` for more details!
