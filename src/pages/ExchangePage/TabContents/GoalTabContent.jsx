import { getCountryCodeFromCountryName } from "../../../constants/countryMappings";

const tripGoals = [
  {
    goal_id: 1,
    country: "미국",
    name: "미국 여행 가기",
    amount: 200000,
  },
  {
    goal_id: 2,
    country: "일본",
    name: "일본 여행 가기",
    amount: 30000,
  },
];

export default function GoalTabContent() {
  return (
    <div className="flex flex-col">
      <p className="text-lg font-bold mb-6">환전 가능 금액</p>
      <div className="space-y-2">
        {tripGoals.map((tripGoal) => (
          <div
            key={tripGoal.goal_id}
            className="flex justify-between items-center p-6 bg-white rounded-lg border border-gray-300"
          >
            <div className="flex flex-col">
              <p className="text-xs text-custom-gray-3">{tripGoal.name}</p>
              <p className="text-xl font-bold">
                {tripGoal.amount.toLocaleString()}원
              </p>
            </div>

            <img
              src={`https://flagsapi.com/${getCountryCodeFromCountryName(
                tripGoal.country
              )}/flat/64.png`}
              alt={`${tripGoal.country} flag`}
              className="w-16 h-16 rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
