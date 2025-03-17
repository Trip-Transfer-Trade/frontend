import { useNavigate } from "react-router-dom";

export default function AccountItem({ title, amount, id }) {
    const navigate = useNavigate();

    return (
        <div className="w-[313px] h-[95px] bg-white rounded-xl p-6 shadow-sm flex justify-between items-center"
        onClick={()=> {
            console.log("account",id)
            navigate(`/mypage/transfer/history/${id}`,{state: { amount: amount }})
        }}
            >
            <div>
                <h3 className="text-[15px] text-gray-800">{title}</h3>
                <p className="text-[25px] font-semibold text-black">{amount}</p>
            </div>
            <button
                className="bg-brand-blue text-white text-[15px] font-light px-6 py-1 rounded-lg"
                onClick={(e) => {
                    e.stopPropagation();
                    console.log("이체");
                    navigate(`/mypage/transfer/recipient`, { state: { amount: amount, id:id }})}} >
                이체
            </button>
        </div>
    )
}