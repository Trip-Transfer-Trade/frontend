import { useDrag } from "react-dnd";
import { Move } from "lucide-react"; // 아이콘 추가
import { TbHandClick } from "react-icons/tb";
export default function AccountCard({ account }) {
  const { accountNumber, balance, bankName = "신한" } = account; // 은행명 기본값 추가

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ACCOUNT_CARD",
    item: { accountNumber, balance },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-white rounded-xl py-5 px-6 shadow-md flex flex-col relative cursor-grab ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/assets/images/trip/ShinhanIcon.svg" alt="로그인" className="w-8 h-8" />
          <div>
            <p className="text-sm font-medium text-black">내 메인 계좌</p>
            <p className="text-xs text-gray-500">{bankName} {accountNumber}</p>
          </div>
        </div>
        <TbHandClick className="text-xl text-gray-400 cursor-pointer hover:text-gray-600" />
      </div>
      <div className="flex justify-end mt-2">
          <p className="text-xl font-semibold">{balance.toLocaleString()}원</p>
      </div>
    </div>
  );
}
