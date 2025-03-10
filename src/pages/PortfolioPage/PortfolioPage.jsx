import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAssets } from "../../redux/assetsSlice";
import { fetchTripById } from "../../redux/tripSlice";
import PortfolioHeader from "./PortfolioHeader";
import AssetsList from "../../components/portfolio/AssetList";
import Footer from "../../layout/Footer";

export default function Portfolio() {
  const { tripId } = useParams();
  const dispatch = useDispatch();
  const { selectedTrip, status, error } = useSelector((state) => state.trip);

  useEffect(() => {
    if(tripId){
      console.log("🚀 fetchTripById 요청 보냄, tripId:", tripId);
      dispatch(fetchTripById(tripId));
      // dispatch(fetchAssets(tripId));
    } else{
      console.log("gfdd")
    }
  }, [dispatch, tripId]);

  if (status === "loading") return <p>로딩 중...</p>;
  if (status === "failed") return <p>오류 발생</p>;
  if (!selectedTrip) return <p>여행 데이터를 찾을 수 없습니다.</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <PortfolioHeader trip={selectedTrip}/>
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto pb-16">
          <AssetsList />
        </div>
      </main>
      <Footer />
    </div>
  );
}
