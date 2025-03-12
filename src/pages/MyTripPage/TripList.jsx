export default function TripList({ tripGoals, account, selectedTripId, setSelectedTripId }) {

  return (
    <div className="space-y-3">
      {tripGoals.map((trip) => (
        <div
          key={trip.tripId}
          className={`p-4 border rounded-xl flex items-center space-x-4 cursor-pointer transition ${
            selectedTripId == trip.tripId
              ? "bg-blue-100 border-blue-500"
              : "border-gray-300"
          }`}
          onClick={() => setSelectedTripId(trip.tripId)}
        >
          <span className="text-2xl">🌍</span>
          <div className="flex-1">
            <p className="text-gray-700 font-medium">{trip.name}</p>
            <p className="text-sm text-gray-500">{trip.goalAmount.toLocaleString()}원 목표</p>
          </div>

          <div
            className={`w-6 h-6 flex items-center justify-center rounded-full border ${
              selectedTripId == trip.tripId ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
            }`}
          >
            {selectedTripId == trip.tripId && <span className="text-white text-sm">✓</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
