import { Skeleton, Stack } from "@mui/material"

import NumberTypography from "@/components/NumberTypography"

const Statistic = props => {
  const { count, sx, isLoading } = props
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "background.default",
        borderRadius: "0.8rem",
        p: "0.4rem 2.4rem",
        minWidth: "11rem",
        ...sx,
      }}
    >
      {isLoading ? (
        <Skeleton sx={{ borderRadius: "1rem", width: "8rem", height: ["2.4rem", "2.8rem", "4rem"], display: "inline-block" }}></Skeleton>
      ) : (
        <NumberTypography
          sx={{
            fontSize: "1.6rem",
            lineHeight: "2.4rem",
            fontWeight: 600,
            width: "100%",
            textAlign: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {count}
        </NumberTypography>
      )}
    </Stack>
  )
}

export default Statistic
