import { genMeta } from "@/utils/route"

export const generateMetadata = genMeta(({ params }) => {
  const { batchIndex, chunkIndex } = params
  return {
    titleSuffix: "Rollup Explorer: Block Details",
    relativeURL: `/rollupscan/batch/${batchIndex}/chunk/${chunkIndex}/blocks`,
  }
})

export default function Layout({ children }) {
  return <>{children}</>
}
