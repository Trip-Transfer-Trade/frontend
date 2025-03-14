import FormattedAccountNumber from "../../components/FormattedAccountNumber";

export default function TripList({ selectedTripId, setSelectedTripId, tripGoals }) {

  return (
    <div className="space-y-3">
      {tripGoals.map((item) => {
        const displayNumber = item.isAccount ? item.amountNumber : item.accountNumber;
        const isSelected = String(selectedTripId) === String(item.accountId);

        return (
          <div
            key={item.accountId}
            className={`p-4 border rounded-xl flex items-center space-x-4 cursor-pointer transition ${
              isSelected ? "bg-blue-100 border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedTripId(item.accountId)}
          >
            <span className="text-2xl">
              {item.isAccount ? "💰" : "🌍"}
            </span>

            <div className="flex-1">
              <p className="text-gray-700 font-medium">
                {item.isAccount ? "내 일반 계좌" : item.name}
              </p>
              <p className="text-sm text-gray-500">
                <FormattedAccountNumber accountNumber={displayNumber ?? "000000000000"} />
              </p>
              <p className="text-sm text-gray-500">
                {item.totalAmountInKRW?.toLocaleString()}원
              </p>
            </div>

            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full border ${
                isSelected ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
              }`}
            >
              {isSelected && <span className="text-white text-sm">✓</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}