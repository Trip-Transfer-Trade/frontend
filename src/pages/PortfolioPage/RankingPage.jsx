import Footer from "../../layout/Footer"
import RankingItem from "./RankingList"
import RankingHeader from "./Rankingtrp"


export default function RankingPage() {
  return (
    <div className="flex flex-col min-h-screen ">
      <RankingHeader/>

      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto pb-16">
          <RankingItem/>
        </div>
      </main>

      <Footer/>
    </div>
  )
}