import React from 'react';

const RankingHeader = () => (
  <div className="px-6 pt-12 pb-8 text-center bg-white">
    <h1 className="text-xl font-bold mb-2">
      특자를 도와줄<br />
      수익률 TOP 랭킹!
    </h1>
    <p className="text-sm text-gray-500">
      나의 포트폴리오 수익률을 기준<br />
      사용자의 투자 포트폴리오를 확인해보세요
    </p>
    
    <div className="flex justify-center my-8">
      <img 
        src="/assets/images/portfolio/trp.svg"
        alt="Trophy" 
        className="w-24 h-24 object-contain"
      />
    </div>
  </div>
);

const RankingItem = ({ rank, name, profit, percentage }) => {
  const colors = {
    1: 'bg-blue-500',
    2: 'bg-purple-500',
    3: 'bg-orange-500'
  };

  return (
    <div className="flex items-center px-6 py-3 bg-white rounded-lg shadow-sm mb-2">
      <span className="text-2xl font-bold w-8 text-gray-700">{rank}</span>
      <div className={`w-12 h-12 rounded-xl ${colors[rank]} flex items-center justify-center mr-4`}>
        <img 
          src="/assets/images/main/portfolio.svg?height=32&width=32" 
          alt="Profile" 
          className="w-8 h-8"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <p className="text-red-500 text-sm">
          +{profit.toLocaleString()}원 ({percentage}%)
        </p>
      </div>
    </div>
  );
};

const rankingData = [
  { id: 1, rank: 1, name: '김신한', profit: 123323, percentage: 32.3 },
  { id: 2, rank: 2, name: '김신한', profit: 123323, percentage: 32.3 },
  { id: 3, rank: 3, name: '김신한', profit: 123323, percentage: 32.3 }
];

const RankingPage = () => {
  return (
    <div className="min-h-screen">
      <RankingHeader />
      
      <div className="px-6 pb-4">
        <h2 className="text-lg font-bold mb-4">TOP 포트폴리오</h2>
        <div className="space-y-2">
          {rankingData.map((item) => (
            <RankingItem
              key={item.id}
              rank={item.rank}
              name={item.name}
              profit={item.profit}
              percentage={item.percentage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
