import TopPortfolio from "../pages/MainPage/TopPortfolio";
import RecommendedDestination from "../pages/MainPage/RecommendedDestination";

const HomeRouter = {
  path: "/",
  children: [
    { path: "top", element: <TopPortfolio /> },
    { path: "destination", element: <RecommendedDestination /> },
  ],
};

export default HomeRouter;
