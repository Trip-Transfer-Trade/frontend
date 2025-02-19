import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage"
import Layout from "../layout/Layout";

const router = createBrowserRouter([
    {
      path: "/",
        element: <Layout />, 
        children: [
          { index: true, element: <MainPage /> }, 
          //{ path: "login", element: <LoginPage /> }
        ]
        
    },
]);

export default router;