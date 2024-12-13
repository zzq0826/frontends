import { Link as MuiLink } from "@mui/material"

import Link from "@/components/Link"

const TextButton = props => {
  const { sx, underline = "hover", className, children, href, ...restProps } = props
  if (href) {
    return (
      <Link component="button" className={className} underline={underline} href={href} {...restProps}>
        {children}
      </Link>
    )
  }
  return (
    <MuiLink
      component="button"
      sx={{
        color: "primary.main",
        verticalAlign: "baseline",
        textDecorationColor: "inherit",
        ...sx,
      }}
      className={className}
      underline={underline}
      {...restProps}
    >
      {children}
    </MuiLink>
  )
}

export default TextButton
