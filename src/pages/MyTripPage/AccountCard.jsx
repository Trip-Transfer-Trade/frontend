import { useDrag } from "react-dnd";
import { Move } from "lucide-react"; // 아이콘 추가

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
      className={`flex items-center justify-between p-4 rounded-xl shadow-md bg-white cursor-grab ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >

      <div className="flex items-center gap-4">
        <img
              src="/assets/images/main/shinhan.svg"
              alt="신한"
              className="w-8 h-8 mx-auto object-contain"
            />
        <div>
          <p className="text-sm font-semibold text-gray-700">내 메인 계좌</p>
          <p className="text-sm text-gray-500">{bankName} {accountNumber}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <p className="text-xl font-bold text-gray-900">{balance.toLocaleString()}원</p>
      </div>
    </div>
  );
}
