import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TripAll } from "../../redux/tripSlice"; 
import BackNavigation from "../../components/BackNavigation";
import { Plus } from "lucide-react";

export default function MyStockPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tripGoals, status, error } = useSelector((state) => state.trip);

  useEffect(() => {
    dispatch(TripAll());
  }, [dispatch]);

  if (status === "failed") return <p className="text-center text-red-500">여행 데이터를 불러오는 데 실패했습니다.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BackNavigation text="여행별 주식 목록" />
      <div className="p-4 grid gap-4">
        {tripGoals.length > 0 ? (
          tripGoals.map((trip) => (
            <div
              key={trip.tripId}
              className="p-4 rounded-lg shadow-sm cursor-pointer"
              onClick={() => navigate(`/trip/${trip.tripId}/stockslist`, { state: { tripId: trip.tripId } })}
            >
              <h3 className="text-lg font-semibold">{trip.name}</h3>
              <p className="text-gray-600">{trip.endDate}</p>
            </div>
          ))
        ) : (
            <button
            className="w-full py-4 mt-4 bg-gray-100 rounded-xl flex items-center justify-center"
            onClick={() => navigate("/trip/tripgoal")}
          >
            <Plus className="w-5 h-5 text-gray-500 mr-1" />
            <span className="text-gray-500">새로운 목표 등록</span>
          </button>
        )}
      </div>
    </div>
  );
}
