import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchAssets } from "../../redux/assetsSlice";
import AssetsList from "../../components/portfolio/AssetList";
import BackNavigation from "../../components/BackNavigation";
import PortfolioChart from "./PortfolioChart";

export default function SuggestPortfolioPage() {
  const location = useLocation();
  const dispatch = useDispatch();

  const suggestedTripId = location.state?.suggestedTripId;
  const activeTab = location.state?.activeTab || "k";

  useEffect(() => {
    if (suggestedTripId) {
      dispatch(fetchAssets({ tripId: suggestedTripId, country: activeTab }));
    }
  }, [dispatch, suggestedTripId, activeTab]);

  const { assets, status, error } = useSelector((state) => state.assets);

  if (status === "loading") return <p className="text-center">차트 데이터를 불러오는 중...</p>;
  if (status === "failed") return <p className="text-center text-red-500">자산 데이터를 불러오는 데 실패했습니다.</p>;
  if (!assets || assets.length === 0) return <p className="text-center text-gray-500">추천할 포트폴리오가 없습니다.</p>;


  return (
    <div className="flex flex-col min-h-screen">
      <BackNavigation />
      <PortfolioChart activeTab={activeTab} assets={assets} ignoreTrip={true} title="추천 포트폴리오" />
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto pb-16">
          <h3 className="text-lg font-medium mb-4 ml-8">포트폴리오 구성 자산</h3>
          <AssetsList activeTab={activeTab} />
        </div>
      </main>
    </div>
  );
}
