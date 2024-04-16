import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
// Algolia Search
import starlightDocSearch from "@astrojs/starlight-docsearch";
// Tailwind
import tailwind from "@astrojs/tailwind";
// https://github.com/HiDeoo/starlight-links-validator
import starlightLinksValidator from "starlight-links-validator";
// https://github.com/HiDeoo/starlight-image-zoom
import starlightImageZoom from "starlight-image-zoom";
// https://github.com/HiDeoo/starlight-blog
import starlightBlog from "starlight-blog";
// https://docs.astro.build/en/guides/integrations-guide/sitemap/
import sitemap from "@astrojs/sitemap";
// https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt#readme
import robotsTxt from "astro-robots-txt";
// https://github.com/giuseppelt/astro-lottie
import lottie from "astro-integration-lottie";
// Configure global authors here
import { authors } from "./src/content/docs/blog/authors";
import betterImageService from "astro-better-image-service";
import playformCompress from "@playform/compress";
const site = "https://truecharts.org";


// https://astro.build/config
export default defineConfig({
  site: site,
  base: "/",
  output: "static",
  outDir: "build",
  cacheDir: ".astro/cache",
  trailingSlash: "ignore",
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport"
  },
  build: {
    output: "directory"
  },
  experimental: {
    // TODO: Enable this after bug is fixed
    //  https://github.com/withastro/astro/issues/9353
    contentCollectionCache: false
  },
  integrations: [starlight({
    title: "TrueCharts Charts",
    tagline: "Awesome Helm Charts",
    logo: {
      src: "./src/assets/with-text.svg",
      replacesTitle: true
    },
    head: [{
      tag: "script",
      attrs: {
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9270569596814796",
        crossorigin: "anonymous",
        defer: true
      }
    }, {
      tag: "script",
      attrs: {
        src: "https://www.googletagmanager.com/gtag/js?id=G-Q9NT692BZZ",
        defer: true
      }
    }, {
      tag: "script",
      content: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-Q9NT692BZZ');"
    }],
    tableOfContents: {
      maxHeadingLevel: 6
    },
    social: {
      github: "https://github.com/truecharts",
      facebook: "https://www.facebook.com/truecharts",
      "x.com": "https://twitter.com/useTrueCharts",
      discord: "https://discord.gg/tVsPTHWTtr",
      telegram: "https://t.me/s/truecharts",
      openCollective: "https://opencollective.com/truecharts",
      patreon: "https://patreon.com/truecharts"
    },
    editLink: {
      baseUrl: "https://github.com/truecharts/chart-docs/edit/main/docs"
    },
    lastUpdated: true,
    components: {
      Header: "./src/components/CustomHeader.astro",
      Hero: "./src/components/CustomHero.astro"
    },
    plugins: [starlightImageZoom(), starlightBlog({
      title: "TrueCharts News",
      postCount: 5,
      recentPostCount: 10,
      authors: authors
    }), starlightLinksValidator({
      errorOnRelativeLinks: false,
      errorOnFallbackPages: false
    }), starlightDocSearch({
      appId: "M5JIEOBD9S",
      apiKey: "996ff61cece86950829f65416b941711",
      indexName: "truecharts"
    })],
    sidebar: [{
      label: "General",
      collapsed: false,
      autogenerate: {
        directory: "general",
        collapsed: true
      }
    }, {
      label: "Platforms",
      collapsed: true,
      autogenerate: {
        directory: "platforms"
      }
    }, {
      label: "Development",
      collapsed: true,
      autogenerate: {
        directory: "development"
      }
    }, {
      label: "Charts",
      collapsed: true,
      autogenerate: {
        directory: "charts"
      }
    }]
  }),
    sitemap(), robotsTxt(), tailwind(), lottie(), betterImageService(),
    (await import("@playform/compress")).default({
      HTML: false,
      CSS: true,
      JavaScript: true,
      Image: true,
      SVG: true,
    }),
  ]
});