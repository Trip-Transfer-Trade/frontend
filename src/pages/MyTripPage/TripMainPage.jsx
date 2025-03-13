import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { useEffect } from "react";
import TripCard from "./TripCard";
import { useSelector, useDispatch } from "react-redux";
import { TripAll } from "../../redux/tripSlice";
import { nomalAccount } from "../../redux/nomalAccountSlice";
import AccountCard from "./AccountCard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function TripMainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tripGoals, status } = useSelector((state) => state.trip);
  const account = useSelector((state) => state.nomalAccount.account);

  useEffect(() => {
    if (status === "idle") {
      dispatch(TripAll());
    }
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(nomalAccount());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(tripGoals) && tripGoals.length === 0) {
      dispatch(TripAll());
    }
  }, [tripGoals, dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 p-4 space-y-4">
          {account && account.amountNumber ? (
            <AccountCard account={account} />
          ) : (
            <p>계좌 정보를 불러오는 중...</p>
          )}

          {status === "loading" && <p>로딩 중...</p>}
          {Array.isArray(tripGoals) && tripGoals.length > 0 ? (
            tripGoals.map((trip) => <TripCard key={trip.tripId} trip={trip} />)
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
