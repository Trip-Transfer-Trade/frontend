import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateTrip } from "../../redux/tripSlice";
import BackNavigation from "../../components/BackNavigation";
import Footer from "../../layout/Footer";
import CountrySelect from "../MyTripPage/TripGoal/CountrySelect"; 

const countryCodeMap = {
  "미국": "US", "캐나다": "CA", "프랑스": "FR", "이탈리아": "IT", "일본": "JP",
  "한국": "KR", "독일": "DE", "영국": "GB", "스페인": "ES", "중국": "CN",
  "호주": "AU", "멕시코": "MX", "인도": "IN", "브라질": "BR", "아르헨티나": "AR",
  "칠레": "CL", "이집트": "EG", "남아프리카공화국": "ZA", "이름없음": "UN"
};

const TripEditPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedTrip = useSelector((state) => state.trip.selectedTrip);

  const [newName, setNewName] = useState(selectedTrip?.name || "");
  const [newAmount, setNewAmount] = useState(selectedTrip?.goalAmount || 0);
  const [newDate, setNewDate] = useState(selectedTrip?.endDate || "");
  const [newCountry, setNewCountry] = useState(selectedTrip?.country || "");
  const [showCountrySelect, setShowCountrySelect] = useState(false);
  const [editingField, setEditingField] = useState(null);

  useEffect(() => {
    if (selectedTrip) {
      setNewName(selectedTrip.name);
      setNewAmount(selectedTrip.goalAmount);
      setNewDate(selectedTrip.endDate);
      setNewCountry(selectedTrip.country);
    }
  }, [selectedTrip]);

  const formatCurrency = (amount) => amount.toLocaleString() + "원";
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const handleUpdate = async () => {
    if (!tripId) return;

    const updatedData = {
      name: newName,
      goalAmount: Number(newAmount),
      endDate: newDate,
      country: newCountry,
    };

    try {
      await dispatch(updateTrip({ tripId, updatedData })).unwrap();
      alert("목표가 성공적으로 수정되었습니다!");
      navigate(`/trip/${tripId}/portfolio/progress`);
    } catch (error) {
      alert("목표 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white px-6"> {/* ✅ 전체 패딩 조정 */}
      <div className="pt-6">
        <BackNavigation />
      </div>

      <div className="flex-1 px-2 pb-20">
        <h1 className="text-2xl font-bold mb-6">목표를 수정할까요?</h1>

        <div className="mb-8 text-center">
          <p className="font-medium">
            <span className="text-blue-600 font-bold">{newCountry}</span> 으로 떠나기 위해
          </p>
          <p className="font-medium">
            <span className="text-blue-600 font-bold">{newDate}</span> 까지 <span className="text-blue-600 font-bold">{formatCurrency(newAmount)}</span>을 모아 보아요!
          </p>
        </div>

        {/* 여행 이름 수정 */}
        <div
          className="border-b border-gray-200 py-4 px-2 flex justify-between items-center"
          onClick={() => setEditingField("name")}
        >
          <span className="text-gray-500">이름</span>
          {editingField === "name" ? (
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md text-right"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={() => setEditingField(null)}
            />
          ) : (
            <span className="font-medium">{newName}</span>
          )}
        </div>

        {/* 여행지 수정 */}
        <div className="border-b border-gray-200 py-4 px-2 flex justify-between items-center">
          <span className="text-gray-500">여행지</span>
          <button
            className="flex items-center gap-2"
            onClick={() => setShowCountrySelect(true)}
          >
            {newCountry && (
              <img
                src={`https://flagsapi.com/${countryCodeMap[newCountry] || "UN"}/flat/64.png`}
                alt={newCountry}
                className="w-6 h-6"
              />
            )}
            <span className="font-medium">{newCountry || "여행지를 선택하세요"}</span>
          </button>

          {showCountrySelect && (
            <div className="absolute inset-0 bg-white z-10 p-4">
              <CountrySelect
                onSelect={(selected) => {
                  setNewCountry(selected);
                  setShowCountrySelect(false);
                }}
              />
            </div>
          )}
        </div>

        {/* 기간 수정 */}
        <div
          className="border-b border-gray-200 py-4 px-2 flex justify-between items-center"
          onClick={() => setEditingField("date")}
        >
          <span className="text-gray-500">기간</span>
          {editingField === "date" ? (
            <input
              type="date"
              className="p-2 border border-gray-300 rounded-md"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              onBlur={() => setEditingField(null)}
            />
          ) : (
            <span className="font-medium">{formatDate(newDate)}</span>
          )}
        </div>

        {/* 금액 수정 */}
        <div
          className="border-b border-gray-200 py-4 px-2 flex justify-between items-center"
          onClick={() => setEditingField("amount")}
        >
          <span className="text-gray-500">금액</span>
          {editingField === "amount" ? (
            <input
              type="number"
              className="p-2 border border-gray-300 rounded-md text-right"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              onBlur={() => setEditingField(null)}
            />
          ) : (
            <span className="font-medium">{formatCurrency(newAmount)}</span>
          )}
        </div>

        {/* 버튼 */}
        <div className="mt-10 space-y-3"> {/* ✅ 버튼 간격 조정 */}
          <button
            className="w-full py-3 bg-blue-500 hover:bg-gray-600 text-white rounded-lg font-medium"
            onClick={handleUpdate}
          >
            수정하기
          </button>
          <button className="w-full py-3 bg-gray-100 hover:bg-gray-300 text-gray-500 rounded-lg font-medium">
            일괄 매도 하기
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TripEditPage;
