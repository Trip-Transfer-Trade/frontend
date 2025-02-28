import LoginPage from "../pages/LoginPage/LoginPage";
import SignupProfilePage from "../pages/SignUpPage/SignupProfilePage";
import SignupVerificationPage from "../pages/SignUpPage/SignupVerificationPage";
import SignupAccountPage from "../pages/SignUpPage/SignupAccountPage";
import SignupCompletePage from "../pages/SignUpPage/SignupCompletePage";

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
