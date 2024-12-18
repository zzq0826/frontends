import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Privacy Policy",
  relativeURL: "/privacy-policy",
}))

export default function Layout({ children }) {
  return <>{children}</>
}
