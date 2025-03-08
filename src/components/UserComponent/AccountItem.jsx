export default function AccountItem({ title, amount }) {
    return (
        <div className="w-[313px] h-[95px] bg-white rounded-xl p-6 shadow-sm flex justify-between items-center">
            <div>
                <h3 className="text-sm font-medium text-gray-800">{title}</h3>
                <p className="text-2xl font-semibold text-black">{amount}</p>
            </div>
            <button
                className="bg-blue-600 text-white text-base font-medium px-6 py-1 rounded-lg"
                onClick={console.log("이체")}>
                이체
            </button>
        </div>
    )
}