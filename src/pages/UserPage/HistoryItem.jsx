export default function HistoryItem({
	merchant,
	date,
	amount,
	type,
}) {
	const isExpense = type === "WITHDRAWAL";

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
		const day = date.getDay();
		const time = date.toTimeString().split(" ")[0];
		return `${month}월 ${day}일 ${time}`;
	};

	const containerClasses = `flex flex-row items-center justify-between px-6 py-4 rounded-md my-3 ${
		isExpense ? "bg-[#FEF2F2]" : "bg-[#ECF6FD]"
	  }`;
	  const amountClasses = `text-right font-semibold text-[19px] ${
		isExpense ? "text-red-500" : "text-blue-500"
	  }`;
	  
	  return (
		<article className={containerClasses}>
		  <div className="flex flex-col space-y-0">
			<h3 className="font-medium text-[16px]">{merchant}</h3>
			<time className="text-gray-500 text-[10px]">{formatDate(date)}</time>
		  </div>
		  <p className={amountClasses}>
			{isExpense ? "- " : "+ "}
			{Number.parseInt(amount, 10).toLocaleString()}원
		  </p>
		</article>
	  );
	  
}