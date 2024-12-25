"use client"

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { makeStyles } from "tss-react/mui"

import { Box, Divider, Skeleton, Stack, Tooltip, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { fetchSession2TotalMarksURL } from "@/apis/sessions"
import QaSvg from "@/assets/svgs/sessions/qa.svg"
import Button from "@/components/Button"
import Link from "@/components/Link"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useSessionsStore from "@/stores/sessionsStore"
import { commafy, formatLargeNumber } from "@/utils"

const SESSION_AIRDROP_LINK = "/blog/introducing-scrolls-first-airdrop-a-celebration-of-the-global-community"

const useStyles = makeStyles()(theme => ({
  tooltip: {
    background: "linear-gradient(180deg, #262626 0%, #111 100%)",
    padding: "1.2rem 1.4rem",
    fontSize: "1.8rem",
    lineHeight: "2.4rem",
    fontFamily: "var(--developer-page-font-family)",
  },
  notEnoughTooltip: {
    backgroundColor: "#111",
    padding: "1.6rem",
    maxWidth: "35rem",
    fontSize: "1.8rem",
    lineHeight: "2.8rem",
    borderRadius: "2rem",
    fontWeight: 400,
  },
  notEnoughArrow: {
    color: "#111",
  },
}))
const StatisticSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: "1rem",
  width: "12rem",
  height: "8rem",
  display: "inline-block",
}))

const MotionBox = motion(Box)

const TotalPoints = () => {
  const { classes } = useStyles()

  const { walletCurrentAddress, connect } = useRainbowContext()
  const { isMobile, isPortrait } = useCheckViewport()

  const { hasSignedTerms, changeSignatureRequestVisible } = useSessionsStore()

  const { data, isLoading } = useQuery({
    queryKey: ["totalMarks", walletCurrentAddress],
    queryFn: async () => {
      const data = await scrollRequest(fetchSession2TotalMarksURL(walletCurrentAddress))
      if (data.status !== "1") {
        return Promise.reject(new Error("Something went wrong, please try again later."))
      }
      return data.result
    },
    initialData: {},
  })

  return (
    <MotionBox
      sx={[
        {
          width: ["100%", "100%", "56.4rem"],
          height: ["auto", "auto", "19rem"],
          backgroundColor: "background.default",
          borderRadius: "1.6rem",
          p: "2.4rem",
          display: "flex",
          justifyContent: "center",
        },
      ]}
      initial={isPortrait ? {} : { opacity: 1, y: 30, scale: 0.9 }}
      animate={isPortrait ? {} : { opacity: 1, y: 0, scale: 1 }}
      transition={isPortrait ? {} : { duration: 0.5 }}
    >
      {walletCurrentAddress && hasSignedTerms && (
        <Stack direction={["column", "row"]} sx={{ gap: "2.4rem", textAlign: "center", width: "100%", justifyContent: "space-evenly" }}>
          <Stack direction="column" alignItems="center" sx={{ gap: ["0.8rem", 0] }}>
            <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", fontWeight: 600 }}>Session 2 Marks</Typography>
            <Tooltip
              disableHoverListener={!data.marks}
              title={data.marks ? commafy(data.marks) : "--"}
              followCursor
              classes={{ tooltip: classes.tooltip }}
            >
              <Typography
                sx={{
                  fontSize: ["4rem", "5.6rem"],
                  lineHeight: ["4.8rem", "8rem"],
                  fontWeight: 600,
                  fontFamily: "var(--developer-page-font-family)",
                }}
              >
                {isLoading ? <StatisticSkeleton></StatisticSkeleton> : <>{data.marks ? formatLargeNumber(data.marks, 2) : "--"}</>}
              </Typography>
            </Tooltip>
            <Typography sx={{ fontSize: "1.4rem", lineHeight: ["2rem", "2.4rem"], fontFamily: "var(--developer-page-font-family)" }}>
              Marks are updated every 5 mins
            </Typography>
            <Link underline="always" href={SESSION_AIRDROP_LINK} className="font-developer !text-inherit !text-[1.4rem] !font-normal">
              Learn more
            </Link>
          </Stack>
          <Divider sx={{ borderColor: "#E9E9E9", borderLeftWidth: [0, "1px"] }} flexItem></Divider>
          <Stack direction="column" alignItems="center">
            <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", fontWeight: 600 }}>Total boost</Typography>
            <Typography
              sx={{
                fontSize: ["4rem", "5.6rem"],
                lineHeight: ["4.8rem", "8rem"],
                fontWeight: 600,
                fontFamily: "var(--developer-page-font-family)",
              }}
            >
              {isLoading ? <StatisticSkeleton></StatisticSkeleton> : <>{data.boost ? formatLargeNumber(data.boost, 2) + "x" : "--"}</>}
            </Typography>
            <Stack direction="row" alignItems="center" spacing="4px">
              <Typography sx={{ fontSize: "1.4rem", lineHeight: "2.4rem", fontFamily: "var(--developer-page-font-family)" }}>
                How does this work
              </Typography>
              <Tooltip title="lorem ipsm...." classes={{ tooltip: classes.tooltip }}>
                <span>
                  <QaSvg></QaSvg>
                </span>
              </Tooltip>
            </Stack>
            <Typography></Typography>
          </Stack>
        </Stack>
      )}

      {!walletCurrentAddress && (
        <Stack direction="column" sx={{ gap: "1.6rem" }} justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", fontWeight: 600 }}>Your Marks</Typography>
          <Typography
            sx={{ fontSize: ["4rem", "5.6rem"], lineHeight: ["2rem", "2.8rem"], fontWeight: 600, fontFamily: "var(--developer-page-font-family)" }}
          >
            --
          </Typography>
          <Button color="primary" whiteButton onClick={connect}>
            Connect Wallet
          </Button>
        </Stack>
      )}

      {walletCurrentAddress && !hasSignedTerms && (
        <Stack direction="column" sx={{ gap: "1.6rem" }} justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", fontWeight: 600 }}>Your Marks</Typography>
          <Typography sx={{ fontSize: "1.4rem", lineHeight: "2.4rem", textAlign: "center" }}>
            You need to agree to Scroll Sessions Terms of Use to see your Marks and details
          </Typography>
          <Button color="primary" whiteButton onClick={() => changeSignatureRequestVisible(true)} width={isMobile ? "100%" : "32.2rem"}>
            View terms of use
          </Button>
        </Stack>
      )}
    </MotionBox>
  )
}

export default TotalPoints
