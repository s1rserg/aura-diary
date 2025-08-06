import { RouteObject, Navigate } from 'react-router-dom';
import { AppPath } from '~/common/enums/enums';
import Layout from '../layout/layout';
import ProtectedRoute from '../protected-route/protected-route';
import { NotFound } from '~/pages/not-found/not-found';
import { UserDto } from '~/common/types/types';
import { Auth } from '~/pages/auth/auth';
import { Main } from '~/pages/main/main';
import { Exercises } from '~/pages/exercises/exercises';
import { Exercise } from '../../../../pages/exercise/exercise';
import { Workouts } from '../../../../pages/workouts/workouts';
import StatsPage from '../../../../pages/stats/stats';

interface RouterConfigProps {
  user: UserDto | null;
  authChecked: boolean;
}

export const createRoutes = ({
  user,
  authChecked,
}: RouterConfigProps): RouteObject[] => [
  {
    path: AppPath.ROOT,
    element: <Layout />,
    children: [
      {
        path: AppPath.SIGN_IN,
        element: user ? <Navigate to="/" /> : <Auth />,
      },
      {
        path: AppPath.SIGN_UP,
        element: user ? <Navigate to="/" /> : <Auth />,
      },
      {
        index: true,
        element: <Main user={user} />,
      },
      {
        path: AppPath.EXERCISES,
        element: (
          <ProtectedRoute
            user={user}
            authChecked={authChecked}
            element={<Exercises />}
          />
        ),
      },
      {
        path: AppPath.EXERCISE,
        element: (
          <ProtectedRoute
            user={user}
            authChecked={authChecked}
            element={<Exercise />}
          />
        ),
      },
      {
        path: AppPath.WORKOUTS,
        element: (
          <ProtectedRoute
            user={user}
            authChecked={authChecked}
            element={<Workouts />}
          />
        ),
      },
      {
        path: AppPath.STATS,
        element: (
          <ProtectedRoute
            user={user}
            authChecked={authChecked}
            element={<StatsPage userId={user?.id} />}
          />
        ),
      },
      {
        path: AppPath.ANY,
        element: <NotFound />,
      },
    ],
  },
];
