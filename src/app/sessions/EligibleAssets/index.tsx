import { Box, Stack, Typography } from "@mui/material"

import { SCROLL_NATIVE_ASSET_LIST } from "@/constants"

import Card from "../components/Card"
import TokenCard from "../components/TokenCard"
import NativeAssetCard from "./NativeAssetCard"
import TOKEN_LIST from "./tokenList"

const EligibleAssets = () => {
  return (
    <Card title="Step 1: Get eligible assets">
      <Typography sx={{ fontSize: ["", "1.6rem"], lineHeight: ["2.4rem"] }}>
        Marks are given to all eligible assets used in the protocols in our ecosystem. Marks can <strong className="text-primary">no longer</strong>{" "}
        be earned if you are only holding these assets.
      </Typography>
      <Stack
        direction={["column", "row"]}
        justifyContent={["space-between"]}
        sx={{
          gap: ["1.6rem"],
          mt: "3.2rem",
        }}
      >
        {SCROLL_NATIVE_ASSET_LIST.map(item => (
          <NativeAssetCard key={item.name} {...item}></NativeAssetCard>
        ))}
      </Stack>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(12rem, 1fr))",
          gap: "1.6rem",
          mt: "1.6rem",
        }}
      >
        {TOKEN_LIST.map(item => (
          <TokenCard key={item.name} {...item}></TokenCard>
        ))}
      </Box>
    </Card>
  )
}

export default EligibleAssets
