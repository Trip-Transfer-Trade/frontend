import PortfolioHeader from "./pp"
import AssetsList from "./asset"
import Footer from "../../layout/Footer"


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      <PortfolioHeader />

      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto pb-16">
          <AssetsList />
        </div>
      </main>

      <Footer/>
    </div>
  )
}