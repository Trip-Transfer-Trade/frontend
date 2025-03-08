
import { fetchHistories } from "../../apis/exchanges";
import BackNavigation from "../../components/BackNavigation";
import HistoryItem from "./HistoryItem";
import { useState, useEffect } from "react";

export default function HistoryPage(){
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const historyData = await fetchHistories(1); //임시로 account id 넣기
                console.log(historyData);

                setHistory(historyData||[]);
                // 출금 가능 잔액 보여주는거 따로
            } catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
        };
        fetchData();
    },[])
  
    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <BackNavigation text="입출금 내역" />
            <div className="self-center w-full max-w-full h-[1px] border-1 border-[#eceaea] mb-2"></div>
            <section>
        <div className="flex items-center">
          <h1 className="text-[15px] font-semibold">
            출금 가능 잔액
          </h1>
        </div>
        <div >
          {/* <span >{total.toLocaleString()}</span> */}
          <div className="text-center text-[30px] mb-6 mt-5">2,100,000
          <span className="text-[25px]">원</span>
          </div>
        </div>
      </section>
      <div className="self-center w-[358px] max-w-full h-[1px] border-1 border-[#eceaea] mb-2"></div>
      <section >
        <h2 className="text-[15px] font-semibold">이용 내역</h2>
        <div className="px-2">
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
    )

}