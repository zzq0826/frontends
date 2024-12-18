import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Blog",
  relativeURL: "/blog",
}))

export default function Layout({ children }) {
  return <>{children}</>
}
