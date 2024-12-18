import { notFound } from "next/navigation"

import { genMeta } from "@/utils/route"

import Contribute from "./Contribute"
import Header from "./Header"
import Highlights from "./Highlights"
import Protocols from "./Protocols"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Ecosystem",
  relativeURL: "/ecosystem",
}))

const Ecosystem = () => {
  if (process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT === "Sepolia") {
    notFound()
  }
  return (
    <>
      <Header></Header>
      <Highlights />
      <Protocols></Protocols>
      <Contribute></Contribute>
    </>
  )
}

export default Ecosystem
