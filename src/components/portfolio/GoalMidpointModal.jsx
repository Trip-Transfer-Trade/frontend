import { useNavigate, useParams } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

import NextConfirmButton from "../NextConfirmButton";

export default function GoalMidpointModal({ onClose }) {
  const navigate = useNavigate();
  const { tripId } = useParams();

  return (
    <div className="fixed inset-0 flex items-end justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50 z-40"
        onClick={onClose}
      ></div>

      <div className="relative bg-white p-6 rounded-t-2xl w-full pb-10 z-50">
        <div className="flex justify-between items-center mb-4">
          <img
            src="/assets/images/alarm/bell.svg"
            className="absolute top-[-30px]"
          />
          <span></span>
          <button onClick={onClose}>
            <IoCloseOutline size={24} />
          </button>
        </div>

        <h2 className="text-lg font-bold">목표 기간의 절반이 지났어요!</h2>
        <p className="text-gray-600 mb-2">
          목표 달성을 위해 맞춤형 포트폴리오 <br />
          추천을 받아볼까요?
        </p>

        {/* 하단 아이콘 */}
        <div className="relative flex items-center w-full h-8 mb-4">
          <img
            src="/assets/images/alarm/megaphone.svg"
            className="absolute right-6"
          />
        </div>

        <NextConfirmButton
          text={"추천 받으러 가기"}
          onClick={() => navigate(`/trip/${tripId}/portfolio/rank`)}
        />
      </div>
    </div>
  );
}
