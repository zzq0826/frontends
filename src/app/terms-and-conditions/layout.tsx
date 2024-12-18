import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Terms and Conditions",
  relativeURL: "/terms-and-conditions",
}))

export default function Layout({ children }) {
  return <>{children}</>
}
