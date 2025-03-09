import { useEffect, useRef, useState } from "react";


const GoalCard = ({ goalAmount, profit, endDate }) => {
  const progressRef = useRef(null);
  const percent = goalAmount > 0 ? (profit / goalAmount) * 100 : 0;
  const [progressWidth, setProgressWidth] = useState();
  

  useEffect(() => {
    const canvas = progressRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let currentWidth = 0;
    const totalWidth = canvas.width;

    const animateProgress = () => {
      if (currentWidth < totalWidth * (percent / 100)) {
        currentWidth += 3;
        setProgressWidth(currentWidth); 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#E5E7EB";
        ctx.fillRect(0, 10, totalWidth, 10);
        ctx.fillStyle = "#667EEA";
        ctx.fillRect(0, 10, currentWidth, 10);
        requestAnimationFrame(animateProgress);
      }
    };
    animateProgress();

    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [percent]);

  return (
    <div className="bg-white rounded-lg p-4 mb-2 border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-sm text-gray-600 ">목표 금액 {goalAmount ? goalAmount.toLocaleString() : 0}원 중에서</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">{profit ? profit.toLocaleString() : 0}원을 모았어요!</span>
          </div>
        </div>
      </div>
      <div className="relative w-full mt-6 ">
        <canvas ref={progressRef} width={300} height={30} className="w-full" />
        <div
          className="absolute top-[-20px] text-xs text-blue-500 bg-gray-50 px-1 py-1 rounded-md shadow-md"
          style={{ left: `${Math.min(progressWidth, 270)}px`, transform: "translateX(-50%)" }}
        >
          {percent.toFixed(1)}% 달성
        </div>
      </div>
      <div className="flex justify-end items-center gap-2">
        <p className="text-gray-500 text-xs mt-0">{endDate}까지 모으는 중</p>
      </div>
    </div>
  );
};

export default GoalCard;
