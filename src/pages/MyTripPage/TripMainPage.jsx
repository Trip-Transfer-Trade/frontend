import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { useEffect } from "react"; 
import TripCard from "./TripCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchTripGoals } from "../../redux/tripSlice";
import AccountCard from "./AccountCard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function TripMainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tripGoals, status, error } = useSelector((state) => state.trip);

  const account = {
    accountNumber: "123-456-789",
    balance: 5000000,
  };
  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTripGoals());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (Array.isArray(tripGoals) && tripGoals.length === 0) {
      dispatch(fetchTripGoals());
    }
  }, [tripGoals, dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 p-4 space-y-4">
          
          <AccountCard account={account} />

          {status === "loading" && <p>로딩 중...</p>}
          {status === "failed" && <p>여행 목표 조회 실패: {error}</p>}
          
        {Array.isArray(tripGoals) && tripGoals.length > 0 ? (
            tripGoals.map((trip) => <TripCard key={trip.id} trip={trip} />)
          ) : (
            <p>여행 목표가 없습니다.</p>
          )}

        <button
            className="w-full py-4 mt-4 bg-gray-100 rounded-xl flex items-center justify-center"
            onClick={() => navigate("/trip/tripgoal")}
          >
            <Plus className="w-5 h-5 text-gray-500 mr-1" />
            <span className="text-gray-500">새로운 목표 등록</span>
          </button>
        </main>
      </div>
    </DndProvider>
  );
}
