import { createBrowserRouter } from "react-router-dom";

import AuthRouter from "./AuthRouter";

import MainRouter from "./MainRouter";
import TripRouter from "./TripRouter";
import ExchangeRouter from "./ExchangeRouter";
import UserRouter from "./UserRouter";

const router = createBrowserRouter([
  AuthRouter,
  MainRouter,
  TripRouter,
  ExchangeRouter,
  UserRouter,
]);

export default router;
