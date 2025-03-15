import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Tab from "../../components/Tab";
import Tabs from "../../components/Tabs";
import BackNavigation from "../../components/BackNavigation";
import { fetchRank, fetchRankAll } from "../../apis/exchanges";

// 랜덤 이름 생성 관련
const koreanNames = ['김투자', '이수익', '박포트', '최주식', '정펀드', '강수익', '윤투자', '장금융', '임증권', '한재테크'];
const englishNames = ['Mike Invest', 'Jane Stock', 'Peter Fund', 'Sarah Trade', 'Tom Market', 'Amy Capital', 'John Finance', 'Lisa Money', 'David Cash', 'Emma Wealth'];

const getRandomName = (isKorean) => {
  const names = isKorean ? koreanNames : englishNames;
  return names[Math.floor(Math.random() * names.length)];
};

// 유틸리티 함수: API 데이터를 가공 및 내림차순 정렬
const processRankingData = (data, isKorean) => {
  const processed = data.map((item, index) => ({
    id: item.tripId,
    rank: index + 1,
    name: getRandomName(isKorean),
    profit: item.assessmentAmountSum,
  }));
  return processed.sort((a, b) => b.profit - a.profit);
};

// RankingHeader Component
const RankingHeader = () => (
  <div className="px-6 pt-10 pb-8 text-center bg-white">
    <h1 className="text-[16px] font-bold">투자를 도와줄</h1>
    <h1 className="text-[24px] font-bold mb-2">수익 TOP 랭킹</h1>
    <p className="text-sm text-gray-400 mb-12">
      나와 유사한 목표를 가진 사용자의<br />투자 포트폴리오를 확인해보세요
    </p>
    <div className="flex justify-center">
      <img 
        src="/assets/images/portfolio/trp.svg"
        alt="Trophy" 
        className="w-20 h-20 object-contain"
      />
    </div>
  </div>
);

// RankingItem Component
// const RankingItem = ({ rank, name, profit, currencySymbol }) => {
//   const colors = { 1: 'bg-blue-500', 2: 'bg-purple-500', 3: 'bg-orange-500' };
//   if (profit === 0) return null; // profit이 0이면 렌더링하지 않음
//   return (
//     <div className="flex items-center px-6 py-3 bg-white rounded-lg mb-2">
//       <span className="text-xl font-bold w-8 text-gray-700">{rank}</span>
//       <div className={`w-8 h-8 rounded-xl ${colors[rank] || 'bg-gray-500'} flex items-center justify-center mr-8`}>
//         <img 
//           src="/assets/images/main/portfolio.svg?height=32&width=32" 
//           alt="Profile" 
//           className="w-8 h-8"
//         />
//       </div>
//       <div className="flex-1">
//         <h3 className="font-medium">{name}</h3>
//         <p className="text-red-500 text-sm">
//           {currencySymbol} {profit.toLocaleString()}
//         </p>
//       </div>
//     </div>
//   );
// };

