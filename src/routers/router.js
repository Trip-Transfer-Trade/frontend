import { createBrowserRouter } from "react-router-dom";

import RootRouter from "./RootRouter";
import AuthRouter from "./AuthRouter";
import TripRouter from "./TripRouter";

const router = createBrowserRouter([RootRouter, AuthRouter,TripRouter]);

export default router;
