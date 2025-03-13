import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { getCountryCodeFromCountryName } from "../../constants/countryMappings";

import NextConfirmButton from "../../components/NextConfirmButton";
import ExchangeCard from "./ExchangeCard";
import { fetchExchange, fetchExchangeBatch } from "../../apis/exchanges";
import { useNavigate } from "react-router-dom";


export default function ExchangeCardSlider({ cards, exchangeAmount, goalId, rate, fromCurrency, toCurrency }) {
  const [selectedCards, setSelectedCards] = useState([0]); // 첫 번째 카드 기본 선택
  const [selectedTotal, setSelectedTotal] = useState(0);
  const [selectedLess, setSelectedLess] = useState(false);
  const [tripId, setTripId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (cards.length > 0) {
      setSelectedTotal(cards[0].amount); // 첫 번째 카드 금액으로 초기화
    }
    setTripId(goalId);
    console.log(goalId);
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
      setSelectedLess(false);
      return newSelected;
    });
  }

  async function handleExchange() {
    console.log("exchangeAmount", exchangeAmount);
    console.log("selectedTotal", selectedTotal);

    if (!exchangeAmount) {
      alert("환전할 금액을 입력해주세요.");
      return;
    } else if (parseFloat(exchangeAmount) > selectedTotal) {
      setSelectedLess(true);
      // alert("추가로 카드를 선택해주세요.");
      return;
    }
    setSelectedLess(false);
    console.log("HERE");
    
    let remainingAmount = parseFloat(exchangeAmount); // 남은 금액
    let updatedBatchDTOList = [];
    const myWalletIndex = 0;
    const otherCards = selectedCards.filter((index) => index !== myWalletIndex);
    const sortedSelectedCards = [
      cards[myWalletIndex], // 내 지갑 카드 유지
      ...otherCards.map((index) => cards[index]).sort((a, b) => b.amount - a.amount),
    ];
    // console.log(sortedSelectedCards); 
    //단일 환전
    if (sortedSelectedCards.length === 1) {
      const singleCard = sortedSelectedCards[0];
      console.log("들어옴", singleCard )
      if (!singleCard) return;
      const toAmount = Math.min(singleCard.amount,remainingAmount);
      const fromAmount = toAmount*(parseFloat(rate));

      const exchangeData = {
        accountId: singleCard.accountId,
        fromCurrency: fromCurrency,
        toCurrency:toCurrency,
        exchangeRate: rate, // 환율 연결  
        fromAmount: fromAmount,
        toAmount:toAmount
      };
      console.log("단일",exchangeData);
      
      try{
        const response = await fetchExchange(exchangeData);
        console.log(response);
        navigate('/exchange/complete',{state:{exchanges:[response]}});
      } catch(error){
        console.error("환전 오류",error);
      }
      return;
    }
    console.log("배치환전",sortedSelectedCards.length,"개 선택")
    //배치 환전 
    for (let i = 0; i < sortedSelectedCards.length; i++) {
      const card = sortedSelectedCards[i];  
      if (!card) continue;
  
      const deductionAmount = Math.min(card.amount, remainingAmount);
      
      updatedBatchDTOList.push({
        amount: deductionAmount,
        accountId: card.accountId,
      });
  
      remainingAmount -= deductionAmount;
      console.log(remainingAmount);
  
      if (remainingAmount <= 0) break;
    }
  
    if (remainingAmount > 0) {
      console.log(remainingAmount)
      setSelectedLess(true);
      return;
    }

    setSelectedLess(false);
    
    const exchangeData = {
      accountId: goalId,
      fromCurrency:fromCurrency,
      toCurrency:toCurrency,
      exchangeRate:rate,
      batchDTOList:updatedBatchDTOList
    }

    console.log("요청 data :",exchangeData);
    
    try{
      const response =await fetchExchangeBatch(exchangeData);
      console.log(response);
      navigate('/exchange/complete',{state:{exchanges:[response]}});
    } catch(error){
      console.error("배치 환전 오류",error);
      alert("환전 실패");
    }
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
        {(() => {
          if (cards.length === 0) return null;

          const firstCard = cards[0];
          const sortedCards = [...cards.slice(1)].sort((a, b) => b.amount - a.amount);
          const displayCards = [firstCard, ...sortedCards];

          return displayCards.map((card, index) => {
            const selectedOrder = selectedCards.indexOf(cards.indexOf(card));
            return (
              <SwiperSlide key={index}>
                <ExchangeCard
                  image={`/assets/images/travel/travel-${getCountryCodeFromCountryName(card.country).toLowerCase()}.jpeg`}
                  title={card.tripName}
                  price={card.amount}
                  onClick={() => handleCardClick(cards.indexOf(card))}
                  selectedIndex={selectedOrder === -1 ? null : selectedOrder}
                />
              </SwiperSlide>
            );
          });
        })()}
      </Swiper>
      {selectedLess? <p className="text-red-500 px-8 text-[12px] mb-10 flex">
        <img src="/assets/images/exchange/alert.svg" className="mx-1"/>환전 가능 금액이 부족합니다. 추가 선택을 해주세요.</p> : <p className="mb-10"></p>}
      <div className="px-6">
        <NextConfirmButton text="환전하기" onClick={handleExchange} />
      </div>
    </div>
  );
}
