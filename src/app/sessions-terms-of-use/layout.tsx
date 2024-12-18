import { notFound } from "next/navigation"

import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Scroll Sessions Terms of Use",
  relativeURL: "/sessions-terms-of-use",
}))

export default function Layout({ children }) {
  if (process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT === "Sepolia") {
    notFound()
  }
  return <>{children}</>
}
