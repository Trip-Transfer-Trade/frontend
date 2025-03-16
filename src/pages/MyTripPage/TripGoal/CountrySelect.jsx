import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

import { countryNameToCountryCodeMap } from "../../../constants/countryMappings";
import InputField from "../../../components/InputField";

// 국기 이미지 URL을 가져오는 함수
function getCountryFlagURL(countryName) {
  if (countryName === "유럽연합") {
    return "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg";
  }
  const countryCode = countryNameToCountryCodeMap[countryName] || "UN";
  return `https://flagsapi.com/${countryCode}/flat/64.png`;
}

export default function CountrySelect({ onSelect }) {
  const [openSection, setOpenSection] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const continents = [
    { id: "europe", name: "유럽" },
    { id: "asia", name: "아시아" },
    { id: "northAmerica", name: "북미" },
    { id: "oceania", name: "오세아니아" },
  ];

  const countries = {
    europe: [
      { id: "switzerland", name: "스위스" },
      { id: "denmark", name: "덴마아크" },
      { id: "eu", name: "유럽연합" },
      { id: "uk", name: "영국" },
      { id: "norway", name: "노르웨이" },
      { id: "sweden", name: "스웨덴" },
    ],
    asia: [
      { id: "uae", name: "아랍에미리트" },
      { id: "bahrain", name: "바레인" },
      { id: "brunei", name: "브루나이" },
      { id: "china", name: "중국" },
      { id: "hongkong", name: "홍콩" },
      { id: "indonesia", name: "인도네시아" },
      { id: "japan", name: "일본" },
      { id: "korea", name: "대한민국" },
      { id: "kuwait", name: "쿠웨이트" },
      { id: "malaysia", name: "말레이지아" },
      { id: "saudi", name: "사우디" },
      { id: "singapore", name: "싱가포르" },
      { id: "thailand", name: "태국" },
    ],
    northAmerica: [
      { id: "usa", name: "미국" },
      { id: "canada", name: "캐나다" },
    ],
    oceania: [
      { id: "australia", name: "호주" },
      { id: "newzealand", name: "뉴질랜드" },
    ],
  };

  function handleSelect(country) {
    setSelectedCountry(country.name);
    onSelect(country.name);
  }

  const navigate = useNavigate();

  return (
    <div className="bg-white flex flex-col mx-auto">
      <p className="text-xl font-bold mb-6">여행 국가를 선택해주세요</p>
      <div className="flex flex-col flex-grow">
        {continents.map((continent) => (
          <div key={continent.id} className="border-b border-gray-300">
            <button
              className="w-full px-2 py-4 flex justify-between items-center text-lg font-bold"
              onClick={() =>
                setOpenSection(openSection === continent.id ? "" : continent.id)
              }
            >
              {continent.name}
              <ChevronDown
                className={`transition-transform ${
                  openSection === continent.id ? "rotate-180" : ""
                }`}
                size={20}
              />
            </button>

            {openSection === continent.id && (
              <div className="px-4 pb-4">
                {(countries[continent.id] || []).map((country) => (
                  <button
                    key={country.id}
                    className={`flex items-center py-2 gap-2 w-full text-left rounded-lg transition-all ${
                      selectedCountry === country.name
                        ? "bg-gray-300"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleSelect(country)}
                  >
                    <img
                      src={getCountryFlagURL(country.name)}
                      alt={country.name}
                      className="h-5"
                      style={{
                        objectFit: "cover", // 국기 크기를 동일하게 조절
                        aspectRatio: "4 / 3", // 비율 유지 (EU 국기와 다른 국기 통일)
                      }}
                    />
                    <span className="text-md">{country.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-16 flex justify-center items-center bg-custom-gray-1 p-4 rounded-2xl w-full space-x-4">
        <img
          src="/assets/images/main/trip.svg"
          alt="Trending Travel Icon"
          className="w-8"
        />
        <div
          onClick={() => {
            navigate("/destination");
          }}
          className="text-black font-semibold text-sm flex flex-col items-center"
        >
          <p>인기 급상승</p>
          <p>여행지 Best 10</p>
        </div>
      </div>
    </div>
  );
}
