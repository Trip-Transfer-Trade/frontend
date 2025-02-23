import Layout from "../layout/Layout";

import MainPage from "../pages/MainPage/MainPage";

const RootRouter = {
  path: "/",
  element: <Layout />,
  children: [{ index: true, element: <MainPage /> }],
};

export default RootRouter;
