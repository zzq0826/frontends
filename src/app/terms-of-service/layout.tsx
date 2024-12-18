import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Terms of Service",
  relativeURL: "/terms-of-service",
}))

export default function Layout({ children }) {
  return <>{children}</>
}
