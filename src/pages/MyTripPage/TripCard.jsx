import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import ModalCenter from "../../components/ModalCenter";
import FormattedAccountNumber from "../../components/FormattedAccountNumber";
import { TbHandClick } from "react-icons/tb";

const countryCodeMap = {
  "미국": "US",
  "캐나다": "CA",
  "프랑스": "FR",
  "이탈리아": "IT",
  "일본": "JP",
  "한국": "KR",
  "독일": "DE",
  "영국": "GB",
  "스페인": "ES",
  "중국": "CN",
  "호주": "AU",
  "멕시코": "MX",
  "인도": "IN",
  "브라질": "BR",
  "아르헨티나": "AR",
  "칠레": "CL",
  "이집트": "EG",
  "남아프리카공화국": "ZA",
  "이름없음": "UN",
};

function getCountryFlagURL(countryName) {
  const countryCode = countryCodeMap[countryName] || "UN";
  return `https://flagsapi.com/${countryCode}/flat/64.png`;
}

export default function TripCard({ trip, accountId }) {
  const navigate = useNavigate();
  const {
    tripId,
    accountId: tripAccountId,
    accountNumber,
    name,
    country,
    goalAmount,
    totalProfit,
    totalAmountInKRW,
    endDate,
  } = trip;
  
  const progressText = goalAmount > 0 ? ((totalProfit / goalAmount) * 100).toFixed(0) : "0";
  const progressBarWidth = goalAmount > 0 ? Math.max(0, Math.min((totalProfit / goalAmount) * 100, 100)) : 0;
  const progressStyle = { width: `${progressBarWidth}%` };

  const flagURL = getCountryFlagURL(country);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "trip",
    item: { sourceType: "trip", sourceId: tripAccountId, trip },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["trip", "account"],
    drop: (item) => {
      navigate(
        `/trip/transfer?sourceId=${item.sourceId}&sourceType=${item.sourceType}&destId=${tripAccountId}&destType=trip`
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  

  const handleCardClick = () => {
    if (isModalOpen) return;
    if (totalAmountInKRW === 0) {
      setIsModalOpen(true);
    } else {
      navigate(`/trip/${tripId}/portfolio`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      ref={(node) => {
        drag(node);
        drop(node);
      }}
      className={`bg-white rounded-xl p-4 shadow-sm relative cursor-pointer hover:shadow-md transition ${
        isOver ? "border-2 border-blue-500" : ""
      } ${isDragging ? "opacity-50" : "opacity-100"}`}
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-center mb-2">
      <div>
        <p className="text-gray-600 text-sm">{name ?? "이름 없음"}</p>
        <p className="text-2xl font-bold">{totalAmountInKRW.toLocaleString()}원</p>
      </div>
      <div className="flex flex-col items-center">
        <img src={flagURL} alt={country} className="w-10 h-10" />
        <TbHandClick className="text-xl text-gray-400 cursor-pointer hover:text-gray-600 mt-1" />
      </div>
    </div>
      <p className="text-xs text-gray-500">계좌 번호 <FormattedAccountNumber accountNumber={accountNumber ?? "1234567891011"} /></p>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <div className="bg-white text-blue-600 text-[10px] px-2 py-0.5 rounded shadow-md">
            {progressText}% 달성
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={progressStyle}
          ></div>
        </div>
        <p className="text-[10px] text-gray-500 mt-1 text-right">
          {endDate} 까지 모으는 중
        </p>
      </div>
      {isModalOpen && (
        <ModalCenter isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">투자할 돈이 없어요.</h2>
            <p className="text-gray-600 text-center">
              계좌에 투자를 위한 돈이 부족합니다. 지금 바로 이체를 진행할까요?
            </p>
            <button
              onClick={() => {
                navigate(`/trip/transfer?sourceType=account&sourceId=${accountId}&destType=trip&destId=${tripAccountId}`);
                handleCloseModal();
              }}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              이체하러 가기
            </button>
            <button
              onClick={handleCloseModal}
              className="mt-2 w-full bg-gray-100 text-gray-400 py-2 rounded-lg hover:bg-gray-300"
            >
              나중에 하기
            </button>
          </div>
        </ModalCenter>
      )}
    </div>
  );
}
