import FailedPage from "../pages/MyTripPage/TripGoal/FailedPage";
import SuccessPage from "../pages/MyTripPage/TripGoal/SuccessPage";
import InfoPage from "../pages/MyTripPage/TripGoal/InfoPage";
import SuccessDetailPage from "../pages/MyTripPage/TripGoal/SuccessDetailPage";
import ExchangeMethodPage from "../pages/ExchangePage/ExchangeMethodPage";
import MyTripPage from "../pages/MyTripPage/MyTripPage";

import PortfolioPage from "../pages/PortfolioPage/PortfolioPage";
// import TripListPage from "../pages/MyTripPage/TripListPage";
// import Home from "../pages/PortfolioPage/page";
// import TripEditPage from "../pages/MyTripPage/TripEditpage";
// import RankingPage from "../pages/PortfolioPage/RankingPage";
const TripRouter = {
  path: "/trip",
  children: [
    { path:"failed", element : <FailedPage/>},
    { path:"success", element : <SuccessPage />},
    { path:"info", element : <InfoPage />},
    { path:"success/detail", element : <SuccessDetailPage />},
    { path:"exchange", element : <ExchangeMethodPage />},
    { index:true, element:<MyTripPage />},
    { path:"success/detail", element : <SuccessDetailPage />},
    { path:"portfolio", element : <PortfolioPage/>},
    // { path:"list", element : <TripListPage/>},
    // { path:"test", element : <Home/>},
    // { path:"edit", element : <TripEditPage/>},
    // { path:"portfolio/rank", element : <RankingPage/>}
  ],
};

export default TripRouter;
