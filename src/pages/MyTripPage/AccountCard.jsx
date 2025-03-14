import { useDrag, useDrop } from "react-dnd";
import { TbHandClick } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import FormattedAccountNumber from "../../components/FormattedAccountNumber";


export default function AccountCard({ account }) {
  const navigate = useNavigate();
  const { amountNumber, totalAmountInKRW } = account; 
  const bankName = "신한";

  const displayName = account.isAccount ? "일반계좌" : account.name;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "account",
    item: { sourceType: "account", sourceId: account.accountId, account },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  

  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["trip", "account"],
    drop: (item) => {
      const destId = account.accountId;
      navigate(
        `/trip/transfer?sourceId=${item.sourceId}&sourceType=${item.sourceType}&destId=${destId}&destType=account`
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  

  return (
    <div
      ref={(node) => {
        drag(node);
        drop(node);
      }}
      className={`bg-white rounded-xl py-5 px-6 shadow-md flex flex-col relative cursor-grab ${
        isDragging ? "opacity-50" : "opacity-100"
      } ${isOver ? "border-2 border-blue-500" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/assets/images/trip/ShinhanIcon.svg"
            alt="신한"
            className="w-8 h-8"
          />
          <div>
            <p className="text-sm font-medium text-black">{displayName}</p>
            <p className="text-xs text-gray-500">
              {bankName} <FormattedAccountNumber accountNumber={amountNumber ?? "1234567891011"} />
            </p>
          </div>
        </div>
        <TbHandClick className="text-xl text-gray-400 cursor-pointer hover:text-gray-600" />
      </div>
      <div className="flex justify-end mt-2">
        <p className="text-xl font-semibold">
          {totalAmountInKRW.toLocaleString()}원
        </p>
      </div>
    </div>
  );
}
