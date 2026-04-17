// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://soft-bavarois-cdfa88.netlify.app",

  security: { csp: true },

  fonts: [
    {
      name: "Plus Jakarta Sans",
      cssVariable: "--font-jakarta",
      provider: fontProviders.fontsource(),
    },
    {
      name: "Nunito",
      cssVariable: "--font-nunito",
      provider: fontProviders.fontsource(),
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: netlify({
    devFeatures: {
      environmentVariables: true,
      images: true,
    },
  }),
  integrations: [sitemap()],
});
