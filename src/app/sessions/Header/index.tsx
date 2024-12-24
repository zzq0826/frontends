import { Box, Container, Stack, Typography } from "@mui/material"

import TotalMarks from "../TotalMarks"

const Header = () => {
  return (
    <Box
      sx={[
        {
          position: "relative",
          height: ["calc(100vh - 6.2rem)", "72rem", "auto"],

          background: [
            "url(/imgs/ecosystem/ecosystem-bg-mobile.webp) bottom / contain no-repeat",
            "url(/imgs/ecosystem/ecosystem-bg-mobile.webp) bottom / contain no-repeat",
            "url(/imgs/ecosystem/ecosystem-bg.webp) bottom / cover no-repeat",
          ],
          aspectRatio: ["auto", "auto", "16 / 9"],
          marginTop: [0, 0, "-6.5rem"],
        },
      ]}
    >
      <Container>
        <Stack direction="row" justifyContent="space-between" sx={{ pt: ["", "13rem"], px: ["2rem", "2rem", "6rem"] }}>
          <Typography
            sx={{
              fontSize: ["3rem", "6.4rem"],
              lineHeight: ["4rem", "8.8rem"],
              fontWeight: 600,
            }}
          >
            Scroll Sessions
          </Typography>
          <TotalMarks></TotalMarks>
        </Stack>
      </Container>
    </Box>
  )
}

export default Header
