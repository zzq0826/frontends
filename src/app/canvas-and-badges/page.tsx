"use client"

import dynamic from "next/dynamic"

import Badges from "./Badges"
import Introduction from "./Introduction"

const Header = dynamic(() => import("./Header"), { ssr: false })

const CanvasBadge = () => {
  return (
    <>
      <Header></Header>
      <Introduction></Introduction>
      <Badges></Badges>
    </>
  )
}

export default CanvasBadge
