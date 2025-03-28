import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Tab from "../../components/Tab";
import Tabs from "../../components/Tabs";
import BackNavigation from "../../components/BackNavigation";
import { fetchRankAll } from "../../apis/exchanges";
// 랜덤 이름 생성을 위한 배열
const koreanNames = ['김투자', '이수익', '박포트', '최주식', '정펀드', '강수익', '윤투자', '장금융', '임증권', '한재테크'];
const englishNames = ['Mike Invest', 'Jane Stock', 'Peter Fund', 'Sarah Trade', 'Tom Market', 'Amy Capital', 'John Finance', 'Lisa Money', 'David Cash', 'Emma Wealth'];

// 랜덤 이름 생성 함수
const getRandomName = (isKorean) => {
  const nameList = isKorean ? koreanNames : englishNames;
  return nameList[Math.floor(Math.random() * nameList.length)];
};
const RankingHeader = () => (
  <div>
    <div className="px-6 pt-16 pb-8 bg-white">
      <h1 className="text-[16px] text-center font-bold">
        투자를 도와줄
      </h1>
      <h1 className="text-[24px] text-center font-bold mb-2">
        수익 TOP 랭킹
      </h1>
      <p className="text-sm text-center text-gray-400">
        전체 사용자의 투자 포트폴리오를 확인해보세요.
        </p>
      <p className="text-center text-[12px] text-gray-400  mx-8">* 랭킹은 1시간 마다 업데이트 됩니다.</p>

      <div className="flex justify-center mt-8">
        <img 
          src="/assets/images/portfolio/trp.svg"
          alt="Trophy" 
          className="w-20 h-20 object-contain"
        />
      </div>
    </div>
    <hr className="mb-1 border-t-3 border-gray-200 -mt-9" />
  </div>
);

const RankingItem = ({ rank, name, profit, currencySymbol, onClick }) => {
  const colors = {
    1: 'bg-blue-500',
    2: 'bg-purple-500',
    3: 'bg-orange-500'
  };
  if (profit==0) return;

  return (
    <div className="flex items-center px-6 py-3 bg-white rounded-lg mb-2 " onClick={onClick}>
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

const TabsContainer = () => {
  const [activeTab, setActiveTab] = useState("KRW");
  const [rankingData, setRankingData] = useState({
    domestic: [],
    usa: []
  });
  const [isLoading, setIsLoading] = useState({
    domestic:true,
    usa:true
  });

  useEffect(() => {
    const fetchDomesticRanking = async () => {
      try {
        setIsLoading(prev => ({ ...prev, domestic: true }));
        const data = await fetchRankAll('KRW');
        
        // API 응답 데이터 처리
        const processedData = data.map((item, index) => {
          return {
            id: item.tripId,
            rank: index + 1,
            name: getRandomName(true),
            profit: item.assessmentAmountSum
          };
        });
        
        // 수익 기준으로 정렬
        const sortedData = processedData.sort((a, b) => b.profit - a.profit);

        setRankingData(prev => ({
          ...prev,
          domestic: sortedData
        }));
      } catch (error) {
        console.error("국내 랭킹 데이터 로딩 실패:", error);
      } finally {
        setIsLoading(prev => ({ ...prev, domestic: false }));
        console.log(loading);
      }
    };

    fetchDomesticRanking();
  }, []);

  useEffect(() => {
    if (activeTab === "USD") {
      const fetchUSARanking = async () => {
        console.log("USD")
        // 이미 데이터가 있으면 다시 로드하지 않음
        if (rankingData.usa.length > 0) return;
        
        try {
          setIsLoading(prev => ({ ...prev, usa: true }));
          const data = await fetchRankAll('USD');
          
          // API 응답 데이터 처리
          const processedData = data.map((item, index) => {
            return {
              id: item.tripId,
              rank: index + 1,
              name: getRandomName(false),
              profit: item.assessmentAmountSum
            };
          });
          
          // 수익 기준으로 정렬
          const sortedData = processedData.sort((a, b) => b.profit - a.profit);
          
          setRankingData(prev => ({
            ...prev,
            usa: sortedData
          }));
        } catch (error) {
          console.error("미국 랭킹 데이터 로딩 실패:", error);
        } finally {
          setIsLoading(prev => ({ ...prev, usa: false }));
        }
      };

      fetchUSARanking();
    }
  }, [activeTab, rankingData.usa.length]);

  const data = activeTab === "KRW" ? rankingData.domestic: rankingData.usa;
  const loading = activeTab === "KRW" ? isLoading.domestic : isLoading.usa;
  const currencySymbol = activeTab === "KRW" ? "₩" : "$";
  
  const navigate = useNavigate();
  const handleClickItem = async (tripId) =>{
      navigate(`/trip/suggest`,{state:{suggestedTripId:tripId , activeTab:activeTab}});
  }

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
              onClick={()=>handleClickItem (item.id)}
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

const TopPortfolio = () => (
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

export default TopPortfolio;