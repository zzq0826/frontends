"use client"

import { motion } from "motion/react"

import { Box } from "@mui/material"

import useCheckViewport from "@/hooks/useCheckViewport"

const MotionBox = motion(Box)

const OrientationToView = props => {
  const { children, direction = "up", once = true, delay, ...restProps } = props

  const { isPortrait } = useCheckViewport()
  const variants = {
    up: {
      hidden: {
        y: 50,
        opacity: 0,
      },
      show: {
        y: 0,
        opacity: 1,
      },
    },
    down: {
      hidden: {
        y: -50,
        opacity: 0,
      },
      show: {
        y: 0,
        opacity: 1,
      },
    },
    left: {
      hidden: {
        x: 50,
        opacity: 0,
      },
      show: {
        x: 0,
        opacity: 1,
      },
    },
    right: {
      hidden: {
        x: -50,
        opacity: 0,
      },
      show: {
        x: 0,
        opacity: 1,
      },
    },
  }
  return (
    <MotionBox
      initial="hidden"
      whileInView="show"
      variants={variants[direction]}
      viewport={{ once, amount: isPortrait ? 0.2 : 0.8 }}
      transition={{ ease: [0.16, 1, 0.3, 1], duration: 1, delay }}
      {...restProps}
    >
      {children}
    </MotionBox>
  )
}

export default OrientationToView
