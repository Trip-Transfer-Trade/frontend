import FailedPage from "../pages/MyTripPage/FailedPage";
import SuccessPage from "../pages/MyTripPage/SuccessPage";
import InfoPage from "../pages/MyTripPage/InfoPage";

const TripRouter = {
  path: "/trip",
  children: [
    { path:"failed", element : <FailedPage/>},
    { path:"success", element : <SuccessPage />},
    { path:"info", element : <InfoPage />} 
  ],
};

export default TripRouter;
