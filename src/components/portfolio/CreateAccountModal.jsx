import { useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

export default function CreateAccountModal({ onClose }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-end justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50 z-40"
        onClick={onClose}
      ></div>

      <div className="relative bg-white p-6 rounded-t-2xl w-full pb-10 z-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">계좌가 필요해요!</h2>
          <button onClick={onClose}>
            <IoCloseOutline size={24} />
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          여행 목표를 관리하려면 계좌가 필요해요. <br />
          계좌를 생성하러 갈까요?
        </p>

        <button
          className="w-full bg-blue-500 text-white py-3 rounded-lg mt-4"
          onClick={() => navigate("/createAccount")}
        >
          계좌 개설하러 가기
        </button>
      </div>
    </div>
  );
}
