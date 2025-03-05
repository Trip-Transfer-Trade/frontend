export default function CountrySelect({ onSelect }) {
    const continents = [
      { id: "europe", name: "유럽"},
      { id: "asia", name: "아시아"},
      { id: "northAmerica", name: "북미"},
      { id: "oceania", name: "오세아니아"},
    ];
  
    const countries = {
      asia: [{ id: "japan", name: "일본", flag: "🇯🇵" }, { id: "korea", name: "한국", flag: "🇰🇷" }],
      europe: [{ id: "france", name: "프랑스", flag: "🇫🇷" }, { id: "italy", name: "이탈리아", flag: "🇮🇹" }],
      northAmerica: [{ id: "usa", name: "미국", flag: "🇺🇸" }, { id: "canada", name: "캐나다", flag: "🇨🇦" }],
    };
  
    return (
      <div className="p-4">
        {continents.map((continent) => (
          <div key={continent.id}>
            <h2 className="text-lg font-bold">{continent.name}</h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {countries[continent.id]?.map((country) => (
                <button key={country.id} className="p-2 border rounded-lg text-center" onClick={() => onSelect(country.name)}>
                  <span className="text-xl">{country.flag}</span> {country.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  