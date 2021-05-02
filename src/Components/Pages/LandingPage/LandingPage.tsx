import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./LandingPage.scss";

type TReduxStateSelector = {
  user: any;
};

const LandingPage = () => {
  const user: any = useSelector<TReduxStateSelector>((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (user) history.push("/dashboard");
    if (!user) history.push("/login");
  }, []);

  return <div></div>;
};

export default LandingPage;
