import { useLocation } from "react-router-dom";

export default function ProfilePage() {
  const location = useLocation();
  const user = location.state?.user; // UserPage에서 전달된 사용자 정보 가져오기

  if (!user) {
    return <p className="text-center text-gray-500">사용자 정보를 불러오는 중...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold mb-8">내 정보</h1>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-base">이름</span>
          <span className="text-base font-medium">{user.name}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-base">생년월일</span>
          <span className="text-base font-medium">{user.birthDate}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-base">휴대전화번호</span>
          <span className="text-base font-medium">{user.phoneNumber}</span>
        </div>
      </div>
    </div>
  );
}
