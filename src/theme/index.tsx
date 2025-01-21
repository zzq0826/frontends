"use client"

// @ts-ignore
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { getInitColorSchemeScript } from "@mui/material/styles"

// import darkTheme from "./dark"
import lightTheme from "./light"

const ScrollThemeProvider = ({ children }) => {
  const theme = createTheme({
    cssVariables: true,
    colorSchemes: {
      light: lightTheme,
      dark: lightTheme,
    },
  })

  // not use StyledEngineProvider, so mui style > tailwind style
  return (
    <ThemeProvider theme={theme}>
      {getInitColorSchemeScript({
        // colorSchemeStorageKey: "mui-mode",
        // defaultMode: "system",
      })}
      {children}
    </ThemeProvider>
  )
}

export default ScrollThemeProvider
