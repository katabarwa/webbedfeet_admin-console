import { useEffect, useState } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import LandingPage from "./Components/Pages/LandingPage/LandingPage";
import LoginPage from "./Components/Pages/LoginPage/LoginPage";
import ForgotPasswordPage from "./Components/Pages/ForgotPasswordPage/ForgotPasswordPage";
import ChangePasswordPage from "./Components/Pages/ChangePasswordPage/ChangePasswordPage";
import PageNotFound from "./Components/Pages/PageNotFound/PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "./Functions/apiRequest";
import Loader from "./Components/Shared/Loader/Loader";
import "./App.scss";
import ShowsPage from "./Components/Pages/ShowsPage/ShowsPage";
import PeoplePage from "./Components/Pages/PeoplePage/PeoplePage";

type TReduxStateSelector = {
  user: any;
};

const App = () => {
  const user: any = useSelector<TReduxStateSelector>((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(true);
      const checkUserLoginStatus = async () => {
        let response = await apiRequest("/user/profile", "GET");
        if (response.success) {
          dispatch({ type: "user", value: response.data });
        }
        setIsLoading(false);
      };

      checkUserLoginStatus();
    }
  }, []);

  const authenticatedRoute = (page: any) => {
    if (!user || !(user.type === "admin" || user.type === "super-admin")) {
      return LoginPage;
    }
    return page;
  };

  return isLoading ? (
    <Loader loaderWrapperClassName="app-loader" />
  ) : (
    <BrowserRouter>
      <Switch>
        <Route
          exact={true}
          path="/"
          component={authenticatedRoute(LandingPage)}
        />
        <Route exact={true} path="/login" component={LoginPage} />
        <Route
          exact={true}
          path="/forgot-password"
          component={ForgotPasswordPage}
        />
        <Route
          exact={true}
          path="/change-password"
          component={ChangePasswordPage}
        />
        <Route
          exact={true}
          path="/shows"
          component={authenticatedRoute(ShowsPage)}
        />
        <Route
          exact={true}
          path="/people"
          component={authenticatedRoute(PeoplePage)}
        />
        <Route exact={true} path="/404" component={PageNotFound} />
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
