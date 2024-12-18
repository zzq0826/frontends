import { notFound } from "next/navigation"

import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Community",
  relativeURL: "/community",
  ogImg: "/og_community.png",
  twitterImg: "/twitter_community.png",
}))

export default function Layout({ children }) {
  if (process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT === "Sepolia") {
    notFound()
  }
  return <>{children}</>
}
