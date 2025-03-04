import { useEffect, useState } from "react";
import { ChevronLeft, Calendar, Flag, DollarSign } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateDestination, updateTargetAmount, updateTargetDate } from "../../redux/store";
import BackNavigation from "../../components/BackNavigation";
import Footer from "../../layout/Footer";

const TripEditPage = () => {
  const dispatch = useDispatch();
  const trip = useSelector((state) => state.trip);
  const [openSection, setOpenSection] = useState(null);
  const [newAmount, setNewAmount] = useState(trip.targetAmount);
  const [newDate, setNewDate] = useState(trip.targetDate);
  const [newDestination, setNewDestination] = useState(trip.destination);

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  const handleUpdate = () => {
    dispatch(updateDestination(newDestination));
    dispatch(updateTargetAmount(Number(newAmount)));
    dispatch(updateTargetDate(newDate));
    alert("목표가 성공적으로 수정되었습니다!");
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <BackNavigation />
      <div className="flex-1 px-4 pb-20">
        <h1 className="text-2xl font-bold mb-4">목표를 수정할까요?</h1>

        {/* Goal Description */}
        <div className="mb-6 text-center">
          <p className="font-medium">
            <span className="font-bold text-blue-500">{trip.destination}</span>
            으로 떠나기 위해
          </p>
          <p className="mt-1">
            <span className="font-medium">{trip.targetDate}</span> 까지{" "}
            <span className="font-bold text-blue-500">{trip.targetAmount.toLocaleString()}원</span> 모아 보아요!
          </p>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        {/* Destination Section */}
        <div className="border-b border-gray-200">
          <div className="py-4 flex justify-between items-center cursor-pointer" onClick={() => toggleSection("destination")}>
            <span className="text-gray-500">여행지</span>
            <div className="flex items-center">
              <span className="mr-2">{trip.destination}</span>
              <span className="text-xl">🇺🇸</span>
            </div>
          </div>
          {openSection === "destination" && (
            <div className="pb-4 bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <Flag size={20} className="mr-2" />
                <span>여행지 선택</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["미국", "일본", "유럽"].map((dest) => (
                  <button
                    key={dest}
                    className={`p-2 rounded-lg flex flex-col items-center ${
                      newDestination === dest ? "bg-blue-500 text-white" : "bg-white border border-gray-300"
                    }`}
                    onClick={() => setNewDestination(dest)}
                  >
                    <span>{dest === "미국" ? "🇺🇸" : dest === "일본" ? "🇯🇵" : "🇪🇺"}</span>
                    <span>{dest}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Date Section */}
        <div className="border-b border-gray-200">
          <div className="py-4 flex justify-between items-center cursor-pointer" onClick={() => toggleSection("date")}>
            <span className="text-gray-500">기간</span>
            <div className="flex items-center">
              <span>{trip.targetDate}</span>
              <span className="ml-2 text-red-500">📅</span>
            </div>
          </div>
          {openSection === "date" && (
            <div className="pb-4 bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <Calendar size={20} className="mr-2" />
                <span>날짜 선택</span>
              </div>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Amount Section */}
        <div className="border-b border-gray-200">
          <div className="py-4 flex justify-between items-center cursor-pointer" onClick={() => toggleSection("amount")}>
            <span className="text-gray-500">금액</span>
            <span>{trip.targetAmount.toLocaleString()}원</span>
          </div>
          {openSection === "amount" && (
            <div className="pb-4 bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <DollarSign size={20} className="mr-2" />
                <span>금액 설정</span>
              </div>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg text-right"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
              />
              <div className="mt-2 text-right text-gray-500">원</div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <button className="w-full py-4 bg-blue-500 text-white rounded-lg font-medium" onClick={handleUpdate}>
            수정하기
          </button>
          <button className="w-full py-4 bg-gray-100 text-gray-700 rounded-lg font-medium">
            일괄 매도 하기
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TripEditPage;
