import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect, useState } from "react";
import { fetchAuthenticatedUser } from "../../store/auth/actions";
import { getToken } from "../../utils/auth";
import { createRoutes } from "./components/routerConfig/RouterConfig";
import Loader from "../loader/Loader";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, status: authStatus } = useAppSelector((state: RootState) => state.auth);
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  const isLoading = !authChecked || authStatus === "pending"

  useEffect(() => {
    const checkAuth = async () => {
      if (getToken()) {
        await dispatch(fetchAuthenticatedUser());
      }
      setAuthChecked(true);
    };
    checkAuth();
  }, [dispatch]);

  const routes = createRoutes({
    user,
    authChecked,
  });

  const router = createBrowserRouter(routes);

  if (isLoading) {
    return <Loader />;
  }

  return <RouterProvider router={router} />;
}

export default App;