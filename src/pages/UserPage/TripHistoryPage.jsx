import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TripAll, fetchTripById } from "../../redux/tripSlice";  
import GoalCard from "../../components/Trip/GoalCard";
import BackNavigation from "../../components/BackNavigation";
import { useNavigate } from "react-router-dom";

const TripHistoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tripGoals, status, error } = useSelector((state) => state.trip);

  useEffect(() => {
    dispatch(TripAll());
  }, [dispatch]);

  if (status === "loading") return <p>로딩 중...</p>;
  if (status === "failed") return <p>오류 발생: {error?.message || "알 수 없는 오류"}</p>;

  const sortedTrips = tripGoals.slice().sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

  const handleCardClick = async (tripId) => {
    if (!tripId) {
      console.error("유효하지 않은 tripId:", tripId);
      return;
    }

    await dispatch(fetchTripById(tripId));
    navigate(`/trip/${tripId}/portfolio`);
  };

  return (
    <div className="container mx-auto">
      <BackNavigation text="여행기록" />
      <div className="px-6">
        {tripGoals.length === 0 ? (
          <p>저장된 여행 기록이 없습니다.</p>
        ) : (
          sortedTrips.map((trip) => (
            <GoalCard key={trip.tripId} trip={trip} onClick={() => handleCardClick(trip.tripId)} />
          ))
        )}
      </div>
    </div>
  );
};

export default TripHistoryPage;
