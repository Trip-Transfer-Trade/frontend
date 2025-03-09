import InfoPage from "../pages/MyTripPage/TripGoal/InfoPage";

import PortfolioPage from "../pages/PortfolioPage/PortfolioPage";
import RankingPage from "../pages/PortfolioPage/RankingPage";

import FailedPage from "../pages/MyTripPage/TripGoal/FailedPage";
import SuccessPage from "../pages/MyTripPage/TripGoal/SuccessPage";
import SuccessDetailPage from "../pages/MyTripPage/TripGoal/SuccessDetailPage";

import StockPage from "../pages/StockPage/StockPage";
import StockTradingPage from "../pages/StockPage/StockTradingPage";
import TripGoalSetup from "../pages/MyTripPage/TripGoal/TripGoalFlow";
import GoalProgressPage from "../pages/PortfolioPage/GoalProgressPage";
import TripEditPage from "../pages/PortfolioPage/TripEditPage";

const TripRouter = {
  path: "/trip",
  children: [
    // 여행 목표 생성 
    { path: "tripgoal", element: <TripGoalSetup /> },
    { path: "service/info", element: <InfoPage /> },

    // 포트폴리오
    { path: ":tripId/portfolio", element: <PortfolioPage /> },
    { path: ":tripId/portfolio/progress", element: <GoalProgressPage /> },
    { path: ":tripId/portfolio/progress/edit", element: <TripEditPage /> },
    { path: ":tripId/portfolio/rank", element: <RankingPage /> },

    // 여행 목표 성공&실패
    { path: ":tripGoal/failed", element: <FailedPage /> },
    { path: ":tripGoal/success", element: <SuccessPage /> },
    { path: ":tripGoal/success/detail", element: <SuccessDetailPage /> },

    // 투자하기
    { path: ":tripGoal/stocks", element: <StockPage /> },
    {
      path: ":tripGoal/stocks/buy",
      element: <StockTradingPage type="buy" />,
    },
    {
      path: ":tripGoal/stocks/sell",
      element: <StockTradingPage type="sell" />,
    },
  ],
};

export default TripRouter;
