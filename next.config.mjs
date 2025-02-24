import {withSentryConfig} from "@sentry/nextjs";
/** @type {import('next').NextConfig} */

// eslint-disable-next-line prettier/prettier
import packageJson from "./package.json" with { type: "json" };
import "./scripts/download-blog-posts.data.json.mjs"
import createMDX from "@next/mdx"
import rehypeRaw from "rehype-raw"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

// const { withSentryConfig } = require("@sentry/nextjs")

const nextConfig = {
  env: {
    NEXT_PUBLIC_VERSION: packageJson.version,
    NEXT_PUBLIC_FRONTENDS_URL:
      process.env.VERCEL_ENV === "production"
        ? "https://scroll.io"
        : process.env.VERCEL_BRANCH_URL
          ? `https://${process.env.VERCEL_BRANCH_URL}`
          : "http://localhost:3000",
  },
  images: {
    deviceSizes: [600, 900, 1200, 1536],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scroll-tech.github.io",
        port: "",
        pathname: "/token-list/data/**",
      },
      {
        protocol: "https",
        hostname: "scroll-eco-list.netlify.app",
        port: "",
        pathname: "/logos/**",
      },
    ],
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // trailingSlash: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'",
          },
        ],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: "/developer-nft",
        destination: "/developer-nft/mint",
        permanent: true,
      },
      // blog
      { source: "/blog/scalingSecurity", destination: "/blog/scaling-security", permanent: true },
      { source: "/blog/founderLetter", destination: "/blog/founder-letter", permanent: true },
      { source: "/blog/scrollSepolia", destination: "/blog/scroll-sepolia", permanent: true },
      { source: "/blog/contributeToScroll", destination: "/blog/contribute-to-scroll", permanent: true },
      { source: "/blog/alphaTestnet", destination: "/blog/alpha-testnet", permanent: true },
      { source: "/blog/releaseNote0109", destination: "/blog/release-note-0109", permanent: true },
      { source: "/blog/proofGeneration", destination: "/blog/proof-generation", permanent: true },
      { source: "/blog/upgradingPreAlphaTestnet", destination: "/blog/upgrading-pre-alpha-testnet", permanent: true },
      { source: "/blog/technicalPrinciples", destination: "/blog/technical-principles", permanent: true },
      { source: "/blog/preAlphaTestnet", destination: "/blog/pre-alpha-testnet", permanent: true },
      { source: "/blog/visionAndValues", destination: "/blog/vision-and-values", permanent: true },
      { source: "/blog/scrollsFreshCoat", destination: "/blog/scrolls-fresh-coat", permanent: true },

      { source: "/sticker-vote", destination: "/sticker-winners", permanent: true },
      // { source: "/airdrop-faq", destination: "https://scroll-faqs.gitbook.io/faqs", permanent: false},
    ]
  },
  async rewrites() {
    return [
      {
        source: '/gov-docs/:path*',
        destination: 'https://scroll-governance-documentation.vercel.app/:path*'
      },
      {
        source: '/research',
        destination: 'https://scroll-research.vercel.app/research'
      },
      {
        source: '/research/:path*',
        destination: 'https://scroll-research.vercel.app/research/:path*'
      }
    ]
  },
  // eslint-disable-next-line
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.ignoreWarnings = [
      function ignoreSourcemapsloaderWarnings(warning) {
        return warning.module && warning.module.resource.includes("node_modules") && warning.details && warning.details.includes("source-map-loader")
      },
    ]
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.(".svg"))
    config.module.rules.push(
      ...[
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                svgoConfig: {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    )

    fileLoaderRule.exclude = /\.svg$/i

    config.externals.push("pino-pretty", "lokijs", "encoding")

    return config
  },
  // sentry: {
  //   // For all available options, see:
  //   // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  //   // Upload a larger set of source maps for prettier stack traces (increases build time)
  //   widenClientFileUpload: true,

  //   // Transpiles SDK to be compatible with IE11 (increases bundle size)
  //   transpileClientSDK: true,

  //   // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
  //   // tunnelRoute: "/monitoring-tunnel",

  //   // Hides source maps from generated client bundles
  //   hideSourceMaps: true,

  //   // Automatically tree-shake Sentry logger statements to reduce bundle size
  //   disableLogger: true,

  //   // Enables automatic instrumentation of Vercel Cron Monitors.
  //   // See the following for more information:
  //   // https://docs.sentry.io/product/crons/
  //   // https://vercel.com/docs/cron-jobs
  //   automaticVercelMonitors: true,
  // },
}
// Injected content via Sentry wizard below

// module.exports = withSentryConfig(nextConfig, {
//   // For all available options, see:
//   // https://github.com/getsentry/sentry-webpack-plugin#options

//   // Suppresses source map uploading logs during build
//   silent: true,
//   url: process.env.SENTRY_URL,
//   org: process.env.SENTRY_ORG,
//   project: process.env.SENTRY_PROJECT,
//   authToken: process.env.SENTRY_AUTH_TOKEN,
// })

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex, rehypeRaw],
  },
})

// Merge MDX config with Next.js config
const configWithMDX = withMDX(nextConfig)

// Add Sentry configuration
export default withSentryConfig(configWithMDX, {
  sentryUrl: process.env.SENTRY_URL,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors
  automaticVercelMonitors: true,

  tunnelRoute: "/monitoring",
})