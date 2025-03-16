import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


const GoalCard = ({ trip }) => {
  const navigate = useNavigate();
  const progressRef = useRef(null);
  const percent = trip.goalAmount > 0 ? (trip.profit / trip.goalAmount) * 100 : 0;
  const [progressWidth, setProgressWidth] = useState();
  

  useEffect(() => {
    const canvas = progressRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const totalWidth = canvas.width;

    ctx.clearRect(0, 0, totalWidth, canvas.height);
    ctx.fillStyle = "#E5E7EB";
    ctx.fillRect(0, 10, totalWidth, 10);

    let currentWidth = 0;
    const targetWidth = totalWidth * (percent / 100);

    const animateProgress = () => {
      if (currentWidth < targetWidth) {
        currentWidth += 3;
        setProgressWidth(currentWidth);
        ctx.clearRect(0, 0, totalWidth, canvas.height);

        ctx.fillStyle = "#E5E7EB";
        ctx.fillRect(0, 10, totalWidth, 10);

        ctx.fillStyle = "#667EEA";
        ctx.fillRect(0, 10, currentWidth, 10);

        requestAnimationFrame(animateProgress);
      }
    };

    animateProgress();
  }, [percent]);

  const handleClick = () => {
    navigate(`/trip/${trip.tripId}/portfolio`);
  };

  const progressLabelStyle = {
    left: `${Math.max(5, Math.min(progressWidth, 270))}px`,
    transform:
      progressWidth === 0
        ? "translateX(10%)"
        : progressWidth >= 270
        ? "translateX(-90%)"
        : "translateX(-50%)",
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-2 border border-gray-200 cursor-pointer hover:shadow-md transition"
      onClick={handleClick}
    >
      <div className="flex flex-col mb-2">
        <p className="text-lg font-bold">{trip.name}</p>
        <p className="text-sm text-gray-600">
          {trip.goalAmount ? trip.goalAmount.toLocaleString() : 0}원에서{" "}
          <span className="text-blue-500 font-bold">
            {trip.profit ? trip.profit.toLocaleString() : 0}원
          </span> 모았어요!
        </p>
      </div>
      <div className="relative w-full mt-4 ">
        <canvas ref={progressRef} width={300} height={30} className="w-full" />
        <div
          className="absolute text-xs text-blue-500 bg-gray-50 px-1 py-1 rounded-md shadow-md"
          style={progressLabelStyle}
        >
          {percent.toFixed(1)}% 달성
        </div>
      </div>
      <div className="flex justify-end items-center gap-2">
        <p className="text-gray-500 text-xs mt-0">{trip.endDate}까지 모으는 중</p>
      </div>
    </div>
  );
};

export default GoalCard;
