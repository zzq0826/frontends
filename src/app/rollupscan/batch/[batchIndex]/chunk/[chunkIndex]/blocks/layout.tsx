import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(({ params }) => ({
  titleSuffix: "Rollup Explorer: Block Details",
  relativeURL: `/rollupscan/batch/${params?.batchIndex}/chunk/${params?.chunkIndex}/blocks`,
}))

export default function Layout({ children }) {
  return <>{children}</>
}
