import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FiBarChart2 } from "react-icons/fi";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart({ activeTab, assets, ignoreTrip = false, title = "" }) {
  const { tripId } = useParams();
  
  const selectedTrip = useSelector((state) => state.trip.selectedTrip);

  if (!ignoreTrip && !selectedTrip)
    return <p>여행 포트폴리오 상세 정보 불러오는 중...✈️</p>;

  if (!assets || assets.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center h-52 mx-4 mb-4">
        <FiBarChart2 className="text-4xl text-gray-400 mb-2" />
        <p className="text-gray-500 text-lg font-medium">보유한 종목이 없어요</p>
      </div>
    );
  }

  const processChartData = (assets) => {
    const maxItems = 6;
    let labels = [];
    let data = [];
    let colors = ["#4FD1C5", "#F56565", "#2D3748", "#F6E05E", "#667EEA"];
    let filteredAssets = assets.filter(item => item.quantity > 0);

    let sortedAssets = [...filteredAssets].sort(
      (a, b) => b.currencyPrice * b.quantity - a.currencyPrice * a.quantity
    );

    const shortenName = (name) => name.length > 5 ? name.substring(0, 5) + "..." : name;

    if (sortedAssets.length > maxItems) {
      const topItems = assets.slice(0, maxItems - 1);
      const others = assets.slice(maxItems - 1);

      labels = [...topItems.map((item) => shortenName(item.stockName)), "기타"];
      data = [
        ...topItems.map((item) => item.currencyPrice * item.quantity),
        others.reduce((acc, item) => acc + item.currencyPrice * item.quantity, 0),
      ];
      colors = [...colors.slice(0, maxItems - 1), "#A0AEC0"];
    } else {
      labels = sortedAssets.map((item) => item.stockName);
      data = sortedAssets.map((item) => item.currencyPrice * item.quantity);
      colors = colors.slice(0, sortedAssets.length)
    }
    return { labels, data, colors }
  };

  const { labels, data, colors } = processChartData(assets);
  const totalAssets = data.reduce((acc, val) => acc + val, 0);

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
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="p-4 bg-white">
      <div className="bg-white rounded-lg p-4 shadow-lg mb-4">
        <div className="mb-2">
          <h2 className="text-xl text-gray-700">{title}</h2>
        </div>
        <div className="flex flex-row items-center justify-between my-4">
          <div className="mr-3 w-4/9 h-40">
            <Doughnut data={chartData} options={chartOptions} />
          </div>

          <div className="w-5/9 flex flex-col items-center pl-2 overflow-x-auto">
            {labels.map((label, index) => (
              <div key={index} className="w-full flex items-center text-[10px] mb-1">
                <div className="w-1 h-2 mr-1 flex-shrink-0" style={{ backgroundColor: colors[index] }}></div>
                <span className="font-medium min-w-[80px] text-left">{label}:</span>
                <span className="ml-2 text-gray-500 flex-1 text-left">
                  {((data[index] / totalAssets) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
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
