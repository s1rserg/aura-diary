import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import SignIn from "../signPages/signInPage/SignIn";
import SignUp from "../signPages/signUpPage/SignUp";
import { store } from "../../store/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
