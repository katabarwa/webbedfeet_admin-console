import { FC, ReactNode, useEffect, useState } from "react";
import ClickedOutsideAnElementHandler from "../ClickedOutsideAnElementHandler/ClickedOutsideAnElementHandler";
import "./Popup.scss";

type Props = {
  display: boolean;
  justify?: "flex-start" | "center" | "flex-end";
  align?: "flex-start" | "center" | "flex-end";
  boxShadow?: boolean;
  onClose: () => void;
  allowCloseOnClickOutside?: boolean;
  children?: ReactNode;
};

const Popup: FC<Props> = ({
  display,
  justify,
  align,
  boxShadow = true,
  onClose,
  allowCloseOnClickOutside = true,
  children,
}) => {
  const [showPopup, setShowPopup] = useState(display);

  useEffect(() => {
    setShowPopup(display);
  }, [display]);

  const handleClosePopup = () => {
    setShowPopup(false);
    onClose();
  };

  return (
    <div
      className="popup-wrapper"
      style={{
        display: showPopup ? "flex" : "none",
        alignItems: align,
        justifyContent: justify,
      }}
    >
      <ClickedOutsideAnElementHandler
        onClickedOutside={
          allowCloseOnClickOutside ? handleClosePopup : () => console.log()
        }
      >
        <div
          id="cc-m"
          className={`popup-modal ${boxShadow && "popup-modal-box-shadow"}`}
        >
          {children}
        </div>
      </ClickedOutsideAnElementHandler>
    </div>
  );
};

export default Popup;
