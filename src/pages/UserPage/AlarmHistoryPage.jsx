import React from "react";
import { NotificationItem } from "../../components/UserComponent/NotificationItem";
import Footer from "../../layout/Footer";
import BackNavigation from "../../components/BackNavigation";


export default function AlarmHistoryPage() {
    const notifications = [
        {
          id: 1,
          title: "목표 기간의 절반에 도달했어요",
          description: '"런던 갈래" 여행 목표의 기간이 절반이 지났어요.',
          time: "1시간 전",
          isRead: false,
        },
        {
          id: 2,
          title: "목표 기간의 절반에 도달했어요",
          description: '"런던 갈래" 여행 목표의 기간이 절반이 지났어요.',
          time: "3시간 전",
          isRead: true,
        },
        {
          id: 3,
          title: "최저 환율 도달!",
          description: "현재 달러 환율이 최근 1주일 중에서 최저 환율이에요.",
          time: "10시간 전",
          isRead: true,
        },
    ]

    const handleClick = (id) => {
        console.log(`알림 ${id} 클릭됨`);
    };

    return(
        <div>
            <BackNavigation />
            <div className="flex-1 overflow-auto">
                <div className="p-4 space-y-4">
                {notifications.map((notification) => (
                    <NotificationItem
                    key={notification.id}
                    title={notification.title}
                    description={notification.description}
                    time={notification.time}
                    isRead={notification.isRead}
                    onClick={() => handleClick(notification.id)}
                    />
                ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}