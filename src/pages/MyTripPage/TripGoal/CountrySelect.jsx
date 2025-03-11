import { useState } from "react";
import { ChevronDown } from "lucide-react";

const countryCodeMap = {
  "미국": "US",
  "캐나다": "CA",
  "프랑스": "FR",
  "이탈리아": "IT",
  "일본": "JP",
  "한국": "KR",
  "독일": "DE",
  "영국": "GB",
  "스페인": "ES",
  "중국": "CN",
  "호주": "AU",
  "멕시코": "MX",
  "인도": "IN",
  "브라질": "BR",
  "아르헨티나": "AR",
  "칠레": "CL",
  "이집트": "EG",
  "남아프리카공화국": "ZA",
  "이름없음": "UN"
};

// 국기 이미지 URL을 가져오는 함수
function getCountryFlagURL(countryName) {
  const countryCode = countryCodeMap[countryName] || "UN";
  return `https://flagsapi.com/${countryCode}/flat/64.png`;
}

export default function CountrySelect({ onSelect }) {
  const [openSection, setOpenSection] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const continents = [
    { id: "europe", name: "유럽" },
    { id: "asia", name: "아시아" },
    { id: "northAmerica", name: "북미" },
    { id: "southAmerica", name: "남미" },
    { id: "africa", name: "아프리카" },
  ];

  const countries = {
    europe: [
      { id: "france", name: "프랑스" },
      { id: "italy", name: "이탈리아" },
      { id: "germany", name: "독일" },
      { id: "spain", name: "스페인" },
      { id: "uk", name: "영국" }
    ],
    asia: [
      { id: "japan", name: "일본" },
      { id: "korea", name: "한국" },
      { id: "china", name: "중국" },
      { id: "india", name: "인도" }
    ],
    northAmerica: [
      { id: "usa", name: "미국" },
      { id: "canada", name: "캐나다" },
      { id: "mexico", name: "멕시코" }
    ],
    southAmerica: [
      { id: "brazil", name: "브라질" },
      { id: "argentina", name: "아르헨티나" },
      { id: "chile", name: "칠레" }
    ],
    africa: [
      { id: "egypt", name: "이집트" },
      { id: "southAfrica", name: "남아프리카공화국" }
    ]
  };

  function handleSelect(country) {
    setSelectedCountry(country.name);
    onSelect(country.name);
  }

  return (
    <div className="max-w-lg min-h-[70vh] bg-white px-4 flex flex-col mx-auto">
      <div className="flex flex-col gap-2 flex-grow">
        {continents.map((continent) => (
          <div key={continent.id} className="border-b border-gray-200">
            <button
              className="w-full flex justify-between items-center py-3 text-lg font-bold"
              onClick={() => setOpenSection(openSection === continent.id ? "" : continent.id)}
            >
              {continent.name}
              <ChevronDown className={`transition-transform ${openSection === continent.id ? "rotate-180" : ""}`} size={20} />
            </button>

            {openSection === continent.id && (
              <div className="py-1">
                {(countries[continent.id] || []).map((country) => (
                  <button
                    key={country.id}
                    className={`flex items-center py-2 gap-3 w-full text-left rounded-lg transition-all ${
                      selectedCountry === country.name ? "bg-gray-300" : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleSelect(country)}
                  >
                    <img
                      src={getCountryFlagURL(country.name)}
                      alt={country.name}
                      className="w-7 h-7 rounded-full"
                    />
                    <span className="text-md">{country.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
