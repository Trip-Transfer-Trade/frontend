import { useNavigate } from "react-router-dom";
import { TbHandClick } from "react-icons/tb";
import { useDrop } from "react-dnd";

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
  "이름없음": "UN"
};

function getCountryFlagURL(countryName) {
  const countryCode = countryCodeMap[countryName] || "UN";
  return `https://flagsapi.com/${countryCode}/flat/64.png`;
}

export default function TripCard({ trip }) {
  const navigate = useNavigate();
  const { id, name, country, goalAmount, profit, endDate } = trip;
  const displayAmount = (goalAmount ?? 0).toLocaleString();
  const progress = goalAmount > 0 ? Math.min((profit / goalAmount) * 100, 100) : 0;
  const progressStyle = { width: `${progress}%` };
  const flagURL = getCountryFlagURL(country)

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ACCOUNT_CARD",
    drop: (item) => {
      navigate(`/trip/transfer?account=${item.accountNumber}&trip=${id}`);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));


  return (
    <div 
    ref={drop}
      className={`bg-white rounded-xl p-4 shadow-sm relative cursor-pointer hover:shadow-md transition ${
        isOver ? "border-2 border-blue-500" : ""
      }`}
      onClick={()=>navigate(`/trip/${trip.id}/portfolio`)}
    >
      <img src={flagURL} alt={country} className="absolute top-3 right-3 w-10 h-10" />

      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-gray-600 text-sm">{name ?? "이름 없음"}</p>
          <p className="text-2xl font-bold">{displayAmount}원</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <div className="bg-white text-blue-600 text-[10px] px-2 py-0.5 rounded shadow-md">
            {progress.toFixed(0)}% 달성
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={progressStyle}></div>
        </div>
        <p className="text-[10px] text-gray-500 mt-1 text-right">
          {endDate} 까지 모으는 중
        </p>
      </div>
    </div>
  );
}
