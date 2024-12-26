import { forwardRef } from "react"

import { Skeleton, Stack } from "@mui/material"

import NumberTypography from "@/components/NumberTypography"

const Statistic = forwardRef<any, any>((props, ref) => {
  const { count, sx, isLoading, ...restProps } = props
  return (
    <Stack
      ref={ref}
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "background.default",
        borderRadius: "0.8rem",
        p: "0.4rem 2.4rem",
        minWidth: "11rem",
        ...sx,
      }}
      {...restProps}
    >
      {isLoading ? (
        <Skeleton sx={{ borderRadius: "1rem", width: "8rem", height: ["2.4rem", "2.8rem", "4rem"], display: "inline-block" }}></Skeleton>
      ) : (
        <NumberTypography
          sx={{
            fontSize: ["1.4rem", "1.6rem"],
            lineHeight: ["2rem", "2.4rem"],
            fontWeight: 600,
            width: "100%",
            textAlign: "center",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            cursor: "inherit",
          }}
        >
          {count}
        </NumberTypography>
      )}
    </Stack>
  )
})

export default Statistic
