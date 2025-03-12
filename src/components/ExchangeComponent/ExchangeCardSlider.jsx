import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { getCountryCodeFromCountryName } from "../../constants/countryMappings";

import NextConfirmButton from "../../components/NextConfirmButton";
import ExchangeCard from "./ExchangeCard";

export default function ExchangeCardSlider({ cards, exchangeAmount }) {
  const [selectedCards, setSelectedCards] = useState([0]); // 첫 번째 카드 기본 선택
  const [selectedTotal, setSelectedTotal] = useState(0);

  useEffect(() => {
    if (cards.length > 0) {
      setSelectedTotal(cards[0].amount); // 첫 번째 카드 금액으로 초기화
    }
  }, [cards]);

  useEffect(() => {
    const total = selectedCards.reduce(
      (sum, i) => sum + (cards[i]?.amount || 0),
      0
    );
    setSelectedTotal(total);
  }, [selectedCards, cards]);

  function handleCardClick(index) {
    setSelectedCards((prev) => {
      const isSelected = prev.includes(index);
      let newSelected;

      if (isSelected) {
        newSelected = prev.filter((i) => i !== index);
      } else {
        newSelected = [...prev, index];
      }

      return newSelected;
    });
  }

  function handleExchange() {
    console.log("exchangeAmount", exchangeAmount);
    console.log("selectedTotal", selectedTotal);

    if (!exchangeAmount) {
      alert("환전할 금액을 입력해주세요.");
      return;
    } else if (parseFloat(exchangeAmount) > selectedTotal) {
      alert("추가로 카드를 선택해주세요.");
      return;
    }
    alert("환전이 완료되었습니다.");
  }

  return (
    <div>
      <Swiper
        slidesPerView={1.8}
        spaceBetween={16}
        centeredSlides={true}
        modules={[EffectCoverflow]}
        className="mb-10"
      >
        {cards.map((card, index) => {
          const selectedOrder = selectedCards.indexOf(index);
          return (
            <SwiperSlide key={index}>
              <ExchangeCard
                image={`/assets/images/travel/travel-${getCountryCodeFromCountryName(
                  card.country
                ).toLowerCase()}.jpeg`}
                title={card.tripName}
                price={card.amount}
                onClick={() => handleCardClick(index)}
                selectedIndex={selectedOrder === -1 ? null : selectedOrder}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="px-6">
        <NextConfirmButton text="환전하기" onClick={handleExchange} />
      </div>
    </div>
  );
}
