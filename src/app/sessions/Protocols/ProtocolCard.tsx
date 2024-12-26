"use client"

import { useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"

import { Stack, Typography } from "@mui/material"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import { commafy, formatLargeNumber } from "@/utils"

import MarksTooltip from "../components/MarksTooltip"
import Statistic from "./Statistic"

const ProtocolCard = props => {
  const { name, logoURL, href, project, loading } = props

  const { walletCurrentAddress } = useRainbowContext()
  const queryClient = useQueryClient()
  const protocolMarksMap = queryClient.getQueryData(["perProtocolMarks", walletCurrentAddress])

  const marks = protocolMarksMap?.[project] ?? "0"

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
        <Typography sx={{ fontSize: ["1.4rem", "1.6rem"], lineHeight: ["2rem", "2.4rem"], fontWeight: 600, cursor: "inherit" }}>{name}</Typography>
        <MarksTooltip key={project} disabled={!+marks} title={marks ? commafy(marks) : "--"}>
          <Statistic count={marks ? formatLargeNumber(marks, 2) : "--"} isLoading={loading} sx={{ width: "min-content" }}></Statistic>
        </MarksTooltip>
      </Stack>
    </Link>
  )
}

export default ProtocolCard
