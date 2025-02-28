import FailedPage from "../pages/MyTripPage/TripGoal/FailedPage";
import SuccessPage from "../pages/MyTripPage/TripGoal/SuccessPage";
import InfoPage from "../pages/MyTripPage/TripGoal/InfoPage";
import SuccessDetailPage from "../pages/MyTripPage/TripGoal/SuccessDetailPage";

const TripRouter = {
  path: "/trip",
  children: [
    { path:"failed", element : <FailedPage/>},
    { path:"success", element : <SuccessPage />},
    { path:"info", element : <InfoPage />},
    { path:"success/detail", element : <SuccessDetailPage />}
  ],
};

export default TripRouter;
