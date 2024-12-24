import { Skeleton, Stack, Typography } from "@mui/material"

import NumberTypography from "@/components/NumberTypography"

const Statistic = props => {
  const { label, children, loading } = props

  return (
    <Stack
      direction="column"
      sx={{
        flex: 1,
        width: ["auto", "18rem"],
        borderRadius: ["0.8rem", "1.6rem"],
        p: ["0.8rem 1.2rem", "0.8rem 1.6rem"],
        backgroundColor: "themeBackground.light",
      }}
    >
      <Typography
        sx={{
          fontSize: ["1.4rem", "1.6rem"],
          lineHeight: ["2rem", "2.4rem"],
          fontWeight: 600,
          textAlign: "center",
          whiteSpace: ["pre-wrap", "pre-wrap", "nowrap"],
        }}
      >
        {label}
      </Typography>
      <NumberTypography
        sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: ["3.2rem", "3.2rem"], fontWeight: 600, textAlign: "center", whiteSpace: "nowrap" }}
      >
        {loading ? <Skeleton sx={{ borderRadius: "1rem", width: "50%", display: "inline-block" }}></Skeleton> : <>{children}</>}
      </NumberTypography>
    </Stack>
  )
}

export default Statistic
