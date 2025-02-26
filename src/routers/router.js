import { createBrowserRouter } from "react-router-dom";

import RootRouter from "./RootRouter";
import AuthRouter from "./AuthRouter";
import StockRouter from "./StockRouter";
import TripRouter from "./TripRouter";

const router = createBrowserRouter([RootRouter, AuthRouter,TripRouter, StockRouter]);

export default router;
