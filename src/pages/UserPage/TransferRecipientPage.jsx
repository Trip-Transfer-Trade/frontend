import { useDispatch, useSelector } from "react-redux";
import { setAccountNumber, setMemo } from "../../redux/transfer";
import { useNavigate } from "react-router-dom";
import { LuDelete } from "react-icons/lu";

import BackNavigation from "../../components/BackNavigation";

export default function TransferRecipientPage() {
  const dispatch = useDispatch();
  const { accountNumber, memo } = useSelector((state) => state.transfer);
  const navigate = useNavigate();

  const handleNumberClick = (number) => {
    dispatch(setAccountNumber(accountNumber + number));
  };

  const handleBackspace = () => {
    if (accountNumber.length > 0) {
      dispatch(setAccountNumber(accountNumber.slice(0, -1)));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <BackNavigation text="이체하기" />
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center mb-10">
          <img src="/assets/images/logo.svg" alt="Logo" className="logo" />
          <h1 className="text-lg font-bold">어떤 계좌로 입금할까요?</h1>
        </div>
        <div className="space-y-10">
          <input
            className="w-full outline-none border-b-2 border-brand-blue p-2"
            placeholder="계좌번호 입력"
            value={accountNumber}
            onChange={(e) => dispatch(setAccountNumber(e.target.value))}
            readOnly
          />
          <input
            className="w-full outline-none border-b-2 border-brand-blue p-2"
            placeholder="받는 분에게 표기"
            value={memo}
            onChange={(e) => dispatch(setMemo(e.target.value))}
          />
        </div>
      </div>

      {/* 공간 분리 */}
      <div className="flex-grow"></div>

      {/* 키패드 */}
      <button
        className="bg-brand-blue text-white py-4 text-center w-full"
        onClick={() => {
          if (!accountNumber) {
            alert("계좌번호를 입력해주세요.");
            return;
          }
          navigate("/mypage/transfer/amount");
        }}
      >
        확인
      </button>

      <div className="grid grid-cols-3 text-center text-xl py-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "00", 0].map((num, index) => (
          <button
            key={index}
            className="py-4"
            onClick={() => handleNumberClick(num.toString())}
          >
            {num}
          </button>
        ))}
        <button
          className="py-4 flex items-center justify-center"
          onClick={handleBackspace}
        >
          <LuDelete />
        </button>
      </div>
    </div>
  );
}
