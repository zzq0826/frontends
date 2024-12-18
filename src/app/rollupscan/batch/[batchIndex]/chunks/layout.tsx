import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(({ params }) => ({
  titleSuffix: "Rollup Explorer: Chunk List",
  relativeURL: `/rollupscan/batch/${params.batchIndex}/chunks`,
}))

export default function Layout({ children }) {
  return <>{children}</>
}
