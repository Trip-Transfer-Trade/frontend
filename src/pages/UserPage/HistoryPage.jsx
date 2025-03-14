import { fetchHistories } from "../../apis/exchanges";
import BackNavigation from "../../components/BackNavigation";
import HistoryItem from "../../components/UserComponent/HistoryItem";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const location = useLocation();
  const amount = location.state?.amount || 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historyData = await fetchHistories(id); //임시로 account id 넣기
        console.log(historyData);

        setHistory(historyData || []);
        // 출금 가능 잔액 보여주는거 따로
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <BackNavigation text="입출금 내역" />

      <section className="p-6 px-9">
        <div className="flex items-center">
          <h1 className="text-[16px] text-custom-gray-3">출금 가능 잔액</h1>
        </div>
        <div>
          <div className="text-center text-[35px] font-semibold mt-2">
            {amount}
          </div>
        </div>
      </section>
      <div className="self-center w-[400px] max-w-full h-[3px] border-1 border-custom-gray-2 mb-4"></div>
      <section className="px-9">
        <h2 className="text-[16px] text-custom-gray-3">이용 내역</h2>
        <div>
          {history.map((transaction, index) => (
            <HistoryItem
              key={index}
              merchant={transaction.description}
              date={transaction.date}
              amount={transaction.amount}
              type={transaction.transactionType}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
