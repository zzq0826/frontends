"use client"

// import { motion, useCycle } from "motion/react"
import { motion, useCycle } from "motion/react"
import { useMemo } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, ButtonBase, ButtonProps, CircularProgress, IconButton, SvgIcon } from "@mui/material"

import ArrowRightIcon from "@/assets/svgs/common/arrow-right.svg"
import useCheckViewport from "@/hooks/useCheckViewport"

interface ScrollButtonProps extends Omit<ButtonProps, "color"> {
  width?: string | number
  color?: "primary" | "secondary" | "tertiary" | "default"
  gloomy?: boolean
  loading?: boolean
  disabled?: boolean
  whiteButton?: boolean
  download?: boolean

  // compatibility
  target?: string
  rel?: string
}

const gColor = (color, theme) => {
  switch (color) {
    case "primary":
      return theme.vars.palette.primary.main
    case "secondary":
      return theme.vars.palette.primary.contrastText
    case "tertiary":
      return "#ffffff"
    default:
      return theme.vars.palette.text.primary
  }
}

const cColor = (color, theme) => {
  switch (color) {
    case "primary":
      return theme.vars.palette.primary.contrastText
    case "secondary":
      return theme.vars.palette.text.primary
    case "tertiary":
      return "#000000"
    default:
      return theme.vars.palette.primary.contrastText
  }
}

const ButtonContainer = motion(Box)

const useStyles = makeStyles<any>()((theme, { width, color, whiteButton }) => ({
  wrapper: {
    position: "relative",
    height: "4.8rem",
    overflow: "hidden",
    borderRadius: "1rem",
    backgroundColor: whiteButton ? "#ffffff" : "transparent",
    width: width ?? "24rem",
    [theme.breakpoints.down("sm")]: {
      width: width ?? "18.5rem",
      height: "4.8rem",
    },
  },
  wrapperLoading: {
    opacity: 0.6,
  },
  wrapperGloomy: {
    opacity: 0.5,
    pointerEvents: "none",
  },
  wrapperDisabled: {
    backgroundColor: "#FFF0DD80",
    borderRadius: "1rem",
    pointerEvents: "none",
  },
  button: {
    fontSize: "1.8rem",
    fontWeight: 600,
    height: "100%",
    width: "100%",
    paddingLeft: "4.8rem",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: gColor(color, theme),
    color: gColor(color, theme),
    borderRadius: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
      paddingLeft: "4.8rem",
    },
  },
  buttonDisabled: {
    borderColor: "#EBC28E",
    color: "#EBC28E",
  },
  buttonLoading: {
    paddingLeft: "2rem",
    paddingRight: "2rem",
    border: "unset",
    gap: "0.4em",
    color: cColor(color, theme),
  },
  active: {
    color: cColor(color, theme),
  },
  mask: {
    width: "4.8rem",
    height: "100%",
    position: "absolute",
    backgroundColor: gColor(color, theme),
    borderRadius: "1rem",
    [theme.breakpoints.down("sm")]: {
      width: "4.8rem",
    },
  },
  maskLoading: {
    width: "100% !important",
  },
  maskDisabled: {
    backgroundColor: "#EBC28E",
  },

  icon: {
    width: "4.8rem",
    height: "100%",
    position: "absolute",
    zIndex: 1,
    color: `${cColor(color, theme)} !important`,
    [theme.breakpoints.down("sm")]: {
      width: "4.8rem",
    },
  },
}))

const maskDesktop = {
  normal: {
    width: "4.8rem",
  },
  expanding: {
    width: "100%",
  },
}

const maskMobile = {
  normal: {
    width: "4.8rem",
  },
  expanding: {
    width: "100%",
  },
}
const Button = (props: ScrollButtonProps) => {
  const { id, className, width, sx, color, loading, disabled, gloomy, children, whiteButton, ...restProps } = props
  const { classes, cx } = useStyles({
    color,
    width,
    disabled,
    loading,
    whiteButton,
  })

  const { isMobile } = useCheckViewport()

  const [isHover, setIsHover] = useCycle(false, true)

  const innerDisabled = useMemo(() => {
    if (loading) return false
    return disabled
  }, [loading, disabled])

  const handleHover = () => {
    setIsHover()
  }

  return (
    // TODO: allow sx, allow size=small/medium
    // avoid setting both 'disabled' and 'loading' to true.
    <ButtonContainer
      id={id}
      className={cx(
        classes.wrapper,
        innerDisabled && classes.wrapperDisabled,
        loading && classes.wrapperLoading,
        gloomy && classes.wrapperGloomy,
        className,
      )}
      sx={sx}
      onHoverStart={handleHover}
      onHoverEnd={handleHover}
      animate={isHover ? "expanding" : "normal"}
    >
      {!loading && (
        <IconButton classes={{ root: classes.icon }} component="span" disabled>
          <SvgIcon component={ArrowRightIcon} inheritViewBox></SvgIcon>
        </IconButton>
      )}
      <motion.div
        className={cx(classes.mask, loading && classes.maskLoading, innerDisabled && classes.maskDisabled)}
        variants={isMobile ? maskMobile : maskDesktop}
      ></motion.div>
      <ButtonBase
        classes={{
          root: cx(
            classes.button,
            isHover && !gloomy && !innerDisabled && classes.active,
            loading && classes.buttonLoading,
            innerDisabled && classes.buttonDisabled,
          ),
        }}
        disabled={innerDisabled || gloomy || loading}
        {...restProps}
      >
        {children} {loading && <CircularProgress sx={{ color: "inherit" }} size={isMobile ? 18 : 24} thickness={4}></CircularProgress>}
      </ButtonBase>
    </ButtonContainer>
  )
}

export default Button
