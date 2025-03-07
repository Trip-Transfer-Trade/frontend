import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import BackNavigation from "../../components/BackNavigation";
import NextConfirmButton from "../../components/NextConfirmButton";
import { fetchTransaction } from "../../apis/exchanges";

export default function TransferConfirmPage() {
  const { accountNumber, memo, amount } = useSelector(
    (state) => state.transfer
  );
  const navigate = useNavigate();

  // Format number with commas
  const formatAmount = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Convert number to Korean representation (simplified version)
  const convertToKorean = (num) => {
    if (num === 0) return "0원";

    if (num >= 10000 && num < 100000000) {
      const man = Math.floor(num / 10000);
      const rest = num % 10000;
      return `${man}만${rest > 0 ? " " + rest : ""}원`;
    } else if (num >= 100000000) {
      const eok = Math.floor(num / 100000000);
      const manPart = Math.floor((num % 100000000) / 10000);
      const rest = num % 10000;
      return `${eok}억${manPart > 0 ? " " + manPart + "만" : ""}${
        rest > 0 ? " " + rest : ""
      }원`;
    }

    return num + "원";
  };

  const handleConfirm = async () =>{

    const transactionData = {
      accountId : 1,          
      amount: parseFloat(amount),  
      description: memo, 
      targetAccountNumber:accountNumber, 
      currencyCode :"KRW",
    };
    
    try{
      await fetchTransaction(transactionData);
      alert("송금을 완료하였습니다");
      navigate("/");
    } catch(error) {
      alert("송금 처리에 실패했습니다. 다시 시도해주세요.");
    } 
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <BackNavigation text="이체하기" />
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-center">이체 확인</h1>
      </div>
      {/* Content */}
      <div className="flex-1 p-6">
        {/* Amount Section */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold mb-2">{formatAmount(amount)}원</h2>
          <p className="text-gray-500">{convertToKorean(amount)}</p>
        </div>

        {/* Transfer Details */}
        <div className="space-y-4 border-t border-b border-gray-200 py-4">
          <div className="flex justify-between">
            <span className="text-gray-500">계좌번호</span>
            <span className="font-medium">
              {accountNumber || "계좌번호 없음"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">메모</span>
            <span className="font-medium">{memo || "메모 없음"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">이체 금액</span>
            <span className="font-medium">{formatAmount(amount)}원</span>
          </div>
        </div>
      </div>

      <div className="px-6 mb-10">
        <NextConfirmButton text="완료" onClick={() => handleConfirm()} />
      </div>
    </div>
  );
}
