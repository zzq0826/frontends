import fs from "fs"
import fetch from "node-fetch"

const isMainnet = process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT === "Mainnet"

function buildPostURL(hostType) {
  return `https://blog.scroll.cat/api/posts/${isMainnet ? "published" : "preview"}/${hostType}/data.json`
}

async function fetchPosts() {
  await Promise.all([
    fetch(buildPostURL("scroll.io"))
      .then(res => res.json())
      .then(json => fs.writeFileSync("./src/app/blog/[blogId]/data.json", JSON.stringify(json, null, 2))),
    fetch(buildPostURL("research.scroll.io"))
      .then(res => res.json())
      .then(json => fs.writeFileSync("./src/research-blog.data.json", JSON.stringify(json, null, 2))),
  ])
}

fetchPosts()
