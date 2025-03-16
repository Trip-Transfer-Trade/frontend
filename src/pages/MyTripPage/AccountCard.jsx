import { useDrag, useDrop } from "react-dnd";
import { TbHandClick } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import FormattedAccountNumber from "../../components/FormattedAccountNumber";
import { MdCurrencyExchange } from "react-icons/md";

export default function AccountCard({ account }) {
  const navigate = useNavigate();
  const { amountNumber, totalAmountInKRW, amount, amountUS, accountId } = account;
  const bankName = "신한";
  const displayName = account.isAccount ? "일반계좌" : account.name;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "account",
    item: { sourceType: "account", sourceId: accountId, account },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["trip", "account"],
    drop: (item) => {
      navigate(`/trip/transfer?sourceId=${item.sourceId}&sourceType=${item.sourceType}&destId=${accountId}&destType=account`);
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));

  const handleExchangeClick = () => {
    console.log("📢 Navigating to exchange with account:", account);
    navigate("account/exchange", {
      state: { accountId, amount: amount || 0, amountUS: amountUS || 0 },
    });
  };

  return (
    <div ref={(node) => { drag(node); drop(node); }}
      className={`bg-white rounded-xl py-5 px-6 shadow-md flex flex-col relative cursor-pointer 
        ${isDragging ? "opacity-50" : "opacity-100"} ${isOver ? "border-2 border-blue-500" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/assets/images/trip/ShinhanIcon.svg" alt="신한" className="w-8 h-8" />
          <div>
            <p className="text-sm font-medium text-black">{displayName}</p>
            <p className="text-xs text-gray-500">
              {bankName} <FormattedAccountNumber accountNumber={amountNumber ?? "1234567891011"} />
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <TbHandClick className="text-xl text-gray-400 cursor-pointer hover:text-gray-600" />
          <MdCurrencyExchange onClick={handleExchangeClick}
            className="text-2xl text-gray-300 cursor-pointer transition-colors duration-300 hover:text-blue-700 mt-2"
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <p className="text-xl font-semibold">{totalAmountInKRW.toLocaleString()}원</p>
      </div>
    </div>
  );
}
