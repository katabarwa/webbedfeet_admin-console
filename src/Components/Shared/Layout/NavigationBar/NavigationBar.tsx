import { NavLink } from "react-router-dom";
import Logo from "../../../../Assets/Logo/logo.png";
import "./NavigationBar.scss";

const NavigationBar = () => {
  return (
    <div className="navigation-bar-wrapper">
      <img className="navigation-bar-logo" src={Logo} alt="Webbed Feet Logo" />
      <div className="navigation-bar-main-links">
        <NavLink
          className="navigation-bar-link"
          activeClassName="navigation-bar-link-active"
          to="/shows"
        >
          Shows
        </NavLink>
        <NavLink
          className="navigation-bar-link"
          activeClassName="navigation-bar-link-active"
          to="/people"
        >
          People
        </NavLink>
      </div>
    </div>
  );
};

export default NavigationBar;
