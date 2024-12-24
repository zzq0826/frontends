"use client"

import Image from "next/image"
import { useState } from "react"

import { Container, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import { formatLargeNumber } from "@/utils"

import GetSCRDialog from "./GetSCRDialog"
import Statistic from "./Statistic"
import DATA from "./data"

const Header = () => {
  const [getSCROpen, setGetSCROpen] = useState(false)
  const actionList = [
    {
      id: "get-scr",
      action: () => {
        setGetSCROpen(true)
      },
    },
    {
      id: "stake-scr",
      action: () => {
        // TODO: coming soon
      },
    },
  ]

  const handleCloseDialog = () => {
    setGetSCROpen(false)
  }

  return (
    <Container sx={{ pt: "6.8rem", pb: "8rem" }}>
      <Stack direction="row" justifyContent="center">
        <Image src="/imgs/token/scr.svg" alt="scr" width="64" height="64"></Image>
        <Image src="/imgs/token/sSCR.svg" alt="scr" width="64" height="64" className="ml-[-1rem]"></Image>
        <Typography sx={{ fontSize: "6.4rem", lineHeight: "8.8rem", fontWeight: 600, ml: "2rem" }}>SCR & sSCR</Typography>
      </Stack>
      <Stack direction="row" spacing="3.2rem" sx={{ mt: "5rem" }}>
        {DATA.map(item => (
          <Stack
            key={item.id}
            direction="column"
            alignItems="center"
            sx={{
              p: "4rem 2.4rem",
              backgroundColor: "background.default",
              borderRadius: "2rem",
              gap: ["1.6rem"],
            }}
          >
            <Image src={item.imageURL} alt={item.title} width={516} height={408} className="w-auto h-[18rem]"></Image>
            <Typography sx={{ fontSize: "3.2rem", lineHeight: "4.8rem", fontWeight: 600 }}>{item.title}</Typography>
            <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", textAlign: "center" }}>{item.description}</Typography>
            <Stack direction="row" justifyContent="center" spacing="2.4rem" sx={{ mb: "2.4rem" }}>
              {item.values.map(({ label, value }) => (
                <Statistic key={label} label={label}>
                  {formatLargeNumber(value)}
                </Statistic>
              ))}
            </Stack>
            <Button
              color={item.upcoming ? "default" : "primary"}
              width="20.8rem"
              gloomy={!!item.upcoming}
              onClick={actionList.find(action => action.id === item.id)!.action}
            >
              {item.actionLabel}
            </Button>
          </Stack>
        ))}
      </Stack>
      <GetSCRDialog open={getSCROpen} onClose={handleCloseDialog}></GetSCRDialog>
    </Container>
  )
}

export default Header
