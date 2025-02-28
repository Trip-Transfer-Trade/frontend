import FailedPage from "../pages/MyTripPage/TripGoal/FailedPage";
import SuccessPage from "../pages/MyTripPage/TripGoal/SuccessPage";
import InfoPage from "../pages/MyTripPage/TripGoal/InfoPage";
import SuccessDetailPage from "../pages/MyTripPage/TripGoal/SuccessDetailPage";
import ExchangeMethodPage from "../pages/ExchangePage/ExchangeMethodPage";
import MyTripPage from "../pages/MyTripPage/MyTripPage";

const TripRouter = {
  path: "/trip",
  children: [
    { path:"failed", element : <FailedPage/>},
    { path:"success", element : <SuccessPage />},
    { path:"info", element : <InfoPage />},
    { path:"success/detail", element : <SuccessDetailPage />},
    { path:"exchange", element : <ExchangeMethodPage />},
    { index:true, element:<MyTripPage />}
  ],
};

export default TripRouter;
