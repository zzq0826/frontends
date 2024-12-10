"use client"

import Link from "next/link"
import { useStyles } from "tss-react/mui"

const ScrollLink = props => {
  const { external, underline = "none", className, reloadDocument, children, href, ...restProps } = props
  const { cx } = useStyles()

  if (reloadDocument) {
    return (
      <Link href={href} target={external ? "_blank" : ""} {...restProps} passHref legacyBehavior>
        <a className={cx(underline === "always" && "underline", className)} rel="noopener noreferrer">
          {children}
        </a>
      </Link>
    )
  }
  return (
    <Link
      className={cx(
        "font-semibold text-[var(--mui-palette-link-main)] decoration-inherit",
        underline === "always" && "underline",
        underline === "hover" && "hover:underline",
        className,
      )}
      href={href}
      rel="noopener noreferrer"
      target={external ? "_blank" : ""}
      {...restProps}
    >
      {children}
    </Link>
  )
}
export default ScrollLink
