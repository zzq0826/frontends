import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(({ params }) => {
  const { batchIndex, chunkIndex } = params
  return {
    titleSuffix: "Rollup Explorer: Chunk Details",
    relativeURL: `/rollupscan/batch/${batchIndex}/chunk/${chunkIndex}`,
  }
})

export default function Layout({ children }) {
  return <>{children}</>
}
