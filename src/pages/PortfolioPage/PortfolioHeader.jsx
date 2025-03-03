import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import BackNavigation from "../../components/BackNavigation";
import GoalCard from "../../components/portfolio/GoalCard";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioHeader() {
  const assets = useSelector((state) => state.assets.assets);

  const totalAssets = assets.reduce((total, asset) => total + asset.currentPrice * asset.quantity, 0);
  const totalPurchase = assets.reduce((total, asset) => total + asset.price * asset.quantity, 0);
  const totalProfit = totalAssets - totalPurchase;
  const totalCash = 230000; // 예수금 -> 가짜 나중에 여기도 REDUX로 관리 > 백에서 값 가져오기기

  const chartData = {
    labels: assets.map(asset => asset.name),
    datasets: [
      {
        data: assets.map(asset => asset.currentPrice * asset.quantity),
        backgroundColor: ["#4FD1C5", "#F56565", "#2D3748", "#F6E05E", "#667EEA"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 bg-white">
      <BackNavigation text="여행가기✈️" />
      <GoalCard currentAmount={510000} targetAmount={1000000} daysLeft={52} />

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
        <div className="mb-2">
          <p className="text-sm text-gray-500">총 자산</p>
          <h2 className="text-2xl font-bold">₩{totalAssets.toLocaleString()}</h2>
          <p className={`text-sm ${totalProfit >= 0 ? "text-red-500" : "text-blue-500"}`}>
            {totalProfit >= 0 ? "수익" : "손실"} {totalProfit.toLocaleString()}원 ({((totalProfit / totalPurchase) * 100).toFixed(2)}%)
          </p>
        </div>

        <div className="flex justify-center my-4">
          <Doughnut data={chartData} />
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">예수금</span>
            <span>{totalCash.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">매입금액</span>
            <span>{totalPurchase.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">평가금액</span>
            <span>{totalAssets.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">합계 기능 금액</span>
            <span>{totalProfit.toLocaleString()}원</span>
          </div>
        </div>

        <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
          <a href="" className="text-gray-600 text-sm font-medium">투자하기</a>
          <a href="" className="text-gray-600 text-sm font-medium">환전하기</a>
          <a href="/trip/edit" className="text-gray-600 text-sm font-medium">수정하기</a>
        </div>
      </div>
    </div>
  );
}
