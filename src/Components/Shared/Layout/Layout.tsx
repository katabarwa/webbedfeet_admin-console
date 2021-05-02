import { FC, ReactNode } from "react";
import Footer from "./Footer/Footer";
import NavigationBar from "./NavigationBar/NavigationBar";
import "./Layout.scss";

type Props = {
  includeNavBar?: boolean;
  children: ReactNode;
  layoutClassName?: string;
};

const Layout: FC<Props> = ({
  includeNavBar = true,
  children,
  layoutClassName = "",
}) => {
  return (
    <div className={`layout-wrapper ${layoutClassName}`}>
      {includeNavBar && <NavigationBar />}
      <div className="layout-children">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
