import { useSelector } from "react-redux";

export default function MyTripGoalSet({ onConfirm }) {
  const tripData = useSelector((state) => state.trip);
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">목표가 설정되었습니다!🎉</h2>

      <p className="text-lg">
        <span className="font-bold text-blue-500">{tripData.country}</span>
        {" "}으로 떠나기 위해
      </p>

      <p className="mt-2">
        <span className="font-bold">{tripData.endDate}</span> 까지{" "}
          <span className="font-bold text-blue-500">
            {tripData.goalAmount ? tripData.goalAmount.toLocaleString() : "0"}원
          </span>
        모아 보아요!
      </p>
    </div>
  );
}
