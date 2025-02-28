import Layout from "../layout/Layout";
import MainPage from "../pages/MainPage/MainPage";
import CountrySelect from "../pages/MyTripPage/CountrySelect";
import TargetForm from "../pages/MyTripPage/TargetForm";

import ExchangeRouter from "./ExchangeRouter";

const RootRouter = {
  path: "/",
  element: <Layout />,
  children: [
    { index: true, element: <MainPage /> }, 
    {path:"form", element: <TargetForm/>},
    {path:"country", element: <CountrySelect/>},

    ExchangeRouter],
};

export default RootRouter;
