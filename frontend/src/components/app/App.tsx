import {
  Navigate,
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import SignIn from "../signPages/signInPage/SignIn";
import SignUp from "../signPages/signUpPage/SignUp";
import { store } from "../../store/store";
import WorkoutCalendar from "../workoutCalendar/WorkoutCalendar";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { AppPath } from "../../common/enums/enums";

function App() {
  const Layout = () => (
    <>
      <Header userName="test"/>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );

  const routes: RouteObject[] = [
    {
      path: AppPath.ROOT,
      element: <Layout />,
      children: [
        { path: AppPath.SIGN_IN, element: <SignIn /> },
        { path: AppPath.SIGN_UP, element: <SignUp /> },
        { index: true, element: <WorkoutCalendar /> },
        { path: AppPath.ANY, element: <Navigate to={AppPath.ROOT} replace /> },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
