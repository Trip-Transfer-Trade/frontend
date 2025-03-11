import Layout from "../layout/Layout";

import MainPage from "../pages/MainPage/MainPage";
import ExchangeMainPage from "../pages/ExchangePage/ExchangeMainPage";
import UserPage from "../pages/UserPage/UserPage";

import CreateAccount from "../pages/MainPage/CreateAccount";
import AccountComplete from "../pages/MainPage/AccountComplete";
import TripMainPage from "../pages/MyTripPage/TripMainPage";

const MainRouter = {
  path: "/",
  element: <Layout />,
  children: [
    { index: true, element: <MainPage /> },
    { path: "createAccount", element: <CreateAccount /> },
    { path: "accountComplete", element: <AccountComplete /> },
    { path: "trip", element: <TripMainPage /> },
    { path: "exchange", element: <ExchangeMainPage /> },
    { path: "mypage", element: <UserPage /> },
  ],
};

export default MainRouter;
