import { FC } from "react";
import "./FeedbackMessageText.scss";

type TFeedbackMessageTextProps = {
  message: string;
  type: "error" | "success";
  feedbackMessageClassName?: string;
};

const FeedbackMessageText: FC<TFeedbackMessageTextProps> = ({
  message,
  type,
  feedbackMessageClassName,
}) => {
  return (
    <small
      className={`feedback-message-text ${feedbackMessageClassName} ${
        type === "error" ? "feedback-message-text-error" : ""
      } ${type === "success" ? "feedback-message-text-success" : ""}`}
    >
      {message}
    </small>
  );
};

export default FeedbackMessageText;
