// @ts-check
import { defineConfig, fontProviders, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://elianaalvarezpsicologa.com",

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

  image: {
    domains: ["d2gr4gsp182xcm.cloudfront.net"],
  },

  env: {
    schema: {
      CONTENT_ISLAND_SECRET_TOKEN: envField.string({
        context: "server",
        access: "secret",
        optional: false,
        default: "INFORM_VALID_TOKEN",
      }),
    },
  },

  adapter: netlify({
    devFeatures: {
      environmentVariables: true,
      images: true,
    },
  }),
  
  integrations: [
    sitemap({
      filter: (page) => ![
        "https://elianaalvarezpsicologa.com/politica-de-privacidad/",
        "https://elianaalvarezpsicologa.com/terminos-y-condiciones/",
        "https://elianaalvarezpsicologa.com/404/",
      ].includes(page),
    }),
  ],
});
