import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(({ params }) => ({
  titleSuffix: "Rollup Explorer: Batch Details",
  relativeURL: `/rollupscan/batch/${params.batchIndex}`,
}))

export default function Layout({ children }) {
  return <>{children}</>
}
