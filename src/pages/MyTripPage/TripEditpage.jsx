import { useEffect, useState } from "react"
import { ChevronLeft, Calendar, Flag, DollarSign } from "lucide-react"
import BackNavigation from "../../components/BackNavigation"
import Footer from "../../layout/Footer"

const TripEditPage = () => {
  const [openSection, setOpenSection] = useState(null)
  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null)
    } else {
      setOpenSection(section)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white">
    <BackNavigation />
      {/* Main Content */}
      <div className="flex-1 px-4 pb-20">
        <h1 className="text-2xl font-bold mb-4">목표를 수정할까요?</h1>

        {/* Goal Description */}
        <div className="mb-6 text-center">
          <p className="font-medium">
            <span className="font-bold text-blue-500">미국</span>
            으로 떠나기 위해</p>
          <p className="mt-1">
            <span className="font-medium">2025년 6월 1일</span> 까지{" "}
            <span className="font-bold text-blue-500">1,000,000원</span> 모아 보아요!
          </p>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        {/* Destination Section */}
        <div className="border-b border-gray-200">
          <div
            className="py-4 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("destination")}
          >
            <span className="text-gray-500">여행지</span>
            <div className="flex items-center">
              <span className="mr-2">미국</span>
              <span className="text-xl">🇺🇸</span>
            </div>
          </div>
          {openSection === "destination" && (
            <div className="pb-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <Flag size={20} className="mr-2" />
                  <span>여행지 선택</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button className="p-2 bg-blue-500 text-white rounded-lg flex flex-col items-center">
                    <span>🇺🇸</span>
                    <span>미국</span>
                  </button>
                  <button className="p-2 bg-white border border-gray-300 rounded-lg flex flex-col items-center">
                    <span>🇯🇵</span>
                    <span>일본</span>
                  </button>
                  <button className="p-2 bg-white border border-gray-300 rounded-lg flex flex-col items-center">
                    <span>🇪🇺</span>
                    <span>유럽</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Date Section */}
        <div className="border-b border-gray-200">
          <div className="py-4 flex justify-between items-center cursor-pointer" onClick={() => toggleSection("date")}>
            <span className="text-gray-500">기간</span>
            <div className="flex items-center">
              <span>2025년 6월 1일</span>
              <span className="ml-2 text-red-500">📅</span>
            </div>
          </div>
          {openSection === "date" && (
            <div className="pb-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <Calendar size={20} className="mr-2" />
                  <span>날짜 선택</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  <div className="text-red-500">일</div>
                  <div>월</div>
                  <div>화</div>
                  <div>수</div>
                  <div>목</div>
                  <div>금</div>
                  <div className="text-blue-500">토</div>
                  {/* Calendar days would go here */}
                  {Array.from({ length: 31 }, (_, i) => (
                    <div key={i} className={`p-2 ${i === 16 ? "bg-blue-500 text-white rounded-full" : ""}`}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Amount Section */}
        <div className="border-b border-gray-200">
          <div
            className="py-4 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("amount")}
          >
            <span className="text-gray-500">금액</span>
            <span>1,000,000원</span>
          </div>
          {openSection === "amount" && (
            <div className="pb-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <DollarSign size={20} className="mr-2" />
                  <span>금액 설정</span>
                </div>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg text-right"
                  defaultValue="1000000"
                />
                <div className="mt-2 text-right text-gray-500">원</div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <button className="w-full py-4 bg-blue-500 text-white rounded-lg font-medium">수정하기</button>
          <button className="w-full py-4 bg-gray-100 text-gray-700 rounded-lg font-medium">일괄 매도 하기</button>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default TripEditPage

