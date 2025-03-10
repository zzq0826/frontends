import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { styled } from "@mui/system"

import Data from "@/assets/blog/main.data.json"
import useCheckViewport from "@/hooks/useCheckViewport"

import BlogCard from "./Card"

const StyledSwiper = styled<any>(Swiper)(({ theme }) => ({
  marginTop: "4.4rem",
  "&.swiper": {
    paddingBottom: "5rem",
  },
  "& .swiper-pagination-bullet": {
    backgroundColor: "transparent",
    border: "1px solid #fff",
    width: "1.2rem",
    height: "1.2rem",
    opacity: 1,
    margin: "0 1rem !important",
  },
  "& .swiper-pagination-bullet-active": {
    backgroundColor: "#fff",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "2.4rem",
  },
}))

const Carousel = () => {
  const { isPortrait, isTabletLandscape } = useCheckViewport()
  let slidesPerView = 3
  if (isTabletLandscape) {
    slidesPerView = 2
  } else if (isPortrait) {
    slidesPerView = 1
  }

  const filteredData = Data.filter(blog => blog.type === "Ecosystem highlights" && blog.language === "en")

  return (
    <StyledSwiper
      slidesPerView={slidesPerView}
      spaceBetween={"30"}
      // slidesPerGroup={slidesPerView}
      centeredSlides={isPortrait}
      pagination={{
        clickable: true,
      }}
      // loop={isPortrait}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
    >
      {filteredData.map(blog => (
        <SwiperSlide key={blog.title}>
          <BlogCard blog={blog} />
        </SwiperSlide>
      ))}
    </StyledSwiper>
  )
}

export default Carousel
