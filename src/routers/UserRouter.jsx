import HistoryPage from "../pages/UserPage/HistoryPage";

const UserRouter = {
  path: "/mypage",
  children: [
    { path: "history", element: <HistoryPage /> },
  ],
};

export default UserRouter;
