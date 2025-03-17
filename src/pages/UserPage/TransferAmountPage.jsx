import { useDispatch, useSelector } from "react-redux";
import { setAmount } from "../../redux/transfer";
import { useNavigate , useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import { LuDelete } from "react-icons/lu";

import BackNavigation from "../../components/BackNavigation";

export default function TransferAmountPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { amount} = useSelector((state) => state.transfer) || 0;
  const navigate = useNavigate();
  const [koreanAmount, setKoreanAmount] = useState("");
  const myAmount = location.state.amount || 0;
  const accountId = location?.state.id;
  console.log(myAmount);
  const formatAmount = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const convertToKorean = (num) => {
    if (num === 0) return "0원";

    const units = ["", "만", "억", "조"];
    const digits = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
    const tenUnits = ["", "십", "백", "천"];

    let result = "";
    let unitIndex = 0;

    while (num > 0) {
      let segment = num % 10000;
      let segmentText = "";

      for (let i = 0; i < 4; i++) {
        const digit = segment % 10;
        if (digit !== 0) {
          segmentText = digits[digit] + tenUnits[i] + segmentText;
        }
        segment = Math.floor(segment / 10);
      }

      if (segmentText !== "") {
        result = segmentText + units[unitIndex] + result;
      }

      unitIndex++;
      num = Math.floor(num / 10000);
    }

    return result + "원";
  };

  const handleKeypadInput = (value) => {
    let newAmount;

    if (value === "backspace") {
      newAmount = Math.floor(amount / 10);
    } else if (value === "00") {
      newAmount = amount * 100;
    } else {
      newAmount = amount * 10 + Number.parseInt(value);
    }
    console.log(newAmount,myAmount)
    const parsedMyAmount = Number(myAmount.replace("원", "").replace(/,/g, "").trim()) || 0;


    if (newAmount > parsedMyAmount) {
      alert(`최대 ${myAmount.toLocaleString()}까지 입력할 수 있습니다.`);
      newAmount =  parsedMyAmount; // 초과하면 최대 금액으로 설정
    }

    dispatch(setAmount(newAmount));
  };

  useEffect(() => {
    setKoreanAmount(convertToKorean(amount));
  }, [amount]);

  return (
    <div className="flex flex-col h-screen bg-white">
      <BackNavigation text="이체하기" />
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-2">{formatAmount(amount)}원</h1>
        <p className="text-gray-500">{koreanAmount}</p>
      </div>

      {/* 키패드 */}
      <button
        onClick={() => navigate("/mypage/transfer/confirm" , {state : {accountId : accountId}})}
        className="bg-brand-blue text-white py-4 text-center w-full"
      >
        확인
      </button>

      <div className="grid grid-cols-3 text-center text-xl py-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "00", 0].map((num, index) => (
          <button
            key={index}
            onClick={() => handleKeypadInput(num)}
            className="py-4"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleKeypadInput("backspace")}
          className="py-4 flex items-center justify-center"
        >
          <LuDelete />
        </button>
      </div>
    </div>
  );
}
