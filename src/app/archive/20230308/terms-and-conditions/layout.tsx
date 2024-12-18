import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Terms and Conditions[Archive]",
  relativeURL: "/archive/20230308/terms-and-conditions",
}))

export default function Layout({ children }) {
  return <>{children}</>
}
