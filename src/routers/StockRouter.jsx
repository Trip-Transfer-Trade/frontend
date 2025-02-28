import { createBrowserRouter } from "react-router-dom";
import StockPage from "../pages/StockPage/StockPage";
import StockTradingPage from "../pages/StockPage/StockTradingPage";

const StockRouter = [{
    path: "/",
    children: [
        { path: "stocks", element: <StockPage /> },
        { path: "stocks/:trademode", element: <StockTradingPage /> },
    ]
}];

export default StockRouter;
