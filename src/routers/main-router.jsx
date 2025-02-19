import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import MainPage from "../pages/MainPage/MainPage"
import LoginPage from "../pages/LoginPage/LoginPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, 
        children: [
          { index: true, element: <MainPage /> }, 
          { path: "login", element: <LoginPage /> },
        //   { path: "signup", element: <SignUpPage /> },
        //   { path: "login", element: <LoginPage /> },
        //   { path: "trip", element: <MyTripPage /> },
        //   { path: "portfolio", element: <PortfolioPage /> },
        //   { path: "exchange", element: <ExchangePage /> }
        ]
    },
]);

export default router;