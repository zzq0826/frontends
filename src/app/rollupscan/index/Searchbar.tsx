import { useRouter } from "next/navigation"
import { useState } from "react"

import { IconButton, InputBase, Paper } from "@mui/material"
import { styled } from "@mui/material/styles"

import { searchUrl } from "@/apis/rollupscan"
import useRollupStore from "@/stores/rollupStore"
import { scrollRequest } from "@/utils/request"

const SearchbarContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  background: "#ffffff",
  borderRadius: "40px",
  paddingRight: "0.5rem",
  display: "flex",
  alignItems: "center",
  marginBottom: "6rem",
  boxShadow: "none",
  height: "5.5rem",
  [theme.breakpoints.down("md")]: {
    padding: "0",
    overflow: "hidden",
    marginBottom: "3rem",
  },
}))

export default function Searchbar() {
  const { changeEmptyBatch, changeSearchLoading, changeErrorMessage } = useRollupStore()
  const [value, setValue] = useState("")
  const router = useRouter()

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleKeyUp = e => {
    setValue(e.target.value)
    if (e.target.value === "") {
      changeEmptyBatch(false)
    }
  }

  const handleSearch = () => {
    if (value === "") return
    changeSearchLoading(true)
    scrollRequest(`${searchUrl}?keyword=${value}`)
      .then(({ batch_index }) => {
        if (~batch_index) {
          router.push(`/rollupscan/batch/${batch_index}/blocks`)
        } else {
          changeEmptyBatch(true)
        }
      })
      .catch(() => {
        changeEmptyBatch(true)
        changeErrorMessage("Failure when searching block")
      })
      .finally(() => {
        changeSearchLoading(false)
      })
  }

  return (
    <SearchbarContainer>
      <IconButton
        sx={{
          paddingLeft: ["1.8rem", "2.2rem"],
          color: "text.secondary",
          pointerEvents: "none",
        }}
        component="label"
        aria-label="search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 9.58774C0 4.52509 4.09353 0.415039 9.15187 0.415039C14.2089 0.415039 18.3121 4.5238 18.3121 9.58774C18.3121 11.7662 17.5538 13.7729 16.2836 15.3468L21.7179 20.796C22.0944 21.1736 22.094 21.7854 21.7169 22.1625C21.3398 22.5395 20.7289 22.5391 20.3523 22.1615L14.2727 16.0653C13.8964 15.6879 13.8966 15.0764 14.2732 14.6993C15.5786 13.3921 16.3823 11.5838 16.3823 9.58774C16.3823 5.59106 13.1431 2.34749 9.15187 2.34749C5.16191 2.34749 1.92982 5.58978 1.92982 9.58774C1.92982 13.5844 5.16899 16.828 9.16023 16.828C9.64452 16.828 10.1265 16.7765 10.5909 16.6865C11.1141 16.5851 11.6203 16.9276 11.7215 17.4515C11.8228 17.9754 11.4808 18.4823 10.9576 18.5837C10.385 18.6947 9.77981 18.7604 9.16023 18.7604C4.10318 18.7604 0 14.6517 0 9.58774Z"
            fill="#101010"
          />
        </svg>
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, pr: ["1.8rem", "2.2rem"] }}
        placeholder="Search by block height / block hash"
        inputProps={{ "aria-label": "Search by block height / block hash" }}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
    </SearchbarContainer>
  )
}
