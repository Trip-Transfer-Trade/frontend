import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import BackNavigation from "../../components/BackNavigation";
import GoalCard from "../../components/portfolio/GoalCard";

ChartJS.register(ArcElement, Tooltip, Legend);

const allocation = [
  { name: "S&P500", percentage: 32.0, color: "#4FD1C5" },
  { name: "NVIDIA", percentage: 15.0, color: "#F56565" },
  { name: "TSGG", percentage: 22.0, color: "#2D3748" },
  { name: "TESLA", percentage: 8.0, color: "#F6E05E" },
  { name: "Microsoft", percentage: 23.0, color: "#667EEA" }
];

const chartData = {
  labels: allocation.map((item) => item.name),
  datasets: [
    {
      data: allocation.map((item) => item.percentage),
      backgroundColor: allocation.map((item) => item.color),
      borderWidth: 1,
    },
  ],
};

export default function PortfolioHeader() {
  return (
    <div className="p-4 bg-white">
      <BackNavigation text="여행가기✈️" />
      <GoalCard currentAmount={510000} targetAmount={1000000} daysLeft={52} />
      
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
        <div className="mb-2">
          <p className="text-sm text-gray-500">총 자산</p>
          <h2 className="text-2xl font-bold">₩2,510,000</h2>
          <p className="text-sm text-red-500">수익 510,000원 (25.5%)</p>
        </div>

        <div className="flex justify-center my-4">
          <Doughnut data={chartData} />
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">예수금</span>
            <span>230,000원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">매입금액</span>
            <span>2,000,000원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">평가금액</span>
            <span>2,740,000원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">합계기능금액</span>
            <span>510,000원</span>
          </div>
        </div>
      </div>
    </div>
  );
}
