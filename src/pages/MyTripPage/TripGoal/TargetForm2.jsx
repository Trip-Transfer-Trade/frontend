export default function TargetForm({ onSubmit }) {
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
  
    function handleSubmit(e) {
      e.preventDefault();
      onSubmit(amount, date);
    }
  
    return (
      <form onSubmit={handleSubmit} className="p-4">
        <label className="block text-lg font-bold mb-2">목표 금액</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="금액 입력" />
  
        <label className="block text-lg font-bold mt-4 mb-2">목표 기간</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded-lg" />
  
        <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">다음</button>
      </form>
    );
  }
  