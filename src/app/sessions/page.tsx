import { Stack } from "@mui/material"

import EligibleAssets from "./EligibleAssets"
import Guidance from "./Guidance"
import Header from "./Header"
import Protocols from "./Protocols"
import SignatureRequestDialog from "./SignatureRequestDialog"

const Sessions = () => {
  return (
    <>
      <Header></Header>
      <Stack sx={[{ maxWidth: "88.4rem", mx: "auto", mt: "2.4rem", mb: "12rem" }]} spacing="2.4rem">
        <EligibleAssets></EligibleAssets>
        <Protocols></Protocols>
        <Guidance />
        <SignatureRequestDialog />
      </Stack>
    </>
  )
}

export default Sessions
