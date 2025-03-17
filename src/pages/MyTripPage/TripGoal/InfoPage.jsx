import { X } from "lucide-react"
import { useNavigate } from "react-router-dom";

export default function ExchangeInfo() {
  const navigate = useNavigate();

  const handleBack = () => {
            console.log('이전')
            navigate(-1); // 이전 페이지로 이동
        };
        
  return (
<div className="min-h-screen p-6 flex flex-col">
      <button className="absolute right-4 top-4">
        <X className="w-6 h-6 text-[#8b95a1]"onClick={handleBack} />
      </button>

      {/* Header with logo and title */}
      <div className="flex items-center gap-4 mt-12 mb-8">
          <img 
            src="/assets/images/logo.svg"
            alt="TTT Logo"
            className="w-16 "
          />
        <div>
          <h1 className="text-[16px] font-medium leading-relaxed pr-20">TTT에서 매도와 환전을 도와드려요</h1>
        </div>
      </div>

      {/* First info card */}
      <div className="bg-[#eef3ff] rounded-xl p-7 mb-12 leading-relaxed">
        <h2 className="text-[16px] font-medium mb-4">자동 매도란?</h2>

        <p className="text-[#62626c] text-[13px] mb-4">
          지금까지 구매한 주식들을 <span className="text-blue-500 font-medium">자동으로 매도</span>해 드려요.
        </p>

        <p className="text-[#62626c] text-[13px] mb-4">
          오늘 판매한 해외 종목은 <span className="text-blue-500 font-medium">2영업일 뒤</span>에 원화로 바꾸거나 출금할
          수 있어요.(미국 영업일 기준)
        </p>

        <p className="text-[#62626c] text-[13px]">
          당일 환전이 필요한 경우, <span className="text-blue-500 font-medium">즉시 환전 서비스</span>를 통해 수익을
          바로 환전할 수 있어요.
        </p>
      </div>

      {/* Second info card */}
      <div className="bg-[#eef3ff] rounded-xl p-7 leading-relaxed">
        <h2 className="text-[16px] font-medium mb-4">즉시 환전이란?</h2>

        <p className="text-[#62626c] mb-4 text-[13px]">
          수익금을 <span className="text-blue-500  font-medium">자동으로 환전</span>해 드려요.
        </p>

        <p className="text-[#62626c] mb-4 text-[13px]">
          즉시 환전으로 환전된 금액은 <span className="text-blue-500 font-medium">환전 지갑</span>에서 볼 수 있어요.
        </p>

        <p className="text-[#62626c] text-[13px]">
          환전까지 이루어진 목표는 <span className="text-blue-500 font-medium">과거 여행</span>에서 확인할 수 있어요.
        </p>
      </div>
    </div>
  )
}

