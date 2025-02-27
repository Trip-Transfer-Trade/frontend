import FailedPage from "../pages/MyTripPage/FailedPage";
import SuccessPage from "../pages/MyTripPage/SuccessPage";
import InfoPage from "../pages/MyTripPage/InfoPage";
import SuccessDetailPage from "../pages/MyTripPage/SuccessDetailPage";

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
