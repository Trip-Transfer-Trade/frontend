
const assets = [
  {
    id: 1,
    name: "SOL 미국 S&P500",
    code: "433330",
    price: "15,212",
    currentPrice: "21,324",
    profit: "40.8%",
    quantity: 50,
  },
  {
    id: 2,
    name: "SOL 미국 S&P500",
    code: "433330",
    price: "15,212",
    currentPrice: "21,324",
    profit: "40.8%",
    quantity: 50,
  },
  {
    id: 3,
    name: "SOL 미국 S&P500",
    code: "433330",
    price: "15,212",
    currentPrice: "21,324",
    profit: "40.8%",
    quantity: 50,
  },
  {
    id: 4,
    name: "SOL 미국 S&P500",
    code: "433330",
    price: "15,212",
    currentPrice: "21,324",
    profit: "40.8%",
    quantity: 50,
  },
  {
    id: 5,
    name: "SOL 미국 S&P500",
    code: "433330",
    price: "15,212",
    currentPrice: "21,324",
    profit: "40.8%",
    quantity: 50,
  },
]

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
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{asset.name}</p>
                  <p className="text-xs text-gray-500">{asset.code}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">수량 : {asset.quantity}</p>
                  <div className="flex items-center">
                    <p className="text-xs text-gray-500 mr-2">구매가 {asset.price}</p>
                  </div>
                  <div className="flex items-center justify-end">
                    <p className="text-xs mr-2">현재가 {asset.currentPrice}</p>
                    <p className="text-xs text-red-500">({asset.profit})</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

