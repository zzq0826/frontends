import { genMeta } from "@/utils"

import Blog from "./_components/Blog"
import BuildWithScroll from "./_components/BuildWithScroll"
import ExploreEcosystem from "./_components/ExploreEcosystem"
import Header from "./_components/Header"
import StartBuilding from "./_components/StartBuilding"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Native zkEVM Layer 2 for Ethereum",
}))

const LandingPage = () => {
  return (
    <>
      <Header />
      <BuildWithScroll />
      <ExploreEcosystem />
      <Blog />
      <StartBuilding />
    </>
  )
}

export default LandingPage
