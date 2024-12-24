import { isNumber } from "lodash"
import Image from "next/image"
import Link from "next/link"

import { Stack, Typography } from "@mui/material"

import { commafy, formatLargeNumber } from "@/utils"

import MarksTooltip from "../MarksTooltip"
import Statistic from "../Statistic"

const ProtocolCard = props => {
  const { name, logoURL, href, marks = 234.123, loading } = props
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Stack
        direction="column"
        alignItems="center"
        spacing="0.8rem"
        sx={{
          cursor: "pointer",
          p: "1.6rem",
          borderRadius: "1.6rem",
          backgroundColor: "themeBackground.light",
          "&:hover": {
            backgroundColor: "themeBackground.normal",
          },
        }}
      >
        <Image src={logoURL} width={40} height={40} alt={name} className="rounded-[7px] bg-white aspect-square"></Image>
        <Typography sx={{ fontSize: "1.6rem", lineHeight: "2.4rem", fontWeight: 600, cursor: "inherit" }}>{name}</Typography>
        <MarksTooltip key={marks} disabled={!marks} title={marks ? commafy(marks) : "--"}>
          <Statistic count={isNumber(marks) ? formatLargeNumber(marks, 2) : "--"} isLoading={loading} sx={{ width: "min-content" }}></Statistic>
        </MarksTooltip>
      </Stack>
    </Link>
  )
}

export default ProtocolCard
