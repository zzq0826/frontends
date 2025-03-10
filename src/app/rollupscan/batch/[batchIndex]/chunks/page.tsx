"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { Box, Breadcrumbs, Typography } from "@mui/material"

import Header from "@/app/rollupscan/components/Header"
import Spinning from "@/app/rollupscan/components/Spinning"
import { useChunkList } from "@/hooks/useRollupInfo"

import Table from "./Table"

const Blocks = () => {
  const params = useParams()
  const index = params!.batchIndex
  const { chunks, isLoading } = useChunkList(index)

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
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontWeight: 600 }} separator={<NavigateNextIcon fontSize="large" />}>
          <Link href="/rollupscan?page=1&per_page=10">Batches</Link>
          <Link href={`/rollupscan/batch/${index}`}>Batch {index}</Link>
          <Typography color="text.primary" sx={{ fontWeight: 600 }}>
            Chunks
          </Typography>
        </Breadcrumbs>
        {isLoading ? (
          <Spinning></Spinning>
        ) : (
          <>
            {chunks ? (
              <>
                <Table chunks={chunks} batchIndex={+(index ?? 0)} />
              </>
            ) : null}
          </>
        )}
      </Box>
    </Box>
  )
}

export default Blocks
