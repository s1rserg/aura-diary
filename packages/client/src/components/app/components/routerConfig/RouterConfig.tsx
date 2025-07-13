import { RouteObject, Navigate } from 'react-router-dom';
import { AppPath } from '../../../../common/enums/enums';
import { User } from '../../../../common/types/types';
import Layout from '../layout/Layout';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import Leaderboard from '../../../leaderboard/Leaderboard';
import SignIn from '../../../../pages/auth/sign-in/SignIn';
import SignUp from '../../../../pages/auth/sign-up/SignUp';
import FriendsPage from '../../../../pages/friends/FriendsPage';
import MainPage from '../../../../pages/main/MainPage';
import StatsPage from '../../../../pages/stats/StatsPage';

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
    element: <Layout userName={user?.name} />,
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
        element: (
          <ProtectedRoute
            user={user}
            authChecked={authChecked}
            element={<MainPage />}
          />
        ),
      },
      {
        path: AppPath.FRIENDS,
        element: (
          <ProtectedRoute
            user={user}
            authChecked={authChecked}
            element={<FriendsPage />}
          />
        ),
      },
      {
        path: AppPath.STATS,
        element: (
          <ProtectedRoute
            user={user}
            authChecked={authChecked}
            element={<StatsPage />}
          />
        ),
      },
      {
        path: AppPath.LEADERBOARD,
        element: (
          <ProtectedRoute
            user={user}
            authChecked={authChecked}
            element={<Leaderboard />}
          />
        ),
      },
      { path: AppPath.ANY, element: <Navigate to={AppPath.ROOT} replace /> },
    ],
  },
];
