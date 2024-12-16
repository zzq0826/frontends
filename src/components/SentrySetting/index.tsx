"use client"

import * as Sentry from "@sentry/nextjs"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

const SentrySetting = () => {
  const pathname = usePathname()
  useEffect(() => {
    Sentry.getCurrentScope().setTag("page", pathname)

    return () => {
      // Clear the tag when the component is unmounted
      Sentry.getCurrentScope().setTag("page", "")
    }
  }, [pathname])
  return null
}

export default SentrySetting
