import LoginModal from "../pages/LoginPage/LoginModal";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupFlow from "../pages/SignUpPage/SignupFlow";

const AuthRouter = {
  path: "/auth",
  children: [
    { path: "login", element: <LoginPage /> },
    { path: "signup", element: <SignupFlow /> },
  ],
};

export default AuthRouter;
