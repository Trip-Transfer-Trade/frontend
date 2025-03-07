import Layout from "../layout/Layout";

import MainPage from "../pages/MainPage/MainPage";
import TripMainPage from "../pages/MyTripPage/TripMainPage";
import ExchangeMainPage from "../pages/ExchangePage/ExchangeMainPage";
import UserPage from "../pages/UserPage/UserPage";

import HomeRouter from "./HomeRouter";
import CreateAccount from "../pages/MainPage/CreateAccount";
import AccountComplete from "../pages/MainPage/AccountComplete";

const RootRouter = {
  path: "/",
  element: <Layout />,
  children: [
    { index: true, element: <MainPage /> },
    { path: "createAccount", element: <CreateAccount/>},
    { path: "accountComplete", element: <AccountComplete/>},
    { path: "trip", element: <TripMainPage /> },
    { path: "exchange", element: <ExchangeMainPage /> },
    { path: "mypage", element: <UserPage /> },
    HomeRouter,
  ],
};

export default RootRouter;
