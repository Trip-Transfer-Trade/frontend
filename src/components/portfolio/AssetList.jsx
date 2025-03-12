import { useSelector } from "react-redux";

export default function AssetsList({ activeTab }) {
  const assets = useSelector((state) => state.assets.assets);

  return (
    <div className="px-4 overflow-y-auto max-h-[400px]">
      <div className="space-y-3">
        {assets.length > 0 ? (
          assets.map((asset) => (
            <div key={asset.stockCode} className="flex items-center bg-white rounded-lg p-3 shadow-sm">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-xl">$</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{asset.stockName}</p>
                    <p className="text-xs text-gray-500">{asset.stockCode}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">수량: {asset.quantity}</p>
                    <p className="text-xs text-gray-500 mr-2">구매가 {Number(asset.avgPrice).toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mr-2">현재가 {Number(asset.currencyPrice).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mb-4 ml-4">자산 정보가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
