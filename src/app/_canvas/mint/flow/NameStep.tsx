import { useMemo, useState } from "react"
import { useSwiper } from "swiper/react"

import { Box, InputBase, Stack } from "@mui/material"
import { styled } from "@mui/system"

import Button from "@/components/Button"
import { CHAIN_ID, L2_NAME } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useValidateCanvasName from "@/hooks/useValidateCanvasName"
import useCanvasStore from "@/stores/canvasStore"
import { switchNetwork } from "@/utils"

import StepWrapper from "./StepWrapper"

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  maxWidth: "51rem",
  width: "100%",
  ".MuiInputBase-input": {
    textAlign: "center",
    height: "8.8rem",
    lineHeight: "8.8rem",
    fontSize: "7.2rem",
    fontWeight: 600,
    padding: 0,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down("sm")]: {
      height: "4.8rem",
      fontSize: "3.2rem",
      lineHeight: "4.8rem",
    },
  },
}))

const NameStep = props => {
  const { scrollTarget } = props
  const { isMobile } = useCheckViewport()
  const swiper = useSwiper()

  const { chainId, connect } = useRainbowContext()

  const { profileName: name, changeProfileName: setName } = useCanvasStore()

  const [placeholder, setPlaceholder] = useState("name")

  const { helpText, validating, renderValidation } = useValidateCanvasName(name)

  // alert only when user is printing letter
  const isAllowedNext = useMemo(() => name && !helpText && !validating, [name, helpText, validating])

  const handleNext = () => {
    swiper.slideNext()
    scrollTarget?.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim())
  }

  const handleKeydown = async e => {
    if (e.keyCode === 13 && isAllowedNext) {
      handleNext()
    }
  }

  const renderAction = () => {
    if (chainId === CHAIN_ID.L2) {
      return (
        <Button color="primary" width={isMobile ? "23rem" : "28.2rem"} gloomy={!isAllowedNext} onClick={handleNext}>
          Next
        </Button>
      )
    } else if (chainId) {
      return (
        <Button color="primary" width={isMobile ? "23rem" : "28.2rem"} onClick={() => switchNetwork(CHAIN_ID.L2)}>
          Switch to {L2_NAME}
        </Button>
      )
    }
    return (
      <Button color="primary" width={isMobile ? "23rem" : "28.2rem"} onClick={connect}>
        Connect wallet to mint
      </Button>
    )
  }

  return (
    <StepWrapper
      title="What’s your username?"
      description="Your name is stored onchain. You can always change it later."
      sx={{ mt: ["10rem", "13rem"], mb: ["4.4rem", "22rem"] }}
      action={renderAction()}
    >
      <Box sx={{ position: "relative" }}>
        <StyledInputBase
          inputProps={{
            maxLength: 15,
            minLength: 4,
          }}
          value={name}
          onChange={handleChangeName}
          autoFocus
          onKeyDown={handleKeydown}
          placeholder={placeholder}
          onFocus={() => setPlaceholder("")}
          onBlur={() => setPlaceholder("name")}
        />
        <Stack
          direction="row"
          gap="0.5rem"
          alignItems="center"
          sx={{
            position: "absolute",
            top: ["6.4rem", "11.2rem"],
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {renderValidation()}
        </Stack>
      </Box>
    </StepWrapper>
  )
}

export default NameStep
