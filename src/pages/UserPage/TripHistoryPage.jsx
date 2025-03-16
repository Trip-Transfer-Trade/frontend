import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TripAll } from "../../redux/tripSlice"; 
import GoalCard from "../../components/Trip/GoalCard";
import BackNavigation from "../../components/BackNavigation";

const TripHistoryPage = () => {
  const dispatch = useDispatch();
  const { tripGoals, status, error } = useSelector((state) => state.trip);
  const sortedTrips = [...tripGoals].sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
  useEffect(() => {
    dispatch(TripAll());
  }, [dispatch]);

  if (status === "loading") return <p>로딩 중...</p>;
  if (status === "failed") return <p>오류 발생: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <BackNavigation text="여행기록"/>
      {tripGoals.length === 0 ? (
        <p>저장된 여행 기록이 없습니다.</p>
      ) : (
        sortedTrips.map((trip) => <GoalCard key={trip.tripId} trip={trip} />)
      )}
    </div>
  );
};

export default TripHistoryPage;
