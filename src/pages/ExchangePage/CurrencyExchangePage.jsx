import { useState } from "react";

import BackNavigation from "../../components/BackNavigation";

export default function CurrencyExchangePage() {
  const [showChart, setShowChart] = useState(false);
  const [amount, setAmount] = useState("");

  return (
    <div className="flex flex-col">
      <BackNavigation text="환전하기" />

      <div>
        {/* 금액 입력 섹션 */}
        <div className="px-6 space-y-10">
          {/* 환전 전 통화 섹션 */}
          <div>
            <div className="flex items-center space-x-2">
              <img
                src={`https://flagsapi.com/KR/flat/64.png`}
                alt={`KR flag`}
                className="h-10"
              />
              <span className="text-lg font-bold">대한민국 원</span>
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              className="w-full text-lg text-custom-gray-3 font-bold outline-none"
              placeholder="환전할 금액을 입력해 주세요."
            />
            <p className="text-custom-gray-3 text-sm">
              환전 가능 금액 510,000원
            </p>
          </div>

          {/* 환전 후 통화 섹션 */}
          <div>
            <div className="flex items-center space-x-2">
              <img
                src={`https://flagsapi.com/US/flat/64.png`}
                alt={`US flag`}
                className="h-10"
              />
              <span className="text-lg font-bold">미국 달러</span>
            </div>
            <p className="text-lg font-bold">0원</p>
            <p className="text-custom-gray-3 text-sm">1달러 = 1,439.60원</p>
          </div>
        </div>

        {/* 환율 차트 보기 */}
        <div className="w-full my-10">
          {/* 환율 차트 보기 버튼 */}
          <button
            onClick={() => setShowChart(!showChart)}
            className="relative flex items-center justify-center w-full text-custom-gray-3 text-sm"
          >
            <span className="relative px-4 bg-custom-gray-2 rounded-full z-10">
              환율 차트 보기
            </span>
            <div className="absolute left-0 right-0 top-[calc(50%-2px)] h-[4px] bg-custom-gray-2 z-0"></div>
          </button>

          {/* 차트 영역 */}
          {showChart && (
            <div className="p-6">
              <p className="text-center">환율 차트</p>
            </div>
          )}
        </div>

        {/* 환전 카드 */}
        <div></div>
      </div>
    </div>
  );
}
