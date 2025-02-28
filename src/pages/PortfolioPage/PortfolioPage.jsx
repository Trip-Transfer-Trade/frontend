import { useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import BackNavigation from "../../components/BackNavigation";
import Footer from "../../layout/Footer";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioPage() {
  const progressBarRef = useRef(null);

  const portfolioData = {
    totalValue: 2510000,
    gain: 510000,
    gainPercentage: 70.5,
    allocation: [
      { name: "S&P500", percentage: 32.0, color: "#4FD1C5" },
      { name: "NVIDIA", percentage: 15.0, color: "#F56565" },
      { name: "TSGG", percentage: 22.0, color: "#2D3748" },
      { name: "TESLA", percentage: 8.0, color: "#F6E05E" },
      { name: "Microsoft", percentage: 23.0, color: "#667EEA" },
    ],
    details: [
      { label: "예수금", value: 230000 },
      { label: "매입금액", value: 2000000 },
      { label: "평가금액", value: 2740000 },
      { label: "환전가능금액", value: 510000 },
    ],
    holdings: [
      {
        id: "433330",
        name: "SOL 미국 S&P500",
        icon: "S",
        iconBg: "#3B82F6",
        quantity: 50,
        purchasePrice: 15212,
        currentPrice: 21324,
        gainPercentage: 40.18,
      },


    ],
  };

  const formatKoreanWon = (amount) => new Intl.NumberFormat("ko-KR").format(amount);

  const chartData = {
    labels: portfolioData.allocation.map((item) => item.name),
    datasets: [
      {
        data: portfolioData.allocation.map((item) => item.percentage),
        backgroundColor: portfolioData.allocation.map((item) => item.color),
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const canvas = progressBarRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const progress = portfolioData.gainPercentage / 100;
    let currentWidth = 0;
    const totalWidth = canvas.width;

    const animateProgress = () => {
      if (currentWidth < totalWidth * progress) {
        currentWidth += 3;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#E5E7EB";
        ctx.fillRect(0, 10, totalWidth, 10);

        ctx.fillStyle = "#667EEA";
        ctx.fillRect(0, 10, currentWidth, 10);

        requestAnimationFrame(animateProgress);
      }
    };

    animateProgress();
  }, []);

  return (
    
    <div className="max-w-md mx-auto p-4 min-h-screen font-sans">
    <BackNavigation text="여행 포트폴리오" />
      <div className="text-center mb-6">
        <p className="text-gray-700">목표금액 1,000,000원 중에서</p>
        <h1 className="text-lg font-bold text-blue-600">510,000원을 모았어요!!</h1>
        <canvas ref={progressBarRef} width={300} height={30} className="w-full mt-2" />
      </div>
      
      <div className="bg-white rounded-lg p-5 shadow-sm">
        <div className="text-gray-500">총 자산</div>
        <div className="text-2xl font-bold">₩{formatKoreanWon(portfolioData.totalValue)}</div>
        <div className="text-sm text-red-500">
          수익 {formatKoreanWon(portfolioData.gain)}원 ({portfolioData.gainPercentage}%)
        </div>
        <div className="flex justify-center my-4">
          <Doughnut data={chartData} />
        </div>
        <div>
          <p>투자하기</p>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-md font-semibold mb-2">세부 정보</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {portfolioData.details.map((detail, index) => (
            <div key={index} className="flex justify-between bg-white p-2 rounded-lg shadow">
              <span className="text-gray-500">{detail.label}</span>
              <span className="font-medium">{formatKoreanWon(detail.value)}원</span>
            </div>
          ))}
        </div>
      </div>
      
      <h2 className="text-md font-semibold mt-6">자산</h2>
      <Footer/>
    </div>
  );
}
