import { useDrag, useDrop } from "react-dnd";
import { TbHandClick } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import FormattedAccountNumber from "../../components/FormattedAccountNumber";
import { MdOutlineError } from "react-icons/md";

export default function AccountCard({ account }) {
  const navigate = useNavigate();
  const { amountNumber, totalAmountInKRW, amount, amountUS, accountId } = account;
  const bankName = "신한";

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
    navigate("account/exchange", {
      state: { accountId, amount: amount || 0, amountUS: amountUS || 0 },
    });
  };

  return (
    <div ref={(node) => { drag(node); drop(node); }}
      className={`bg-white rounded-xl py-5 px-6 shadow-md flex flex-col relative cursor-pointer 
        ${isDragging ? "opacity-50" : "opacity-100"} ${isOver ? "border-2 border-blue-500" : ""}`}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/assets/images/trip/ShinhanIcon.svg" alt="신한" className="w-8 h-8" />
              <div>
                <p className="text-sm font-medium text-black">내 메인 계좌</p>
                <p className="text-xs text-black">
                  {bankName} <FormattedAccountNumber accountNumber={amountNumber ?? "1234567891011"} />
                </p>
              </div>
            </div>
            <TbHandClick className="text-xl text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
        </div>
        <div className="flex justify-end items-center mt-auto">
          <p className="text-xl font-semibold whitespace-nowrap">{totalAmountInKRW.toLocaleString()}원</p>
        </div>
        <div className="mt-1 flex items-center text-gray-400 text-sm cursor-pointer hover:text-blue-500"
             onClick={handleExchangeClick}>
          <MdOutlineError className="text-xs mr-1" />
          해외 주식 투자를 위해 환전해보아요
        </div>
      </div>
    </div>
  );
}