import { createBrowserRouter } from "react-router-dom";
import StockPage from "../pages/StockPage/StockPage";
import StockTradingPage from "../pages/StockPage/StockTradingPage";

const StockRouter = [{
    path: "/",
    children: [
        { path: "stock", element: <StockPage /> },
        { path: "stock/buy", element: <StockTradingPage /> },
        { path: "stock/sell", element: <StockTradingPage /> },
    ]
}];

export default StockRouter;
