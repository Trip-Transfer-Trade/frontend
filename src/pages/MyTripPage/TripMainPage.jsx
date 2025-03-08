import { useNavigate } from "react-router-dom";
import TripCard from "./TripCard";
import { Plus } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTripGoals } from "../../redux/tripSlice";

export default function TripMainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tripGoals, status, error } = useSelector((state) => state.trip);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTripGoals());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (tripGoals.length === 0) {
      dispatch(fetchTripGoals());
    }
  }, [tripGoals, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4 space-y-4">
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
  );
}
