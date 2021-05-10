import { FC, ReactNode } from "react";
import Footer from "./Footer/Footer";
import NavigationBar from "./NavigationBar/NavigationBar";
import "./Layout.scss";

type Props = {
  includeNavBar?: boolean;
  children: ReactNode;
  childrenFixedHeight?: boolean;
  layoutClassName?: string;
  includeFooter?: boolean;
};

const Layout: FC<Props> = ({
  includeNavBar = true,
  includeFooter = true,
  children,
  childrenFixedHeight = false,
  layoutClassName = "",
}) => {
  return (
    <div className={`layout-wrapper ${layoutClassName}`}>
      {includeNavBar && <NavigationBar />}
      <div
        className={`${
          childrenFixedHeight && "layout-children-fixed-height"
        } layout-children`}
      >
        {children}
      </div>
      {includeFooter && <Footer />}
    </div>
  );
};

export default Layout;
