import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "./Utility.css";
import { utilityData } from "./utilityData";
import {Box, Grid, Typography, useTheme} from "@mui/material";

const Utility = () => {
  const theme = useTheme();
  return (
    <>
    <Grid mb={4} sx={{color: theme.palette.text.light, display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center"}}>
      <div style={{width: "12px", height: "12px", borderRadius: "50%", background: theme.palette.text.light}}></div>
      <Typography variant="h3" sx={{fontWeight: "bold"}}>Services</Typography>
    </Grid>
      <Box sx={{ width: "80%", margin: "0 auto", display: "flex" }}>
        <Swiper
          watchSlidesProgress={true}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          spaceBetween={30}
          autoplay={{ delay: 1500 }}
          modules={[Autoplay]}
          className="mySwiper"
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {utilityData.map((item) => (
            <SwiperSlide
              key={item?.id}
              style={{
                width: "20%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.6rem",
                padding: "1.2rem",
              }}
            >
              <img src={item?.img} alt="img" className="slide-img" />
              <Typography variant="h3">{item?.heading}</Typography>
              <Typography variant="h6">{item?.title}</Typography>
              <Typography variant="p">{item?.desc}</Typography>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
};

export default Utility;
