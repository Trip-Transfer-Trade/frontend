import { createBrowserRouter } from "react-router-dom";

import RootRouter from "./RootRouter";
import AuthRouter from "./AuthRouter";
import StockRouter from "./StockRouter";

const router = createBrowserRouter([RootRouter, AuthRouter, StockRouter]);

export default router;