const RankingItem = ({ rank, name, profit, currencySymbol, onClick }) => {
  const colors = { 1: 'bg-blue-500', 2: 'bg-purple-500', 3: 'bg-orange-500' };
  if (profit === 0) return null; // profit이 0이면 렌더링하지 않음
  return (
    <div className="flex items-center px-6 py-3 bg-white rounded-lg mb-2 cursor-pointer" onClick={onClick}>
      <span className="text-xl font-bold w-8 text-gray-700">{rank}</span>
      <div className={`w-8 h-8 rounded-xl ${colors[rank] || 'bg-gray-500'} flex items-center justify-center mr-8`}>
        <img 
          src="/assets/images/main/portfolio.svg?height=32&width=32" 
          alt="Profile" 
          className="w-8 h-8"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <p className="text-red-500 text-sm">
          {currencySymbol} {profit.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
// TabsContainer Component (자신과 비슷한 목표 랭킹 + fallback)
const TabsContainer = () => {
  const [activeTab, setActiveTab] = useState("KRW");
  const [domesticRankingData, setDomesticRankingData] = useState([]);
  const [usaRankingData, setUsaRankingData] = useState([]);
  const [isLoading, setIsLoading] = useState({ domestic: false, usa: false });
  // fallbackUsed: 비슷한 목표 데이터가 없어서 전체 랭킹(fallback)을 사용했는지 여부
  const [fallbackUsed, setFallbackUsed] = useState({ domestic: false, usa: false });
  const { tripId } = useParams();

  // 국내 데이터 (KRW)
  useEffect(() => {
    if (activeTab === "KRW") {
      const fetchDomesticData = async () => {
        try {
          setIsLoading(prev => ({ ...prev, domestic: true }));
          // 먼저 자신과 비슷한 목표의 랭킹 데이터 호출
          let data = await fetchRank(tripId, 'KRW');
          let processedData = processRankingData(data, true);
          // 비슷한 목표 데이터가 없거나 모든 profit이 0이면 fallback 사용
          if (processedData.length === 0 || processedData.every(item => item.profit === 0)) {
            setFallbackUsed(prev => ({ ...prev, domestic: true }));
            const fallbackData = await fetchRankAll('KRW');
            processedData = processRankingData(fallbackData, true);
          } else {
            setFallbackUsed(prev => ({ ...prev, domestic: false }));
          }
          setDomesticRankingData(processedData);
        } catch (error) {
          console.error("국내 랭킹 데이터 로딩 실패:", error);
        } finally {
          setIsLoading(prev => ({ ...prev, domestic: false }));
        }
      };
      fetchDomesticData();
    }
  }, [activeTab, tripId]);

  // 미국 데이터 (USD)
  useEffect(() => {
    if (activeTab === "USD") {
      const fetchUSAData = async () => {
        try {
          setIsLoading(prev => ({ ...prev, usa: true }));
          let data = await fetchRank(tripId, 'USD');
          let processedData = processRankingData(data, false);
          if (processedData.length === 0 || processedData.every(item => item.profit === 0)) {
            setFallbackUsed(prev => ({ ...prev, usa: true }));
            const fallbackData = await fetchRankAll('USD');
            processedData = processRankingData(fallbackData, false);
          } else {
            setFallbackUsed(prev => ({ ...prev, usa: false }));
          }
          setUsaRankingData(processedData);
        } catch (error) {
          console.error("미국 랭킹 데이터 로딩 실패:", error);
        } finally {
          setIsLoading(prev => ({ ...prev, usa: false }));
        }
      };
      fetchUSAData();
    }
  }, [activeTab, tripId]);

  const data = activeTab === "KRW" ? domesticRankingData : usaRankingData;
  const loading = activeTab === "KRW" ? isLoading.domestic : isLoading.usa;
  const currencySymbol = activeTab === "KRW" ? "₩" : "$";
  const usedFallback = activeTab === "KRW" ? fallbackUsed.domestic : fallbackUsed.usa;
  const navigate = useNavigate();

  const handleClickItem = async (tripId) =>{
    console.log("jere")
      navigate(`suggest`,{state:{suggestedTripId:tripId}});
  }

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-white z-10 px-6">
        <Tabs>
          <Tab label="국내" onClick={() => setActiveTab("KRW")} active={activeTab === "KRW"} />
          <Tab label="미국" onClick={() => setActiveTab("USD")} active={activeTab === "USD"} />
        </Tabs>
      </div>
      <div className="overflow-y-auto h-full px-6 pb-18">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-500">랭킹 데이터를 불러오는 중...</p>
          </div>
        ) : data.length > 0 ? (
          <>
            {usedFallback && (
                <p className="w-full text-right text-gray-500 text-[12px]">나와 비슷한 목표를 가진 사람들이 없어요<br/> 전체 랭킹을 보여드릴게요</p>
              
            )}
            {data.map(item => (
              <RankingItem 
                key={item.id} 
                {...item} 
                onClick={() =>{handleClickItem(item.id); console.log(item)}}
                currencySymbol={currencySymbol}
              />
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-500">랭킹 데이터가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// RankingPage Component
const RankingPage = () => (
  <div className="flex flex-col h-screen">
    <div className="flex-shrink-0">
      <BackNavigation />
      <RankingHeader />
    </div>
    <div className="flex-1 flex flex-col overflow-hidden">
      <TabsContainer />
    </div>
  </div>
);

export default RankingPage;
