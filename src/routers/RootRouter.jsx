import Layout from "../layout/Layout";
import MainPage from "../pages/MainPage/MainPage";

import ExchangeRouter from "./ExchangeRouter";

const RootRouter = {
  path: "/",
  element: <Layout />,
  children: [{ index: true, element: <MainPage /> }, ExchangeRouter],
};

export default RootRouter;
