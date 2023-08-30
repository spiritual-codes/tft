import { defineConfig } from "astro/config";
import astropodConfig from "./.astropod/astropod.config.json";
import compress from "astro-compress";
import compressor from "astro-compressor";
import dcapConfig from "./decap.config.mjs";
import mdx from "@astrojs/mdx";
import NetlifyCMS from "astro-netlify-cms";
import image from "@astrojs/image";
import robotsTxt from "astro-robots-txt";
import sitemap from "astro-sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    compress(),
    compressor(),
    robotsTxt({
      policy: [{
        userAgent: "*",
        allow: "/",
        disallow: "/admin"
      }]
    }), 
    mdx(),
    sitemap(),
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
      cacheDir: "./.cache/image",
      logLevel: "debug"
    }),
    NetlifyCMS({
      config: dcapConfig()
    })
  ],
  site: astropodConfig.link
});