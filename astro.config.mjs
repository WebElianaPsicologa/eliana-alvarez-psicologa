// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  security: { csp: true },

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: netlify(),
  integrations: [sitemap()],
});
