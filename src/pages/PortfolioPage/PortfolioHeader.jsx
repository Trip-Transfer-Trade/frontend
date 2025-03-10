import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useState } from "react"
import BackNavigation from "../../components/BackNavigation";
import GoalCard from "../../components/Portfolio/GoalCard";
import { useParams } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioHeader() {
  const { tripId } = useParams();
    const [activeTab, setActiveTab] = useState("domestic")
  const assets = useSelector((state) => state.assets.assets);
  const selectedTrip = useSelector((state)=>state.trip.selectedTrip);
  if(!selectedTrip) return <p>여행 포트폴리오 상세 정보 불러오는 중...✈️</p>

  const { name, goalAmount, profit, endDate } = selectedTrip;

  const totalAssets = assets.reduce(
    (total, asset) => total + asset.currentPrice * asset.quantity,
    0
  );
  const totalPurchase = assets.reduce(
    (total, asset) => total + asset.price * asset.quantity,
    0
  );
  const totalCash = 230000;

  const processChartData = (assets) => {
    const maxItems = 6;
    let labels = [];
    let data = [];
    let colors = ["#4FD1C5", "#F56565", "#2D3748", "#F6E05E", "#667EEA", "#A0AEC0"];

    if (assets.length > maxItems) {
      const topItems = assets.slice(0, maxItems - 1);
      const others = assets.slice(maxItems - 1);

      labels = [...topItems.map((item) => item.name), "Others"];
      data = [
        ...topItems.map((item) => item.currentPrice * item.quantity),
        others.reduce((acc, item) => acc + item.currentPrice * item.quantity, 0),
      ];
    } else {
      labels = assets.map((item) => item.name);
      data = assets.map((item) => item.currentPrice * item.quantity);
    }

    return { labels, data, colors };
  };

  const { labels, data, colors } = processChartData(assets);

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="p-4 bg-white">
      <BackNavigation text= {name} />
      <div className="flex items-center p-4 bg-white">
        <div className="ml-auto">
        <div className="w-[160px] h-8 bg-gray-100 rounded-full p-1 flex">
            <button 
              className={`flex-1 text-xs rounded-full flex items-center justify-center transition-colors ${
                activeTab === "domestic" ? "bg-white shadow-sm" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("domestic")}
            >
              국내
            </button>
            <button 
              className={`flex-1 text-xs rounded-full flex items-center justify-center transition-colors ${
                activeTab === "international" ? "bg-white shadow-sm" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("international")}
            >
              해외
            </button>
          </div>
        </div>
      </div>
      <GoalCard profit={profit} goalAmount={goalAmount} endDate={endDate} />

      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
        <div className="mb-2">
          <h2 className="text-xl text-gray-500">총 자산</h2>
          <h2 className="text-2xl font-bold">₩{totalAssets.toLocaleString()}</h2>
        </div>
        <div className="flex flex-row items-center justify-between my-4">
          <div className="w-4/9 h-40">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          <div className="w-5/9 flex flex-wrap pl-4">
            {labels.map((label, index) => (
              <div key={index} className="w-1/2 flex items-center text-[10px] mb-1">
                <div className="w-1 h-2 mr-1" style={{ backgroundColor: colors[index] }}></div>
                <span className="font-medium">{label}:</span>
                <span className="ml-2 text-gray-500">
                  {((data[index] / totalAssets) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-2 bg-gray-50 py-4 px-4 mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">예수금</span>
            <span className="text-gray-700">{totalCash.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">매입금액</span>
            <span className="text-gray-700">{totalPurchase.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">평가금액</span>
            <span className="text-gray-700">{totalAssets.toLocaleString()}원</span>
          </div>
        </div>

        <div className="flex justify-center mt-4 pt-4">
          <a href={`/trip/${tripId}/portfolio/progress`} className="text-gray-400 text-sm font-medium underline">
            목표 수정하기
          </a>
        </div>
      </div>
    </div>
  );
}
