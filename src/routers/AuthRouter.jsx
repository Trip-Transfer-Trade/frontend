import LoginPage from "../pages/LoginPage/LoginPage";
import SignupProfilePage from "../pages/SignupPage/SignupProfilePage";
import SignupVerificationPage from "../pages/SignupPage/SignupVerificationPage";
import SignupAccountPage from "../pages/SignupPage/SignupAccountPage";
import SignupCompletePage from "../pages/SignupPage/SignupCompletePage";

const AuthRouter = {
  path: "/auth",
  children: [
    { path: "login", element: <LoginPage /> },
    {
      path: "signup",
      children: [
        { path: "profile", element: <SignupProfilePage /> },
        { path: "verification", element: <SignupVerificationPage /> },
        { path: "account", element: <SignupAccountPage /> },
        { path: "complete", element: <SignupCompletePage /> },
      ],
    },
  ],
};
export default AuthRouter;
