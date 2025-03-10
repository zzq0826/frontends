import { useRef } from "react"
import Img from "react-cool-img"

import { Box, Stack, Typography } from "@mui/material"

import { EthereumYearBadgeURL, checkBadgeEligibilityURL } from "@/apis/canvas"
import Button from "@/components/Button"
import TextButton from "@/components/TextButton"
import { ETHEREUM_YEAR_BADGE } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useAsyncMemo } from "@/hooks"
import useSnackbar from "@/hooks/useSnackbar"
import { mintBadge } from "@/services/canvasService"
import useCanvasStore from "@/stores/canvasStore"
import { truncateAddress } from "@/utils"
import { scrollRequest } from "@/utils/request"

import StepWrapper from "./StepWrapper"

const FirstBadgeStep = () => {
  const { provider, walletCurrentAddress } = useRainbowContext()

  const {
    isFirstBadgeMinting,
    changeIsFirstBadgeMinting,
    changeMintFlowVisible,
    recordFirstBadgePosition,
    changeBadgeAnimationVisible,
    queryFirstMintUsername,
  } = useCanvasStore()
  const alertWarning = useSnackbar()

  const badgeChecked = useAsyncMemo(async () => {
    const data = await scrollRequest(checkBadgeEligibilityURL(ETHEREUM_YEAR_BADGE.baseURL, walletCurrentAddress, ETHEREUM_YEAR_BADGE.badgeContract))
    await fetch(EthereumYearBadgeURL(data.year))
    return data
  }, [provider, walletCurrentAddress])
  const firstBadgeRef = useRef<HTMLElement>(null)

  const renderTip = () => {
    if (!badgeChecked) {
      return "Checking"
    } else if (badgeChecked.eligibility) {
      return `Your wallet (${truncateAddress(walletCurrentAddress as string)})’s first transaction on Ethereum was during the year ${
        badgeChecked.year
      }. You are eligible
      to mint a “Badge” to attest your past achievement on Scroll Canvas`
    }
    return `Your wallet (${truncateAddress(walletCurrentAddress as string)}) has no transaction on Ethereum`
  }

  const handleMintBadge = async () => {
    changeIsFirstBadgeMinting(true)

    try {
      const result = await mintBadge(provider, walletCurrentAddress, ETHEREUM_YEAR_BADGE)

      if (result) {
        const { left, top } = firstBadgeRef.current!.getBoundingClientRect()
        recordFirstBadgePosition({
          left,
          top,
          id: result,
          image: EthereumYearBadgeURL(badgeChecked.year),
          badgeContract: ETHEREUM_YEAR_BADGE.badgeContract,
        })
        changeBadgeAnimationVisible(true)
        changeMintFlowVisible(false)
      }
    } catch (error) {
      alertWarning(error.message)
    } finally {
      changeIsFirstBadgeMinting(false)
    }
  }

  const handleViewMyCanvas = async () => {
    const signer = await provider?.getSigner(0)
    queryFirstMintUsername(signer)
    changeMintFlowVisible(false)
  }

  return (
    <StepWrapper
      title="Mint your first badge"
      description={<>A badge is an attestation of status or achievement, permanently recorded on your Canvas.</>}
      action={
        <Stack
          direction="column"
          sx={[
            { gap: ["1rem", "2.4rem"] },
            theme => ({
              [theme.breakpoints.down("sm")]: {
                "& > div": {
                  width: "100%",
                },
              },
            }),
          ]}
          alignItems="center"
        >
          <Button color="primary" width="28.2rem" gloomy={!badgeChecked?.eligibility} loading={isFirstBadgeMinting} onClick={handleMintBadge}>
            {isFirstBadgeMinting ? "Minting badge" : "Mint badge"}
          </Button>
          <TextButton
            underline="always"
            sx={{ color: "#A0A0A0 !important", fontSize: ["1.8rem", "2rem"], lineHeight: ["2.8rem", "3.5rem"] }}
            onClick={handleViewMyCanvas}
          >
            Skip and go to my Canvas
          </TextButton>
        </Stack>
      }
      sx={{ mt: ["2.4rem", "4.6rem"], mb: ["2rem", "8.8rem"], textAlign: "center" }}
    >
      <Box sx={{ width: ["12rem", "20rem"], mb: "1.6rem", display: "inline-block" }}>
        {badgeChecked?.code === 1 ? (
          <Img
            width="100%"
            style={{ borderRadius: "50%" }}
            ref={firstBadgeRef}
            src={EthereumYearBadgeURL(badgeChecked.year)}
            placeholder="/imgs/canvas/badgePlaceholder.svg"
            alt={ETHEREUM_YEAR_BADGE.name}
          ></Img>
        ) : (
          <Img width="100%" style={{ borderRadius: "50%" }} src="/imgs/canvas/badgePlaceholder.svg" alt="Ethereum Year Badge"></Img>
        )}
      </Box>
      <Typography sx={{ fontSize: ["1.8rem", "2rem"], lineHeight: ["2.8rem", "3rem"], fontWeight: 600 }}>{ETHEREUM_YEAR_BADGE.name}</Typography>
      <Typography sx={{ fontSize: "1.6rem", lineHeight: "2.4rem", maxWidth: "60rem" }}>{renderTip()}</Typography>
    </StepWrapper>
  )
}

export default FirstBadgeStep
