import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router";
import { AuthProvider } from "./\bcontext/AuthProvider";

function App() {
  return(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
