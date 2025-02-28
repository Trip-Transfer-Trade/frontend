import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./TripGoalSwiper.css";

export default function TripGoalSwiper({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.3}
        coverflowEffect={{
          rotate: 0,
          depth: 150,
          stretch: 100,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full"
      >
        {children.map((child, index) => (
          <SwiperSlide key={index}>
            <div
              className={`card ${
                index === activeIndex ? "active" : "inactive"
              }`}
            >
              {child}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
