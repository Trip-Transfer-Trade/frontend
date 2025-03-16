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
import { fetchTripByTripId } from "../../apis/trips";

export default function ExchangeCardSlider({
  cards,
  exchangeAmount,
  goalId,
  rate,
  fromCurrency,
  toCurrency,
}) {
  const [selectedCards, setSelectedCards] = useState([0]); // 첫 번째 카드 기본 선택
  const [selectedTotal, setSelectedTotal] = useState(0);
  const [selectedLess, setSelectedLess] = useState(false);
  const [id, setId] = useState(0);
  const navigate = useNavigate();
  console.log(
    "cards",
    cards,
    "exchangeAmount",
    exchangeAmount,
    "goalId",
    goalId,
    "rate",
    rate,
    "f",
    fromCurrency,
    "t",
    toCurrency
  );
  // goalId로 자기에 맞는 카드 선택해야됨
  // goal로 account 찾기
  useEffect(() => {
    const getAccountId = async (goalId) => {
      try {
        const data = await fetchTripByTripId(goalId);
        console.log("응답", data);
        setId(data.accountId);
      } catch (error) {
        console.error(error);
      }
    };
    getAccountId(goalId);
  }, []);

  useEffect(() => {
    if (cards.length > 0) {
      // 기본 선택 카드 설정
      const defaultSelectedCard = cards.find((card) => card.accountId === id);
      if (defaultSelectedCard) {
        setSelectedCards([cards.indexOf(defaultSelectedCard)]);
        setSelectedTotal(defaultSelectedCard.amount);
      }
    }
  }, [cards, id]);

  useEffect(() => {
    const total = selectedCards.reduce(
      (sum, i) => sum + (cards[i]?.amount || 0),
      0
    );
    setSelectedTotal(total);
  }, [selectedCards, cards]);

  function handleCardClick(index) {
    if (index == 0) {
      alert("현재 목표를 반드시 포함해야 합니다.");
      return selectedCards;
    }
    let newSelectedCards = [...selectedCards];
    const totalAmount = newSelectedCards.reduce(
      (sum, i) => sum + (cards[i]?.amount || 0),
      0
    );
    // 새로 선택하려는 카드가 이미 선택된 카드가 아니라면
    if (!newSelectedCards.includes(index)) {
      if (totalAmount > exchangeAmount) {
        alert("환전할 금액을 초과하는 카드를 선택할 수 없습니다.");
        return;
      }
      newSelectedCards.push(index);
    } else {
      // 이미 선택된 카드를 다시 선택하면 삭제
      newSelectedCards = newSelectedCards.filter((i) => i !== index);
    }

    // 선택된 카드 업데이트
    setSelectedCards(newSelectedCards);
    setSelectedLess(false);
  }

  async function handleExchange() {
    console.log("exchangeAmount", exchangeAmount);
    console.log("selectedTotal", selectedTotal);

    if (!exchangeAmount) {
      alert("환전할 금액을 입력해주세요.");
      return;
    } else if (parseFloat(exchangeAmount) > selectedTotal) {
      setSelectedLess(true);
      return;
    }
    setSelectedLess(false);

    let remainingAmount = parseFloat(exchangeAmount); // 남은 금액
    let updatedBatchDTOList = [];

    const sortedSelectedCards = selectedCards.map((index) => cards[index]);

    console.log("sortedSelectedCards", sortedSelectedCards);

    //단일 환전
    if (sortedSelectedCards.length === 1) {
      const singleCard = sortedSelectedCards[0];
      console.log(singleCard);
      if (!singleCard) return;
      const fromAmount = Math.min(singleCard.amount, remainingAmount);
      const toAmount = fromAmount * (1 / parseFloat(rate));

      const exchangeData = {
        accountId: singleCard.accountId,
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        exchangeRate: rate,
        fromAmount: fromAmount,
        toAmount: toAmount,
      };
      console.log("단일", exchangeData);

      try {
        const response = await fetchExchange(exchangeData);
        console.log(response);
        const data = {
          [fromCurrency]: {
            amount: fromAmount,
            currency: toCurrency,
            rate: rate,
            toAmount: toAmount,
          },
        };
        navigate("/exchange/complete", {
          state: { exchanges: data, goal: false },
        });
      } catch (error) {
        console.error("환전 오류", error);
      }
      return;
    }
    console.log("배치환전", sortedSelectedCards.length, "개 선택");
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
      console.log(remainingAmount);
      setSelectedLess(true);
      return;
    }

    setSelectedLess(false);

    const exchangeData = {
      accountId: goalId,
      fromCurrency: fromCurrency,
      toCurrency: toCurrency,
      fromAmount: exchangeAmount,
      exchangeRate: rate,
      batchDTOList: updatedBatchDTOList,
    };

    console.log("요청 data :", exchangeData);

    try {
      const response = await fetchExchangeBatch(exchangeData);
      response.currency = toCurrency;
      console.log(response);
      const data = {
        [fromCurrency]: {
          amount: exchangeAmount,
          currency: toCurrency,
          rate: rate,
          toAmount: response.toAmount,
        },
      };
      navigate("/exchange/complete", {
        state: { exchanges: data, goal: false },
      });
    } catch (error) {
      console.error("배치 환전 오류", error);
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

          const firstCard = cards.find((card) => card.accountId === id); // accountId에 맞는 카드 찾기
          const sortedCards = [...cards]
            .filter((card) => card.accountId !== id)
            .sort((a, b) => b.amount - a.amount);
          const displayCards = [firstCard, ...sortedCards];

          return displayCards.map((card, index) => {
            const selectedOrder = selectedCards.indexOf(cards.indexOf(card));
            return (
              <SwiperSlide key={index}>
                <ExchangeCard
                  image={`/assets/images/travel/travel-${getCountryCodeFromCountryName(
                    card.country
                  ).toLowerCase()}.jpeg`}
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
      {selectedLess ? (
        <p className="text-red-500 px-8 text-[12px] mb-10 flex">
          <img src="/assets/images/exchange/alert.svg" className="mx-1" />
          환전 가능 금액이 부족합니다. 추가 선택을 해주세요.
        </p>
      ) : (
        <p className="mb-10"></p>
      )}
      <div className="px-6">
        <NextConfirmButton text="환전하기" onClick={handleExchange} />
      </div>
    </div>
  );
}
