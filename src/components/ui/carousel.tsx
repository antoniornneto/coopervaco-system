"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import i1 from "../../../public/assets/carrosel/1.jpg";
import i2 from "../../../public/assets/carrosel/2.jpg";
import i3 from "../../../public/assets/carrosel/3.jpg";
import i4 from "../../../public/assets/carrosel/4.jpg";
import i5 from "../../../public/assets/carrosel/5.jpg";
import i6 from "../../../public/assets/carrosel/6.jpg";
import i7 from "../../../public/assets/carrosel/7.jpg";
import i8 from "../../../public/assets/carrosel/8.jpg";
import i9 from "../../../public/assets/carrosel/9.jpg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const swipperContainer = {
  marginBottom: "20px",
};

const swipperElement = {
  display: "flex",
  justifyContent: "center",
  justifyItems: "center",
  height: "700px",
};

const swipperElementThumb = {
  width: "120px",
  height: "80px",
  cursor: "pointer",
};

const imageArray = [i1, i2, i3, i4, i5, i6, i7, i8, i9];

export default function Carousel() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <div className="w-[60%] md:w-[90%]">
      <Swiper
        slidesPerView={1}
        navigation={{ enabled: true }}
        modules={[Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        style={swipperContainer}
      >
        {imageArray.map((image, index) => (
          <SwiperSlide key={index} style={swipperElement}>
            <Image src={image} width={0} height={0} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="md:hidden">
        <Swiper
          slidesPerView={9}
          spaceBetween={20}
          modules={[Thumbs]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
        >
          {imageArray.map((image, index) => (
            <SwiperSlide key={index} style={swipperElementThumb}>
              <Image src={image} width={0} height={0} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
