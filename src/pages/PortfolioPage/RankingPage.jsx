import { useNavigate, useParams } from "react-router-dom";

const RankingPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const handleSelectSuggestedPortfolio = (suggestedTripId, activeTab) => {
    navigate(`suggest`, { state: { suggestedTripId, activeTab } });
  };

  return (
    <div>
      <h2>포트폴리오 추천</h2>
      <button onClick={() => handleSelectSuggestedPortfolio(1, "k")}>
        국내 추천 포트폴리오 보기
      </button>
      <button onClick={() => handleSelectSuggestedPortfolio(4, "u")}>
        해외 추천 포트폴리오 보기
      </button>
    </div>
  );
};

export default RankingPage;
