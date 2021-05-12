import { FC, useEffect, useState } from "react";
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiX } from "react-icons/fi";
import { TFeedbackType } from "../../../TypescriptUtils/types";
import Button from "../Button/Button";
import Popup from "../Popup/Popup";
import "./FeedbackMessagePopup.scss";

type TFeedbackMessageTextProps = {
  message: string;
  type: TFeedbackType;
  showFeedbackPopup: boolean;
  onClosePopup?: () => void;
};

const FeedbackMessagePopup: FC<TFeedbackMessageTextProps> = ({
  message,
  type,
  showFeedbackPopup,
  onClosePopup,
}) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    setShowPopup(showFeedbackPopup);
  }, [showFeedbackPopup]);

  const onClose = () => {
    setShowPopup(false);
    onClosePopup && onClosePopup();
  };

  const typeClassNames = {
    success: "feedback-message-popup-success",
    error: "feedback-message-popup-error",
    info: "feedback-message-popup-alert",
  };

  return (
    <Popup display={showPopup} onClose={onClose}>
      <div className={`feedback-message-popup-wrapper`}>
        <FiX
          className={`feedback-message-popup-cancel-icon`}
          onClick={onClose}
        />
        {type === "success" && (
          <FiCheckCircle
            className={`feedback-message-popup-icon ${typeClassNames.success}`}
          />
        )}
        {type === "error" && (
          <FiXCircle
            className={`feedback-message-popup-icon ${typeClassNames.error}`}
          />
        )}
        {type === "info" && (
          <FiAlertCircle
            className={`feedback-message-popup-icon ${typeClassNames.info}`}
          />
        )}

        <h2 className={`feedback-message-popup-title ${typeClassNames[type]}`}>
          {type.toUpperCase()}
        </h2>
        <p className={`feedback-message-popup-message`}>{message}</p>
        <div className={`feedback-message-popup-buttons`}>
          <Button
            className="feedback-message-popup-button"
            label="OKAY"
            name="okay"
            onClick={onClose}
          />
        </div>
      </div>
    </Popup>
  );
};

export default FeedbackMessagePopup;
