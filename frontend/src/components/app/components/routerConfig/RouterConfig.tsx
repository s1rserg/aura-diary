import { RouteObject, Navigate } from "react-router-dom";
import { AppPath } from "../../../../common/enums/enums";
import { User } from "../../../../common/types/types";
import MainPage from "../../../mainPage/MainPage";
import SignIn from "../../../signPages/signInPage/SignIn";
import SignUp from "../../../signPages/signUpPage/SignUp";
import Layout from "../layout/Layout";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";


interface RouterConfigProps {
  user: User | null;
  authChecked: boolean;
}

export const createRoutes = ({
  user,
  authChecked,
}: RouterConfigProps): RouteObject[] => [
  {
    path: AppPath.ROOT,
    element: (
      <Layout
        userName={user?.name}
      />
    ),
    children: [
      {
        path: AppPath.SIGN_IN,
        element: user ? <Navigate to="/" /> : <SignIn />,
      },
      {
        path: AppPath.SIGN_UP,
        element: user ? <Navigate to="/" /> : <SignUp />,
      },
      {
        index: true,
        element: <ProtectedRoute user={user} authChecked={authChecked} element={<MainPage />} />,
      },
      { path: AppPath.ANY, element: <Navigate to={AppPath.ROOT} replace /> },
    ],
  },
];