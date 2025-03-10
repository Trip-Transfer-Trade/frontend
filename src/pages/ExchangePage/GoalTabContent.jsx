import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchAvailableAmount } from "../../apis/exchanges";

import { getCountryCodeFromCountryName } from "../../constants/countryMappings";

export default function GoalTabContent() {
  const navigate = useNavigate();

  const [tripGoals, setTripGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAvailableAmount();
        setTripGoals(data);
      } catch (error) {
        console.error("목표 별 환전 가능 금액 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      {loading ? (
        <p className="text-center text-gray-500">
          목표 별 환전 가능 금액 정보를 불러오는 중...
        </p>
      ) : (
        <div className="flex flex-col">
          <p className="text-lg font-bold mb-6">환전 가능 금액</p>
          <div className="space-y-2">
            {tripGoals.map((tripGoal) => (
              <div
                key={tripGoal.tripId}
                onClick={() => {
                  navigate(`/exchange/goals/${tripGoal.tripId}`, {
                    state: {
                      country: tripGoal.country,
                      tripName: tripGoal.tripName,
                      availableAmount: tripGoal.availableAmount,
                    },
                  });
                }}
                className="flex justify-between items-center p-6 bg-white rounded-lg border border-gray-300 cursor-pointer"
              >
                <div className="flex flex-col">
                  <p className="text-xs text-custom-gray-3">
                    {tripGoal.tripName}
                  </p>
                  <p className="text-xl font-bold">
                    {tripGoal.availableAmount.toLocaleString()}원
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
      )}
    </div>
  );
}
