import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CountrySelect({ onSelect }) {
  const [openSection, setOpenSection] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const continents = [
    { id: "europe", name: "유럽" },
    { id: "asia", name: "아시아" },
    { id: "northAmerica", name: "북미" },
  ];

  const countries = {
    europe: [
      { id: "france", name: "프랑스", flag: "🇫🇷" },
      { id: "italy", name: "이탈리아", flag: "🇮🇹" }
    ],
    asia: [
      { id: "japan", name: "일본", flag: "🇯🇵" },
      { id: "korea", name: "한국", flag: "🇰🇷" }
    ],
    northAmerica: [
      { id: "usa", name: "미국", flag: "🇺🇸" },
      { id: "canada", name: "캐나다", flag: "🇨🇦" }
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
                    <span className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full">
                      {country.flag}
                    </span>
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
