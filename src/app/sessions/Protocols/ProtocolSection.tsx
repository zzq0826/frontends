import { Box, BoxProps, Chip, Stack, Typography } from "@mui/material"

import QaSvg from "@/assets/svgs/sessions/qa.svg"

import MarksTooltip from "../components/MarksTooltip"
import ProtocolCard from "./ProtocolCard"
import { type Protocol, type ProtocolData } from "./protocolList"

const ProtocolSection = (props: ProtocolData & BoxProps) => {
  const { title, description, tag, tagTooltip, data, sx } = props
  return (
    <Box
      sx={{
        py: ["1.6rem", "3.2rem"],
        "&:nth-of-type(n + 2)": {
          borderTop: "1px solid #E9E9E9",
        },
        "&:nth-last-of-type(1)": {
          pb: 0,
        },
        ...sx,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], fontWeight: 600 }}>{title}</Typography>
        <MarksTooltip disabled={!tagTooltip} title={tagTooltip}>
          <Chip
            label={
              <Stack direction="row" spacing="0.8rem" alignItems="center">
                <span>{tag}</span>
                {!!tagTooltip && <QaSvg className="w-[1.6rem]"></QaSvg>}
              </Stack>
            }
            sx={{
              p: "0.4rem 1.6rem",
              height: "auto",
              borderRadius: "0.8rem",
              backgroundColor: "themeBackground.light",
              "& .MuiChip-label": {
                fontSize: ["1.6rem", "1.8rem"],
                lineHeight: ["2.4rem", "2.8rem"],
                fontWeight: 500,
                p: 0,
              },
            }}
          ></Chip>
        </MarksTooltip>
      </Stack>
      <Typography sx={{ fontSize: ["1.4rem", "1.6rem"], lineHeight: "2.4rem", mt: ["1.6rem", "0.8rem"] }}>{description}</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: ["repeat(auto-fill, minmax(14rem, 1fr))", "repeat(auto-fill, minmax(19rem, 1fr))"],
          gap: "1.6rem",
          mt: ["1.6rem", "3.2rem"],
        }}
      >
        {data.map((item: Protocol) => (
          <ProtocolCard key={item.project} {...item}></ProtocolCard>
        ))}
      </Box>
    </Box>
  )
}

export default ProtocolSection
