import React, {useState} from 'react';
import Tab from "../../components/Tab";
import Tabs from "../../components/Tabs";
import BackNavigation from "../../components/BackNavigation";

const RankingHeader = () => (
  <div className="px-6 pt-12 pb-8 text-center bg-white">
      <h1 className="text-[16px] text-center font-bold">
      투자를 도와줄</h1>
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

const domesticRankingData = [
  { id: 1, rank: 1, name: '김신한', profit: 123323, percentage: 32.3 },
  { id: 2, rank: 2, name: '김신한', profit: 123323, percentage: 32.3 },
  { id: 3, rank: 3, name: '김신한', profit: 123323, percentage: 32.3 }
];
const usaRankingData = [
  { id: 1, rank: 1, name: '신한', profit: 123323, percentage: 32.3 },
  { id: 2, rank: 2, name: '신한', profit: 123323, percentage: 32.3 },
  { id: 3, rank: 3, name: '신한', profit: 123323, percentage: 32.3 }
];

const TabsContainer = () => {
  const [activeTab, setActiveTab] = useState("KRW");
  const data = activeTab === "KRW" ? domesticRankingData : usaRankingData;

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-white z-10 px-6 pb-4">
        <Tabs>
          <Tab label="국내" onClick={() => setActiveTab("KRW")} active={activeTab === "KRW"} />
          <Tab label="미국" onClick={() => setActiveTab("USD")} active={activeTab === "USD"} />
        </Tabs>
      </div>
      <div className="overflow-y-auto h-full px-6 pb-20">
        {data.map(item => (
          <RankingItem key={item.id} {...item} />
        ))}
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
    <TabsContainer />
  </div>
  </div>
  )

export default RankingPage;
