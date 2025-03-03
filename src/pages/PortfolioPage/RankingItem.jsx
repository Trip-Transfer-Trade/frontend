
// 프로필 아이콘 컴포넌트
const ProfileIcon = ({ color }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: "12px",
        padding: "8px",
        marginRight: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="18" r="18" fill="white" />
          <path d="M12 14C12 12.8954 12.8954 12 14 12H22C23.1046 12 24 12.8954 24 14V24L18 21L12 24V14Z" fill="white" />
          <circle cx="15" cy="16" r="1.5" fill={color} />
          <circle cx="21" cy="16" r="1.5" fill={color} />
          <path d="M14 20C15.5 22 20.5 22 22 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

// 랭킹 아이템 컴포넌트
const RankingItem = ({ rank, name, profit, percentage, color }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: color,
          width: "32px",
        }}
      >
        {rank}
      </div>
      <ProfileIcon color={color} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: "500" }}>{name}</div>
        <div style={{ color: "#EF4444", fontSize: "14px" }}>
          {profit} {percentage}
        </div>
      </div>
    </div>
  )
}

export default RankingItem

