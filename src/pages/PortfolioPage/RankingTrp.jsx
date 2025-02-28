import trophy from "../../assets/images/portfolio/trp.svg"

const RankingHeader = () => {
    return (
      <div className="px-6 pt-12 pb-8 text-center">
        <h1 className="text-xl font-bold mb-2">
          투자를 도와줄
          <br />
          수익률 TOP 랭킹!
        </h1>
        <p className="text-sm text-gray-500">
          나와 비슷한 목표의 높은 수익률을 가진
          <br />
          사용자의 투자 포트폴리오를 확인해보세요
        </p>
  
        <div className="flex justify-center my-8">
          <img
            src={trophy}
            alt="Trophy"
            className="w-24 h-24 object-contain"
          />
        </div>
      </div>
    )
  }

  export default RankingHeader
  
  