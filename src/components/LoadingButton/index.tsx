import { makeStyles } from "tss-react/mui"

import { Button, CircularProgress, Stack } from "@mui/material"

const useStyles = makeStyles()(theme => ({
  loadingIndicator: {
    color: theme.vars.palette.primary.contrastText,
    width: "max-content",
  },
}))

const ScrollLoadingButton = props => {
  const { children, loadingText, ...restProps } = props
  const { classes } = useStyles()

  const renderLoadingText = () => {
    if (loadingText === null) {
      return null
    }
    if (loadingText) {
      return loadingText
    }
    return children
  }

  return (
    <Button
      classes={{ loadingIndicator: classes.loadingIndicator }}
      loadingIndicator={
        <Stack direction="row" alignItems="center" spacing={1}>
          <span>{renderLoadingText()}</span>
          <CircularProgress color="inherit" size={18} thickness={4}></CircularProgress>
        </Stack>
      }
      {...restProps}
    >
      {children}
    </Button>
  )
}

export default ScrollLoadingButton
