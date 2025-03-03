import { useEffect, useRef } from "react";

const getFoodImage = (amount) => {
  if (amount >= 1000000) return "/src/assets/images/portfolio/steak.svg";
  if (amount >= 500000) return "/src/assets/images/portfolio/pizza.svg";
  if (amount >= 100000) return "/src/assets/images/portfolio/burger.svg";
  return "/src/assets/images/portfolio/rice.svg";
};

const getLevel = (amount) => {
  if (amount >= 1000000) return 4;
  if (amount >= 500000) return 3;
  if (amount >= 100000) return 2;
  return 1;
};

const GoalCard = ({ currentAmount, targetAmount, daysLeft }) => {
  const progressRef = useRef(null);
  const percent = (currentAmount / targetAmount) * 100;
  const level = getLevel(currentAmount);
  const foodImage = getFoodImage(currentAmount);

  useEffect(() => {
    const canvas = progressRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let currentWidth = 0;
    const totalWidth = canvas.width;

    const animateProgress = () => {
      if (currentWidth < totalWidth * (percent / 100)) {
        currentWidth += 3;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#E5E7EB";
        ctx.fillRect(0, 10, totalWidth, 10);
        ctx.fillStyle = "#667EEA";
        ctx.fillRect(0, 10, currentWidth, 10);
        requestAnimationFrame(animateProgress);
      }
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    animateProgress();

    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [percent]);

  return (
    <div className="bg-white rounded-lg p-4 mb-4 border border-gray-100">
      <canvas ref={progressRef} width={300} height={30} className="w-full mt-2" />
      <div className="flex items-center gap-2">
        <div className="text-sm text-gray-600">
          Lv. {level} <span className="ml-2">밥을 먹을 수 있는 단계</span>
        </div>
        <img src={foodImage} alt="Level food" className="w-6 h-6 object-contain" />
      </div>
    </div>
  );
};

export default GoalCard;
