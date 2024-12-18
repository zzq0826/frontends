import { notFound } from "next/navigation"

import { genMeta } from "@/utils/route"

import Finalists from "./Finalists"
import Header from "./Header"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Scroll Sticker Vote",
  relativeURL: "/sticker-vote",
  description: "Vote for your favourite sticker designs.",
  ogImg: "/og_sticker_vote.png",
  twitterImg: "/twitter_sticker_vote.png",
}))

const StickerContest = () => {
  if (process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT === "Sepolia") {
    notFound()
  }
  return (
    <>
      <Header></Header>
      <Finalists></Finalists>
    </>
  )
}

export default StickerContest
