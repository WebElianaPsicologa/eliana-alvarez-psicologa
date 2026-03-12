# Quick Start: Author System

## 🎯 For Your CMS

**Your CMS only needs one field:**

```yaml
author: "Eliana Álvarez"
```

That's it! No bio, no credentials, no social media - just the name.

---

## 📝 In Your Blog Templates

```astro
---
import { getAuthorByName } from "@/config/authorBio";
import { generateBlogPostSchema } from "@/config/seoConf";

const post = await getCMSPost(slug);
const author = getAuthorByName(post.author); // "Eliana Álvarez" → full data
const schema = generateBlogPostSchema(post);  // Auto-generates rich schema
---

<article>
  <h1>{post.title}</h1>

  <!-- Author card with full details -->
  <div class="author">
    <img src={author.image} alt={author.name} />
    <h3>{author.name}</h3>
    <p>{author.role}</p>
    <p>{author.bio}</p>
  </div>

  <div set:html={post.content} />
</article>

<!-- SEO schema -->
<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

---

## ➕ Adding New Authors

Edit `src/config/authorBio.ts`:

```typescript
export const AUTHORS: Author[] = [
  {
    name: "Your New Author",  // Must match CMS author name
    role: "Job Title",
    bio: "Short bio highlighting expertise...",
    credentials: ["Specialty 1", "Specialty 2"],
    yearsOfExperience: 5,
    image: "/images/team/author.jpg",
    socialMedia: {
      linkedin: "https://linkedin.com/in/author",
      instagram: "https://instagram.com/author",
    },
  },
  // ... existing authors
];
```

---

## 🔧 Available Helper Functions

```typescript
// Get author by name (what CMS provides)
const author = getAuthorByName("Eliana Álvarez");

// Get all authors (for team page)
const team = getAllAuthors();

// Check if author exists
if (isValidAuthor("Author Name")) { ... }

// Get author names (for CMS dropdown)
const names = getAuthorNames();
```

---

## ✅ What This Gives You

### SEO Benefits
- ✅ Rich author snippets in Google
- ✅ E-E-A-T signals (expertise, authority, trust)
- ✅ Professional credentials visible to search engines
- ✅ Social proof via LinkedIn/Instagram links

### AI Search Benefits
- ✅ ChatGPT can cite you as an expert source
- ✅ Perplexity recognizes author credentials
- ✅ Google's AI Overviews prefer credentialed authors

### CMS Benefits
- ✅ Simple author field (just a name string)
- ✅ Update bios without touching CMS
- ✅ Consistent author data across all posts

---

## 📚 Full Documentation

See [AUTHOR_CMS_GUIDE.md](./AUTHOR_CMS_GUIDE.md) for complete guide.
