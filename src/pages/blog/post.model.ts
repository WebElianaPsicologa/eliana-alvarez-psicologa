import type { Media } from "@content-island/api-client";

export interface BlogPost {
  id: string;
  language: "en";
  lastUpdate: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  title: string;
  slug: string;
  pubDate: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  description: string;
  seoDescription: string;
  author: string;
  image?: Media;
  content: string;
}
