import { useSelector } from "react-redux";

export default function MyTripGoalSet({ onConfirm }) {
  const tripData = useSelector((state) => state.trip);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">목표가 설정되었습니다! 🎉</h2>

      <p className="text-lg">
        <span className="font-bold text-blue-500">{tripData.destination}</span>
        {" "}으로 떠나기 위해
      </p>

      <p className="mt-2">
        <span className="font-bold">{tripData.targetDate}</span> 까지{" "}
        <span className="font-bold text-blue-500">{tripData.targetAmount.toLocaleString()}원</span> 모아 보아요!
      </p>

      <div className="mt-6">
        <button onClick={onConfirm} className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium">
          목표 설정 완료
        </button>
      </div>
    </div>
  );
}
