import { useParams, useLocation } from "react-router-dom";

export default function RateDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const { cur_nm, changePrice, changeRate, tts } = location.state || {};

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{cur_nm || id} 상세 정보</h1>
      <p>환율: {tts}원</p>
      <p>
        변동: {changePrice}원 ({changeRate}%)
      </p>
    </div>
  );
}
