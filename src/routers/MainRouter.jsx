import Layout from "../layout/Layout";

import MainPage from "../pages/MainPage/MainPage";
import TripMainPage from "../pages/MyTripPage/TripMainPage";
import ExchangeMainPage from "../pages/ExchangePage/ExchangeMainPage";
import UserPage from "../pages/UserPage/UserPage";

const RootRouter = {
  path: "/",
  element: <Layout />,
  children: [
    { index: true, element: <MainPage /> },
    { path: "trip", element: <TripMainPage /> },
    { path: "exchange", element: <ExchangeMainPage /> },
    { path: "mypage", element: <UserPage /> },
  ],
};

export default RootRouter;
