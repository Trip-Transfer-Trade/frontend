import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAssets } from "../../redux/assetsSlice";
import AssetsList from "../../components/portfolio/AssetList"; 
import BackNavigation from "../../components/BackNavigation";

export default function StockListPage() {
  const { tripId: urlTripId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("k");

  const tripId = urlTripId || location.state?.tripId;


  useEffect(() => {
    if (tripId) {
      dispatch(fetchAssets({ tripId, country: activeTab }));
    }
  }, [dispatch, tripId, activeTab]);

  return (
    <div className="flex flex-col h-screen bg-white">
      <BackNavigation text="내 주식 목록"/>
      <div className="flex items-center justify-end px-6 py-4 bg-white">
        <div className="w-[160px] h-8 bg-gray-100 flex rounded-md overflow-hidden">
          <button
            className={`flex-1 text-xs flex items-center justify-center transition-colors ${
              activeTab === "k" ? "bg-white border-b-2 border-blue-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("k")}
          >
            국내
          </button>
          <button
            className={`flex-1 text-xs flex items-center justify-center transition-colors ${
              activeTab === "u" ? "bg-white border-b-2 border-blue-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("u")}
          >
            해외
          </button>
        </div>
      </div>

      <div className="flex-1 w-full overflow-y-auto">
        {tripId ? (
          <div className="w-full">
            <AssetsList activeTab={activeTab} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">여행 ID가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}