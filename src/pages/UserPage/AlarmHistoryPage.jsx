import React, { useState, useEffect } from "react";
import { NotificationItem } from "../../components/UserComponent/NotificationItem";
import BackNavigation from "../../components/BackNavigation";
import { fetchAlarmHistory, fetchReadAlarm } from "../../apis/alarms";

export default function AlarmHistoryPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historyData = await fetchAlarmHistory();
        console.log("📩 알림 데이터:", historyData);

        if (!Array.isArray(historyData)) throw new Error("잘못된 데이터 형식!");

        const formattedNotifications = historyData.map((alarm) => ({
          id: alarm.alarmId,
          title: getAlarmTitle(alarm.alarmType),
          description: getAlarmDescription(alarm.alarmType, alarm.tripName),
          // time: "방금 전", // 임시 시간
          isRead: alarm.read,
        }));

        setNotifications(sortNotifications(formattedNotifications));
      } catch (error) {
        console.error("🚨 Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortNotifications = (notifications) => {
    return [...notifications].sort((a, b) => {
      // 1️⃣ 먼저 읽지 않은 알림을 위로 배치
      if (a.isRead !== b.isRead) return a.isRead - b.isRead;
      
      // 2️⃣ 같은 `isRead` 상태에서는 최신순 정렬 (최근 알림이 위로)
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
  };

  const getAlarmTitle = (alarmType) => {
    switch (alarmType) {
      case "GOAL_ACHIEVED":
        return "목표를 달성했어요";
      case "GOAL_FAILED":
        return "목표 기간이 만료됐어요";
      case "LOWEST_EXCHANGE_RATE":
        return "최저 환율 도달!";
      case "GOAL_HALF_FAILED":
        return "목표 기간의 절반에 도달했어요";
      default:
        return "새로운 알림";
    }
  };

  const getAlarmDescription = (alarmType, tripName) => {
    switch (alarmType) {
      case "GOAL_ACHIEVED":
        return `"${tripName}" 목표를 성공적으로 달성했어요! 🎉`;
      case "GOAL_FAILED":
        return `"${tripName}" 목표를 달성하지 못했어요. 😢`;
      case "LOWEST_EXCHANGE_RATE":
        return "현재 달러 환율이 최근 1주일 중에서 최저 환율이에요.";
      case "GOAL_HALF_FAILED":
        return `${tripName} 기간이 절반 지났어요, 포트폴리오 추천 받아볼래요?`;
      default:
        return "새로운 알림이 도착했어요!";
    }
  };

  const handleClick = async (alarmId) => {
    try {
      await fetchReadAlarm(alarmId);

      setNotifications((prevNotifications) =>
        sortNotifications(
          prevNotifications.map((notification) =>
            notification.id === alarmId ? { ...notification, isRead: true } : notification
          )
        )
      );
    } catch (error) {
      console.error("🚨 Error marking notification as read:", error);
    }
  };

  if (loading) return <p>⏳ 알림 데이터를 불러오는 중...</p>;

  if (error) return <p>🚨 오류 발생: {error}</p>;

  return (
    <div>
      <BackNavigation />
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-4">
          <div className="-mt-8"></div>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                title={notification.title}
                description={notification.description}
                time={notification.time}
                isRead={notification.isRead}
                onClick={() => handleClick(notification.id)}
              />
            ))
          ) : (
            <p>📭 새로운 알림이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}