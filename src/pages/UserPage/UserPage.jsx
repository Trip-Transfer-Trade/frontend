import MenuItem from "../../components/UserComponent/MenuItem";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUserInfo } from "../../apis/users";
import { logout } from "../../apis/users";
import { useDispatch } from "react-redux";
import { resetTrips } from "../../redux/tripSlice";
import apiClient from "../../apis/apiClient";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserInfo = async () => {
      const userData = await fetchUserInfo();
      if (userData) {
        setUser(userData);
        console.log(userData);
      }
    };
    loadUserInfo();
  }, []);

  useEffect(() => {
    apiClient
      .get("/accounts/count")
      .then((response) => {
        let count = response.data;
        if(count === 1){
          count = 0;
          setCount(count);
        } else {
          setCount(count - 1);
        }
        console.log("진행 중 목표 : " + count);
      })
      .catch((err) => {
        console.error("목표 count 가져오기 실패", err);
      });
  }, [count]);

  const menuItems = [
    { icon: "💳", label: "내 계좌", path: "/mypage/account" },
    { icon: "📊", label: "내 주식", path: "/mypage/stock" },
    { icon: "📂", label: "내 지갑", path: "/exchange" },
    { icon: "📅", label: "여행 기록", path: "/mypage/trip/history" },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 프로필 */}
      <div className="flex items-center justify-between p-6 space-x-4">
        <img
          src="/assets/images/user/user.svg"
          alt="프로필"
          className="w-24 h-24 rounded-lg"
        />

        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-bold">{user ? user.name : "로딩 중..."}</p>

            {/* 내 정보 & 로그아웃 버튼 */}
            <div className="flex items-center space-x-2">
              <button
                className="text-custom-gray-3 text-xs flex items-center"
                onClick={() => navigate("profile", { state: { user } })}
              >
                <span>내 정보</span>
              </button>

              {/* 얇은 선 */}
              <div className="h-4 w-[1px] bg-gray-200"></div>

              <button
                className="text-custom-gray-3 text-xs flex items-center"
                onClick={async () => {
                  dispatch(resetTrips());
                  await logout();
                  navigate("/auth/login"); // 로그인 페이지로 이동
                }}
              >
                <span>로그아웃</span>
              </button>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg px-4 py-2 flex justify-between items-center">
            <span className="text-xs text-gray-600">내 목표</span>
            <span className="text-xs">{count}회</span>
          </div>
        </div>
      </div>

      <div className="left-0 right-0 top-[calc(50%-2px)] h-[4px] bg-custom-gray-2 z-0"></div>

      {/* 바로가기 */}
      <div className="grid grid-cols-2 gap-4 p-6">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            path={item.path}
          />
        ))}
      </div>
    </div>
  );
}
