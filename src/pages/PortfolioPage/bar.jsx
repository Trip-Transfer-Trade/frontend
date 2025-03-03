import { useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const getFoodImage = (amount) => {
    if (amount >= 1000000) return "src/assets/images/portfolio/steak.svg"
    if (amount >= 500000) return "src/assets/images/portfolio/pizza.svg"
    if (amount >= 100000) return "src/assets/images/portfolio/burger.svg"
    return "src/assets/images/portfolio/rice.svg"
  }
  ChartJS.register(ArcElement, Tooltip, Legend);

  const getLevel = (amount) => {
    if (amount >= 1000000) return 4
    if (amount >= 500000) return 3
    if (amount >= 100000) return 2
    return 1
  }
  
  
  const GoalCard = ({ currentAmount, targetAmount, daysLeft }) => {
    const persent = (currentAmount / targetAmount) * 100
    const level = getLevel(currentAmount)
    const foodImage = getFoodImage(currentAmount)
    const progressBarRef = useRef(null);
    useEffect(() => {
        const canvas = progressBarRef.current;
        if (!canvas) return;
    
        const ctx = canvas.getContext("2d");
        const progress = persent/ 100;
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
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-sm text-gray-600 mb-1">목표 금액 {targetAmount.toLocaleString()}원 중에서</p>
            <div className="flex items-center gap-2">
              <span className="text-blue-600 text-xl font-bold">{currentAmount.toLocaleString()}원</span>
              <span className="text-gray-600">을 모았어요!</span>
            </div>
          </div>
          <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">D-{daysLeft}</div>
        </div>
  
        {/* <div className="mb-4 bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div> */}
        <div className="mb-4 rounded-full h-2">
           <canvas ref={progressBarRef} width={300} height={30} className="w-full mt-2" />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-600">
            Lv. {level}
            <span className="ml-2">밥을 먹을 수 있는 단계</span>
          </div>
          <div className="w-6 h-6 relative">
            <img src={foodImage || "/placeholder.svg"} alt="Level food" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    )
  }
  
  export default GoalCard
  
  