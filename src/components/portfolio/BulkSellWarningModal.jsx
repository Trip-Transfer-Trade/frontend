import { useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

import NextConfirmButton from "../NextConfirmButton";
import { fetchBulkSell } from "../../apis/exchanges";

export default function BulkSellWarningModal({ onClose, tripId }) {
  const navigate = useNavigate();
  //일괄 매도하기 
  const handleButtonClick = async (tripId) =>{
    try{
      await fetchBulkSell(tripId);
    } catch(error){
      console.error("일괄 매도 실패", error)
    }
    navigate(`/trip/${tripId}/sell`);
  }

  return (
    <div className="fixed inset-0 flex items-end justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50 z-40"
        onClick={onClose}
      ></div>

      <div className="relative bg-white p-6 rounded-t-2xl w-full pb-10 z-50">
        <div className="flex justify-between items-center mb-4">
          <img
            src="/assets/images/alarm/warning.svg"
            className="absolute top-[-50px]"
          />
          <span></span>
          <button onClick={onClose}>
            <IoCloseOutline size={24} />
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-bold">일괄 매도하기</h2>
          <p className="mb-2">
            하단의 버튼을 누르시면 <br />
            현재 목표에 해당하는 종목들이 일괄 매도됩니다.
          </p>
        </div>

        <div className="flex justify-center text-red-500 text-sm mb-2">
          <span>⚠ 일괄 매도 진행 시 되돌릴 수 없습니다.</span>
        </div>

        <NextConfirmButton
          text={"일괄 매도하기"}
          onClick={() => {handleButtonClick(tripId)}}
        />
      </div>
    </div>
  );
}
