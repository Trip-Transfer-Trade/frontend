import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import ExchangeCard from "./ExchangeCard";

export default function ExchangeCardSlider({ cards }) {
  const [selectedCards, setSelectedCards] = useState([]);

  function handleCardClick(index) {
    setSelectedCards((prev) => {
      const isSelected = prev.includes(index);

      if (isSelected) {
        // 선택 해제
        return prev.filter((i) => i !== index);
      } else {
        // 새로운 카드 선택
        return [...prev, index];
      }
    });
  }

  return (
    <Swiper
      slidesPerView={1.8}
      spaceBetween={16}
      centeredSlides={true}
      modules={[EffectCoverflow]}
    >
      {cards.map((card, index) => {
        const selectedOrder = selectedCards.indexOf(index);
        return (
          <SwiperSlide key={index}>
            <ExchangeCard
              image={card.image}
              title={card.title}
              price={card.price}
              onClick={() => handleCardClick(index)}
              selectedIndex={selectedOrder === -1 ? null : selectedOrder}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
