"use client"

import { usePathname } from "next/navigation"
import type { FC } from "react"
import { useEffect, useRef, useState } from "react"

export interface Heading {
  depth: string
  text: string
  slug: string
}

const TableOfContents: FC = () => {
  const pathname = usePathname()

  const [headings, setHeadings] = useState<Heading[]>([])
  const tableOfContents = useRef<HTMLUListElement>(null)
  const [currentID, setCurrentID] = useState("")
  const scrolledRef = useRef(false)

  const hash = pathname!.split("#")[1]
  const hashRef = useRef(hash)

  useEffect(() => {
    if (hash) {
      // We want to reset if the hash has changed
      if (hashRef.current !== hash) {
        hashRef.current = hash
        scrolledRef.current = false
      }

      // only attempt to scroll if we haven't yet (this could have just reset above if hash changed)
      if (!scrolledRef.current) {
        const id = hash.replace("#", "")
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView()
          scrolledRef.current = true
        }
      }
    }
  }, [tableOfContents.current])

  useEffect(() => {
    if (!tableOfContents.current) return
    const setCurrent: IntersectionObserverCallback = entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setCurrentID(entry.target.id)
          break
        }
      }
    }

    const observerOptions: IntersectionObserverInit = {
      // Negative top margin accounts for `scroll-margin`.
      // Negative bottom margin means heading needs to be towards top of viewport to trigger intersection.
      rootMargin: "0px 0% -66%",
    }

    const headingsObserver = new IntersectionObserver(setCurrent, observerOptions)
    // Observe all the h2 in the main page content.
    document.querySelectorAll("h2").forEach((heading: HTMLHeadElement) => {
      const id = (heading.textContent as string)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/[^a-z0-9]+/g, "-")
      heading.id = id
      headingsObserver.observe(heading)
    })
    // Stop observing when the component is unmounted.
    return () => headingsObserver.disconnect()
  }, [tableOfContents.current])

  useEffect(() => {
    if (!tableOfContents.current) return
    refreshHeadings()
  }, [tableOfContents.current])

  const refreshHeadings = () => {
    const headingList: Heading[] = []
    document.querySelectorAll("h2").forEach((heading: HTMLHeadElement) => {
      if (heading.className) return
      headingList.push({
        depth: heading.nodeName.charAt(1),
        text: heading.textContent as string,
        slug: heading.id,
      })
    })
    setHeadings(headingList)
  }

  return (
    <>
      <ul ref={tableOfContents}>
        {headings.map(header => (
          <li key={header.slug} className={`header-link depth-${header.depth} ${currentID === header.slug ? "active" : ""}`.trim()}>
            <a href={`#${header.slug}`}>{header.text}</a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TableOfContents
