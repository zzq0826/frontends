import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(({ params }) => ({
  titleSuffix: "Rollup Explorer: Chunk Details",
  relativeURL: `/rollupscan/batch/${params?.batchIndex}/chunk/${params?.chunkIndex}`,
}))

export default function Layout({ children }) {
  return <>{children}</>
}
