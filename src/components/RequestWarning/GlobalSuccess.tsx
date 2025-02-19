import { makeStyles } from "tss-react/mui"

import { Alert, SvgIcon } from "@mui/material"

import SuccessSvg from "@/assets/svgs/nft/alert-success.svg"

const useStyles = makeStyles()(theme => ({
  alert: {
    borderRadius: 5,
    padding: "1.6rem",
    [theme.breakpoints.down("sm")]: {
      padding: "1.2rem 1.6rem",
    },
  },

  defaultSuccess: {
    backgroundColor: "#DFFCF8",
    color: "#0F8E7E",
  },

  icon: {
    marginRight: 8,
  },
  message: {
    lineHeight: 1.5,
    fontWeight: 600,
  },
}))

const GlobalSuccess = (props: any) => {
  const { severity = "success", message, style, ref, ...restProps } = props
  const { classes } = useStyles()

  return (
    <Alert
      ref={ref}
      style={style}
      severity={severity}
      sx={{ maxWidth: "49rem" }}
      iconMapping={{
        success: <SuccessSvg className="w-[2.4rem] h-auto text-[#0F8E7E]"></SuccessSvg>,
      }}
      classes={{
        root: classes.alert,
        icon: classes.icon,
        defaultSuccess: classes.defaultSuccess,
        message: classes.message,
      }}
      {...restProps}
    >
      {message}
    </Alert>
  )
}

GlobalSuccess.displayName = "GlobalSuccess"

export default GlobalSuccess
