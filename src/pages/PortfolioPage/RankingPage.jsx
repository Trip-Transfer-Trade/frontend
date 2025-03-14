import React, { useState, useEffect } from 'react';
import Tab from "../../components/Tab";
import Tabs from "../../components/Tabs";
import BackNavigation from "../../components/BackNavigation";
import { fetchRank } from "../../apis/exchanges";
import { useParams } from "react-router-dom";

// 랜덤 이름 생성을 위한 배열
const koreanNames = ['김투자', '이수익', '박포트', '최주식', '정펀드', '강수익', '윤투자', '장금융', '임증권', '한재테크'];
const englishNames = ['Mike Invest', 'Jane Stock', 'Peter Fund', 'Sarah Trade', 'Tom Market', 'Amy Capital', 'John Finance', 'Lisa Money', 'David Cash', 'Emma Wealth'];

// 랜덤 이름 생성 함수
const getRandomName = (isKorean) => {
  const nameList = isKorean ? koreanNames : englishNames;
  return nameList[Math.floor(Math.random() * nameList.length)];
};

const RankingHeader = () => (
  <div className="px-6 pt-12 pb-8 text-center bg-white">
    <h1 className="text-[16px] text-center font-bold">
      투자를 도와줄
    </h1>
    <h1 className="text-[24px] text-center font-bold mb-2">
      수익 TOP 랭킹
    </h1>
    <p className="text-sm text-gray-400">
      나와 유사한 목표를 가진 사용자의<br />
      투자 포트폴리오를 확인해보세요
    </p>
    
    <div className="flex justify-center my-8">
      <img 
        src="/assets/images/portfolio/trp.svg"
        alt="Trophy" 
        className="w-20 h-20 object-contain"
      />
    </div>
  </div>
);

const RankingItem = ({ rank, name, profit }) => {
  const colors = {
    1: 'bg-blue-500',
    2: 'bg-purple-500',
    3: 'bg-orange-500'
  };
  if (profit===0){
    return(
      <div className='text-center text-[14px] mt-24 text-gray-500'>나와 비슷한 목표를 가진 사람들이 없어요.</div>
  //     <div className="flex justify-center items-center mt-16">
  //   <div className="w-3/4 bg-blue-50 text-center rounded-xl text-gray-500 text-[12px] mt-6 mb-2 p-4">
  //     나와 비슷한 목표를 가진 사람들이 없어요.
  //     <button className="w-full p-2 rounded-lg bg-blue-100 mt-2">
  //       전체 랭킹 보러가기
  //     </button>
  //   </div>
  // </div>
  )
  }
  return (
    <div className="flex items-center px-6 py-3 bg-white rounded-lg mb-2">
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
          +{profit.toLocaleString()}원
        </p>
      </div>
    </div>
  );
};

const TabsContainer = () => {
  const [activeTab, setActiveTab] = useState("KRW");
  const [domesticRankingData, setDomesticRankingData] = useState([]);
  const [usaRankingData, setUsaRankingData] = useState([]);
  const [isLoading, setIsLoading] = useState({
    domestic: false,
    usa: false
  });
  const { tripId } = useParams();
  console.log(tripId);
  // 국내 랭킹 데이터 불러오기 (KRW)
  useEffect(() => {
    if (activeTab === "KRW") {
      const fetchDomesticData = async () => {
        try {
          setIsLoading(prev => ({ ...prev, domestic: true }));
          const data = await fetchRank(tripId,'KRW');
          const processedData = data.map((item, index) => ({
            id: item.tripId,
            rank: index + 1,
            name: getRandomName(true),
            profit: item.assessmentAmountSum
          }));
          const sortedData = processedData.sort((a, b) => b.profit - a.profit);
          setDomesticRankingData(sortedData);
        } catch (error) {
          console.error("국내 랭킹 데이터 로딩 실패:", error);
        } finally {
          setIsLoading(prev => ({ ...prev, domestic: false }));
        }
      };
      fetchDomesticData();
    }
  }, [activeTab]);

  // 미국 랭킹 데이터 불러오기 (USD)
  useEffect(() => {
    if (activeTab === "USD") {
      const fetchUSAData = async () => {
        // 만약 이미 데이터가 있다면 다시 호출하지 않음
        if (usaRankingData.length > 0) return;
        try {
          setIsLoading(prev => ({ ...prev, usa: true }));
          const data = await fetchRank(tripId,'USD'); // fetchRanking 호출
          // 응답 데이터 처리
          const processedData = data.map((item, index) => ({
            id: item.tripId,
            rank: index + 1,
            name: getRandomName(false),
            profit: item.assessmentAmountSum
          }));
          // 수익 기준 내림차순 정렬
          const sortedData = processedData.sort((a, b) => b.profit - a.profit);
          setUsaRankingData(sortedData);
        } catch (error) {
          console.error("미국 랭킹 데이터 로딩 실패:", error);
        } finally {
          setIsLoading(prev => ({ ...prev, usa: false }));
        }
      };
      fetchUSAData();
    }
  }, [activeTab, usaRankingData.length]);

  const data = activeTab === "KRW" ? domesticRankingData : usaRankingData;
  const loading = activeTab === "KRW" ? isLoading.domestic : isLoading.usa;
  const currencySymbol = activeTab === "KRW" ? "원" : "$";

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-white z-10 px-6 pb-4">
        <Tabs>
          <Tab label="국내" onClick={() => setActiveTab("KRW")} active={activeTab === "KRW"} />
          <Tab label="미국" onClick={() => setActiveTab("USD")} active={activeTab === "USD"} />
        </Tabs>
      </div>
      <div className="overflow-y-auto h-full px-6 pb-20">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-500">랭킹 데이터를 불러오는 중...</p>
          </div>
        ) : data.length > 0 ? (
          data.map(item => (
            <RankingItem 
              key={item.id} 
              {...item} 
              currencySymbol={currencySymbol}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-500">랭킹 데이터가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const RankingPage = () => (
  <div className="flex flex-col h-screen">
    <div className="flex-shrink-0">
      <BackNavigation />
      <RankingHeader />
    </div>
    <div className="flex-1 flex flex-col overflow-hidden">
      <TabsContainer/>
    </div>
  </div>
);

export default RankingPage;
