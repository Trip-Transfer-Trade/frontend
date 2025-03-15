import { useState, useEffect } from "react"
import BackNavigation from "../../components/BackNavigation"
import Button from "../../components/Button"
import SharedModal from "../../components/Modal";
import ExchangeMethod from "../ExchangePage/ExchangeMethodPage";
import { fetchTripByTripId } from "../../apis/trips";
import { useParams } from "react-router-dom";
import { getCurrencyCodeFromCountryName } from "../../constants/countryMappings";

export default function GoalSellSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [sellData, setSellData] = useState({tripId:1,tripName:"name",country:"미국",profit:0, profitUs:0});
  
  const tripId = useParams()?.tripGoal;

  useEffect(()=>{
    const fetchData = async () => {
        try{
            console.log(tripId);
            const data = await fetchTripByTripId(tripId);
            console.log(data);
            setSellData({
                tripId:tripId,
                name:data.name,
                country:data.country,
                profit:(data.profit != null ? data.profit : 0) + (data.realisedProfit != null ? data.realisedProfit : 0),
                profitUs:(data.profitUs != null ? data.profitUs : 0) + (data.realisedProfitUs != null ? data.realisedProfitUs : 0)
            })
        } catch (error){
            console.error("로딩 오류",error);
        } finally{
            setLoading(false);
        };
    }
    fetchData();
  },[])

  if (loading) return <p>⏳ 결과 데이터를 불러오는 중...</p>;
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
    <BackNavigation />

      <div className="flex-1 flex flex-col items-center px-5">
        <h1 className="text-[20px] text-center font-bold mt-12 mb-16">일괄 매도를 성공했습니다</h1>

        <div className="relative w-48 h-48 mb-12">
          <img
            src="/assets/images/trip/good.svg"
            alt="Cute cat character with coins"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="w-full bg-gray-50 rounded-xl p-5 mb-12">
          <div className="flex justify-between mb-6">
            <div className="font-medium text-gray-800">여행 목표</div>
            <div className="font-medium text-gray-800">{sellData.name || "목표명 없음"}</div>
          </div>

          <div className="flex justify-between mb-6">
            <div className="font-medium text-gray-800">국내 투자</div>
            <div className="font-medium text-gray-800">{sellData.profit?.toLocaleString() || 0}원</div>
          </div>

          <div className="flex justify-between">
            <div className="font-medium text-gray-800">해외 투자</div>
            <div className="font-medium text-gray-800">${sellData.profitUs?.toLocaleString() || 0}</div>
          </div>
        </div>

        <Button text="환전하러 가기" onClick={() => setIsModalOpen(true)} variant = "primary"/>
        {isModalOpen && (
        <SharedModal onClose={() => setIsModalOpen(false)}>
          <ExchangeMethod
            tripId={sellData.tripId}
            currencyCode={getCurrencyCodeFromCountryName(sellData.country)}
          />
        </SharedModal>
      )}
      </div>
    </div>
  )
}

