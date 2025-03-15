import FormattedAccountNumber from "../../components/FormattedAccountNumber";

export default function TripList({ selectedTripId, setSelectedTripId, tripGoals, activeTab }) {

  return (
    <div className="space-y-3">
      {tripGoals.map((item) => {
        const displayNumber = item.isAccount ? item.amountNumber : item.accountNumber;
        const isSelected = String(selectedTripId) === String(item.accountId);
        const balance =
          activeTab === "KRW"
            ? `${item.amount?.toLocaleString()}원`
            : `$${item.amountUS?.toLocaleString()}`;
        return (
          <div
            key={item.accountId}
            className={`py-6 px-5 border rounded-xl flex items-start space-x-4 cursor-pointer transition ${
              isSelected ? "bg-blue-100 border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedTripId(item.accountId)}
          >
            
            <div className="flex items-start space-x-3 flex-1">
              <span className="text-2xl mt-1">{item.isAccount ? "💰" : "🌍"}</span>
              <div className="flex flex-col justify-start leading-tight">
                <p className="text-lg text-gray-700 font-semibold">
                  {item.isAccount ? "내 일반 계좌" : item.name}
                </p>
                <p className="text-xs text-gray-500">
                  <FormattedAccountNumber accountNumber={displayNumber ?? "000000000000"} />
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-3 ml-auto">
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full border ${
                  isSelected ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
                }`}
              >
                {isSelected && <span className="text-white text-sm">✓</span>}
              </div>
              <p className="text-lg font-bold text-right min-w-[120px] mt-auto">{balance}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}