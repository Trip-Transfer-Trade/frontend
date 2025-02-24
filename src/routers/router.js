import { createBrowserRouter } from "react-router-dom";

import RootRouter from "./RootRouter";
import AuthRouter from "./AuthRouter";

const router = createBrowserRouter([RootRouter, AuthRouter]);

export default router;
