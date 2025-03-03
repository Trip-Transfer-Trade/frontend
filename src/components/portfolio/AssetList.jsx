import { useSelector } from "react-redux";

export default function AssetsList() {
  const assets = useSelector((state) => state.assets.assets);

  return (
    <div className="px-4 overflow-y-auto max-h-[400px]">
      <h3 className="text-lg font-medium mb-4">자산</h3>
      <div className="space-y-3">
        {assets.map((asset) => (
          <div key={asset.id} className="flex items-center bg-white rounded-lg p-3 shadow-sm">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xl">$</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{asset.name}</p>
                  <p className="text-xs text-gray-500">{asset.code}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">수량: {asset.quantity}</p>
                  <p className="text-xs text-gray-500 mr-2">구매가 {asset.price.toLocaleString()}</p>
                  <p className="text-xs">현재가 {asset.currentPrice.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
