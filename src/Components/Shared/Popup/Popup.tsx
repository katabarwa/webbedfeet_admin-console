import { FC, ReactNode, useEffect, useState } from "react";
import ClickedOutsideAnElementHandler from "../ClickedOutsideAnElementHandler/ClickedOutsideAnElementHandler";
import "./Popup.scss";

type Props = {
  display: boolean;
  justify?: "flex-start" | "center" | "flex-end";
  align?: "flex-start" | "center" | "flex-end";
  boxShadow?: boolean;
  onClose: () => void;
  children?: ReactNode;
};

const Popup: FC<Props> = ({
  display,
  justify,
  align,
  boxShadow = true,
  onClose,
  children,
}) => {
  const [showPopup, setShowPopup] = useState(display);

  useEffect(() => {
    setShowPopup(display);
  }, [display]);

  const handleClosePopup = () => {
    console.log("here");
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
      <ClickedOutsideAnElementHandler onClickedOutside={handleClosePopup}>
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
