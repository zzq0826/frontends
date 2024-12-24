import Image from "next/image"

import { Container, Stack, Typography } from "@mui/material"

import SCRETHHero from "@/assets/svgs/defi/scr-eth-hero.png"
import Button from "@/components/Button"

const Header = () => {
  return (
    <Container sx={{ pt: "6.8rem", pb: "8rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Image src={SCRETHHero} alt="scr-eth" width="690" height="350"></Image>
      <Stack direction="row" justifyContent="center" sx={{ mt: "4.2rem" }}>
        <Image src="/imgs/token/scrETH.svg" alt="scr" width="64" height="64"></Image>
        <Typography sx={{ fontSize: "6.4rem", lineHeight: "8.8rem", fontWeight: 600, ml: "2rem" }}>scrETH</Typography>
      </Stack>
      <Typography sx={{ fontSize: "2.4rem", lineHeight: "4rem", maxWidth: "68rem", textAlign: "center", mb: "6.2rem", mt: "3rem" }}>
        scrETH is Scroll’s native ETH underlying Liquid Retaking Token. Stake ETH/WETH/WSTETH to obtain.
      </Typography>
      <Button width="20.8rem" color="default" gloomy>
        Coming soon
      </Button>
    </Container>
  )
}

export default Header
