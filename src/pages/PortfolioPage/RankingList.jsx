const colors = {
    1: "bg-blue-500",
    2: "bg-purple-500",
    3: "bg-orange-500",
  }
  const RankingItem = ({ rank, name, profit, percentage }) => {
    return (
      <div className="flex items-center px-6 py-3">
        <span className="text-2xl font-bold w-8 text-gray-700">{rank}</span>
        <div className={`w-12 h-12 rounded-xl ${colors[rank]} flex items-center justify-center mr-4`}>
          <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{name}</h3>
          <p className="text-red-500 text-sm">
            +{profit.toLocaleString()}원 ({percentage}%)
          </p>
        </div>
      </div>
    )
  }
  export default RankingItem