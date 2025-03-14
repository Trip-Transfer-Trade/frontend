import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTripById } from "../../redux/tripSlice";
import { fetchAssets } from "../../redux/assetsSlice";
import AssetsList from "../../components/portfolio/AssetList";
import BackNavigation from "../../components/BackNavigation";
import PortfolioChart from "./PortfolioChart";
import PortfolioAccount from "./PortfolioAccount";

export default function Portfolio() {
  const { tripId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedTrip, status, error } = useSelector((state) => state.trip);
  const { assets } = useSelector((state) => state.assets);
  const [activeTab, setActiveTab] = useState("k");

  useEffect(() => {
    if(tripId){
      dispatch(fetchTripById(tripId));
      dispatch(fetchAssets({ tripId, country: activeTab }));
    }
  }, [dispatch, tripId, activeTab]);

  if (status === "loading") return <p>로딩 중...</p>;
  if (status === "failed") return <p>오류 발생</p>;
  if (!selectedTrip) return <p>여행 데이터를 찾을 수 없습니다.</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <BackNavigation />
      <div className="flex items-center p-4 bg-white">
        <div className="ml-auto">
        <div className="w-[160px] h-8 bg-gray-100 rounded-lg p-1 flex">
        <button
              className={`flex-1 text-xs rounded-lg flex items-center justify-center transition-colors ${
                activeTab === "k" ? "bg-white shadow-sm" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("k")}
            >
              국내
            </button>
            <button
              className={`flex-1 text-xs rounded-lg flex items-center justify-center transition-colors ${
                activeTab === "u" ? "bg-white shadow-sm" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("u")}
            >
              해외
            </button>
          </div>
        </div>
      </div>
      <PortfolioAccount activeTab={activeTab} />
      <PortfolioChart activeTab={activeTab} assets={assets} title="나의 자산"/>
      <img 
          src="/assets/images/stock/portfolioBanner.svg"
          alt="포트폴리오 추천"
          className="cursor-pointer px-4"
          onClick={() => navigate(`/trip/${tripId}/portfolio/rank`)}
        />
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto pb-16">
         <h3 className="text-lg font-medium mb-4 ml-8">자산</h3>
         <AssetsList activeTab={activeTab} />
        </div>
      </main>
    </div>
  );
}
