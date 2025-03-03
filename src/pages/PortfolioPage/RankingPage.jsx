import BackNavigation from "../../components/BackNavigation"
import Footer from "../../layout/Footer"
import RankingItem from "./RankingItem"

export default function RankingPage() {
  const rankingData = [
    {
      id: 1,
      rank: 1,
      name: "김신한",
      profit: "+123,323원",
      percentage: "(32.3%)",
      color: "#4F80FF", // 파란색
    },
    {
      id: 2,
      rank: 2,
      name: "김신한",
      profit: "+123,323원",
      percentage: "(32.3%)",
      color: "#9F7AEA", // 보라색
    },
    {
      id: 3,
      rank: 3,
      name: "김신한",
      profit: "+123,323원",
      percentage: "(32.3%)",
      color: "#ED8936", // 주황색
    },
  ]
  return (
    <div className="flex flex-col min-h-screen ">
      <BackNavigation/>
      <h1 className="text-xl font-bold mb-2 text-center">
                투자를 도와줄
                <br />
                수익률 TOP 랭킹!
              </h1>
              <p className="text-sm text-gray-500 text-center">
                나와 비슷한 목표의 높은 수익률을 가진
                <br />
                사용자의 투자 포트폴리오를 확인해보세요
              </p>
        
              <div className="flex justify-center my-8">
                <img
                  src="/src/assets/images/portfolio/trp.svg"
                  alt="Trophy"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div>
              <div style={{ padding: "24px" }}>
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "24px",
                  }}
                >
                  TOP 포트폴리오
                </h2>

                <div>
                  {rankingData.map((item) => (
                    <RankingItem
                      key={item.id}
                      rank={item.rank}
                      name={item.name}
                      profit={item.profit}
                      percentage={item.percentage}
                      color={item.color}
                      />
                    ))}
                  </div>
                </div>
              </div>
      <Footer/>
    </div>
  )
}