"use client"

import dayjs from "dayjs"
import { default as RouterLink } from "next/link"
import { use, useMemo } from "react"

import { InfoOutlined, NavigateNext } from "@mui/icons-material"
import { Box, Breadcrumbs, Divider, Tooltip, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import Header from "@/app/rollupscan/components/Header"
import Spinning from "@/app/rollupscan/components/Spinning"
import Link from "@/components/Link"
import useCheckViewport from "@/hooks/useCheckViewport"
import { useChunkList } from "@/hooks/useRollupInfo"

const relativeTime = require("dayjs/plugin/relativeTime")
const utc = require("dayjs/plugin/utc")

dayjs.extend(relativeTime)
dayjs.extend(utc)

const LabelTypography = styled(Typography)(({ theme }) => ({
  paddingLeft: "5rem",
  width: "30rem",
  [theme.breakpoints.down("md")]: {
    paddingLeft: "1.6rem",
    width: "25rem",
  },
}))

const BoxItem = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "10rem",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    height: "7.4rem",
    justifyContent: "space-between",
    "& > *:nth-last-of-type(1)": {
      textAlign: "right",
      marginLeft: "0.4rem",
      marginRight: "1.6rem",
    },
  },
})) as typeof Box

const Chunk = props => {
  const params: any = use(props.params)
  const { chunks = [], isLoading } = useChunkList(params.batchIndex)

  const { isLandscape } = useCheckViewport()

  const chunk = useMemo(() => chunks.find(item => item.index === +params.chunkIndex), [chunks])

  const renderTimestamp = timestamp => {
    if (!timestamp) return "-"
    const date = new Date(timestamp * 1000)
    return `${(dayjs(date) as any).fromNow().toString()} (${dayjs(date).utc().local().format("MMM-DD-YYYY hh:mm:ss A Z UTC")})`
  }

  const truncatedHash = (hash: string) => {
    if (isLandscape) {
      return hash
    } else {
      return `${hash.substring(0, 6)}…${hash.substring(62, 66)}`
    }
  }

  return (
    <Box>
      <Header />
      <Box
        className="wrapper mx-auto"
        sx={{
          maxWidth: "130rem",
          marginBottom: "16rem",
          "& *": {
            fontFamily: "var(--developer-page-font-family) !important",
          },
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontWeight: 600 }} separator={<NavigateNext fontSize="large" />}>
          <RouterLink href="/rollupscan?page=1&per_page=10">Batches</RouterLink>
          <RouterLink href={`/rollupscan/batch/${params.batchIndex}`}> Batch {params.batchIndex}</RouterLink>
          <RouterLink href={`/rollupscan/batch/${params.batchIndex}/chunks`}>Chunks</RouterLink>
          <Typography color="text.primary" sx={{ fontWeight: 600 }}>
            Chunk {params.chunkIndex}
          </Typography>
        </Breadcrumbs>
        {isLoading ? (
          <Spinning></Spinning>
        ) : (
          <>
            {chunk && (
              <Box
                sx={{
                  width: "100%",
                  border: theme => `1px solid ${theme.vars.palette.border.main}`,
                  borderRadius: "10px",
                  marginTop: "2.2rem",
                }}
                aria-label="batch"
              >
                <BoxItem>
                  <LabelTypography>Chunk Index</LabelTypography>
                  <Typography>{chunk.index}</Typography>
                </BoxItem>
                <Divider />
                <BoxItem>
                  <LabelTypography>Transactions</LabelTypography>
                  <Typography>{chunk.total_tx_num}</Typography>
                </BoxItem>
                <Divider />
                <BoxItem>
                  <LabelTypography>Blocks</LabelTypography>
                  {/* TODO: Make link dynamic, probably by using a variable for the rollupscan root */}
                  <Link component={RouterLink} href={`/rollupscan/batch/${params.batchIndex}/chunk/${chunk.index}/blocks`}>
                    {chunk.end_block_number - chunk.start_block_number + 1}
                  </Link>
                </BoxItem>
                <Divider />

                <BoxItem>
                  <LabelTypography>
                    Chunk Created Timestamp{" "}
                    <Tooltip title="Timestamp when the chunk was created">
                      <InfoOutlined sx={{ fontSize: "2rem", verticalAlign: "text-bottom" }} />
                    </Tooltip>
                  </LabelTypography>
                  <Typography>{renderTimestamp(chunk.created_at)}</Typography>
                </BoxItem>
                <Divider />

                <BoxItem>
                  <LabelTypography>Tx Hash</LabelTypography>
                  <Typography>{truncatedHash(chunk.hash)}</Typography>
                </BoxItem>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  )
}

export default Chunk
