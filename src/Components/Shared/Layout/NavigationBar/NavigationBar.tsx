import Logo from "../../../../Assets/Logo/logo.png";
import "./NavigationBar.scss";

const NavigationBar = () => {
  return (
    <div className="navigation-bar-wrapper">
      <img className="navigation-bar-logo" src={Logo} alt="Webbed Feet Logo" />
    </div>
  );
};

export default NavigationBar;
