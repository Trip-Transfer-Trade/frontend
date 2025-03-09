
import TransferRecipientPage from "../pages/UserPage/TransferRecipientPage";
import TransferAmountPage from "../pages/UserPage/TransferAmountPage";
import TransferConfirmPage from "../pages/UserPage/TransferConfirmPage";
import HistoryPage from "../pages/UserPage/HistoryPage";
import ProfilePage from "../pages/UserPage/ProfilePage";


const UserRouter = {
  path: "/mypage",
  children: [
    {
      path: "transfer",
      children: [
        {
          path: "recipient",
          element: <TransferRecipientPage />, // 계좌번호 및 메모 입력 페이지
        },
        {
          path: "amount",
          element: <TransferAmountPage />, // 금액 입력 페이지
        },
        {
          path: "confirm",
          element: <TransferConfirmPage />, // 최종 확인 페이지
        },
        {
          path: "history",
          element: <HistoryPage />,
        },
      ],
    },
    {
      path: "profile",
      element: <ProfilePage />, // 독립적인 프로필 페이지
    },
  ],
};

export default UserRouter;
