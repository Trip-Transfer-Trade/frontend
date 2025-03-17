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
            <p></p>
        )}
      </div>
    </div>
  );
}
