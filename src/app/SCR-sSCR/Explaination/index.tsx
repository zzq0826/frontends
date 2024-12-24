"use client"

import Image from "next/image"
import { useRef } from "react"

import { Box, Container, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import ScrollExpandedBg from "@/components/ScrollExpandedBg"
import SectionHeader from "@/components/SectionHeader"

import data from "./data"

const Explaination = () => {
  const wrapperRef = useRef()

  return (
    <ScrollExpandedBg sx={{ pt: "9.6rem", pb: "14rem" }} anchorEl={wrapperRef} fastScrollIn>
      <Box ref={wrapperRef}>
        <Container>
          <SectionHeader
            dark
            sx={{ mb: ["4rem", "12rem"] }}
            title="Why sSCR"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut urna iaculis quam mollis consequat."
            action={
              <Button href="/ecosystem" color="primary">
                Read more details
              </Button>
            }
          ></SectionHeader>
          <Stack direction="row" justifyContent="center" gap={["9.6rem"]}>
            <Image src="/imgs/token/scr.svg" alt="scr" width="491" height="484" className="w-[calc(50% - 9.6rem)]"></Image>
            <Stack sx={{ width: "50%" }} direction="column" spacing="6.4rem">
              {data.map(({ icon: IconSvg, title, description }) => (
                <Stack key={title} direction="column" spacing="1.6rem">
                  <IconSvg></IconSvg>
                  <Typography sx={{ fontSize: "2rem", lineHeight: "3.2rem", fontWeight: 600, color: "primary.contrastText" }}>{title}</Typography>
                  <Typography sx={{ fontSize: "2rem", lineHeight: "3.2rem", color: "primary.contrastText" }}>{description}</Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </ScrollExpandedBg>
  )
}

export default Explaination
