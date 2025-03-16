import { useSelector } from "react-redux";

export default function MyTripGoalSet() {
  const tripData = useSelector((state) => state.trip);

  return (
    <div>
      <div className="p-6 mb-12">
        <h2 className="text-xl font-bold mb-2">목표를 설정했어요! 🎉</h2>
        <p className="text-lg font-bold text-gray-700">
          목표 도달을 위한 투자를 떠나볼까요?
        </p>
      </div>

      {/* 이미지 삽입 */}
      <div className="flex justify-center mb-24">
        <img src="/assets/images/create.svg" alt="목표 설정 완료" />
      </div>

      {/* 목표 정보 카드 */}
      <div className="bg-gray-100 p-6 rounded-lg inline-block text-left w-full">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">여행지</span>
          <span>{tripData.country || "미정"}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">목표 날짜</span>
          <span>{tripData.endDate || "미정"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">목표 금액</span>
          <span>
            {tripData.goalAmount ? tripData.goalAmount.toLocaleString() : "0"}원
          </span>
        </div>
      </div>
    </div>
  );
}
