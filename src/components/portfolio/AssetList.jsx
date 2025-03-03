const assets = [
  { id: 1, name: "SOL 미국 S&P500", code: "433330", price: "15,212", currentPrice: "21,324", profit: "40.8%", quantity: 50 },
];

export default function AssetsList() {
  return (
    <div className="px-4">
      <h3 className="text-lg font-medium mb-4">자산</h3>
      <div className="space-y-3">
        {assets.map((asset) => (
          <div key={asset.id} className="flex items-center bg-white rounded-lg p-3 shadow-sm">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xl">$</span>
            </div>
            <div className="flex-1">
              <p className="font-medium">{asset.name}</p>
              <p className="text-xs text-gray-500">{asset.code}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
