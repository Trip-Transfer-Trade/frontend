import Footer from "../layout/Footer";
import StockPage from "../pages/StockPage/StockPage";

const StockRouter = {
    path: "/stock",
    children: [
        { index: true, element: <StockPage />},
    ]

};

export default StockRouter;