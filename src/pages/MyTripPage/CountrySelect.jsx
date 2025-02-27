import { useState } from "react"
import styles from "./CountrySelect.module.css"
import { Search, ChevronDown } from "lucide-react"
import BackNavigation from "../../components/BackNavigation"

export default function CountrySelect() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openSection, setOpenSection] = useState("")

  const continents = [
    { id: "europe", name: "유럽"},
    { id: "asia", name: "아시아"},
    { id: "northAmerica", name: "북미"},
    { id: "oceania", name: "오세아니아"},
  ]

  const countries = {
    europe: [
      { id: "nok", name: "노르웨이", code: "NOK", flag: "🇳🇴" },
      { id: "dkk", name: "덴마크", code: "DKK", flag: "🇩🇰" },
      { id: "eur", name: "유럽", code: "EUR", flag: "🇪🇺" },
      { id: "gbp", name: "영국", code: "GBP", flag: "🇬🇧" },
      { id: "nok", name: "노르웨이", code: "NOK", flag: "🇳🇴" },
      { id: "sek", name: "스웨덴", code: "SEK", flag: "🇸🇪" },
    ],
    asia: [
      { id: "aed", name: "아랍에미리트", code: "AED", flag: "🇦🇪" },
      { id: "bhd", name: "바레인", code: "BHD", flag: "🇧🇭" },
      { id: "bnd", name: "브루나이", code: "BND", flag: "🇧🇳" },
      { id: "cnh", name: "중국", code: "CNH", flag: "🇨🇳" },
      { id: "hkd", name: "홍콩", code: "HKD", flag: "🇭🇰" },
      { id: "idr", name: "인도네시아", code: "IDR", flag: "🇮🇩" },
      { id: "jpy", name: "일본", code: "JPY", flag: "🇯🇵" },
      { id: "krw", name: "대한민국", code: "KRW", flag: "🇰🇷" },
      { id: "kwd", name: "쿠웨이트", code: "KWD", flag: "🇰🇼" },
      { id: "myr", name: "말레이시아", code: "MYR", flag: "🇲🇾" },
      { id: "sar", name: "사우디", code: "SAR", flag: "🇸🇦" },
      { id: "sgd", name: "싱가포르", code: "SGD", flag: "🇸🇬" },
      { id: "thb", name: "태국", code: "THB", flag: "🇹🇭" },
    ],
    northAmerica: [
      { id: "cad", name: "캐나다", code: "CAD", flag: "🇨🇦" },
      { id: "usd", name: "미국", code: "USD", flag: "🇺🇸" },
    ],
    oceania: [
      { id: "aud", name: "호주", code: "AUD", flag: "🇦🇺" },
      { id: "nzd", name: "뉴질랜드", code: "NZD", flag: "🇳🇿" },
    ],
  }

  const quickSelect = [
    { id: "japan", name: "일본", flag: "🇯🇵" },
    { id: "usa", name: "미국", flag: "🇺🇸" },
    { id: "eu", name: "유럽", flag: "🇪🇺" },
  ]

  const toggleSection = (sectionId) => {
    setOpenSection(openSection === sectionId ? "" : sectionId)
  }

  return (
    <div className={styles["container"]}>
      <header className={styles["header"]}>
        <BackNavigation text="여행 국가 선택하기"/>
      </header>

      <div className={styles["search-container"]}>
        <input
          type="text"
          placeholder="국가명을 입력해 주세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles["search-input"]}
        />
        <Search className={styles["search-icon"]} size={20} />
      </div>

      <div className={styles["quick-select"]}>
        {quickSelect.map((country) => (
          <button key={country.id} className={styles["country-button"]}>
            <span className={styles["country-flag"]}>{country.flag}</span>
            <span className={styles["country-name"]}>{country.name}</span>
          </button>
        ))}
      </div>

      <div className={styles["continents-list"]}>
        {continents.map((continent) => (
          <div key={continent.id} className={styles["continent-section"]}>
            <button className={styles["continent-button"]} onClick={() => toggleSection(continent.id)}>
              {continent.name}
              <ChevronDown
                className={`${styles["chevron-icon"]} ${openSection === continent.id ? styles["rotate"] : ""}`}
                size={20}
              />
            </button>
            {openSection === continent.id && (
              <div className={styles["continent-content"]}>
                {countries[continent.id].map((country) => (
                  <div key={country.id} className={styles["country-item"]}>
                    <div className={styles["flag-container"]}>
                      <span className={styles["country-flag"]}>{country.flag}</span>
                    </div>
                    <span className={styles["country-name"]}>
                      {country.name} {country.code}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles["popular-banner"]}>
        <div className={styles["banner-content"]}>
          <img src="/src/assets/images/main/trip.svg" alt="여행지" className={styles["globe-icon"]}/>
          <div className={styles["banner-text"]}>
            <strong>인기 급상승</strong>
            <strong>여행지 Best 10</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

