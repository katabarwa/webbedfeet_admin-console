import { FC } from "react";
import ReactLoading from "react-loading";
import "./Loader.scss";

type TFeedbackMessageTextProps = {
  loaderWrapperClassName?: string;
};

const Loader: FC<TFeedbackMessageTextProps> = ({ loaderWrapperClassName }) => {
  return (
    <div className="loader-wrapper">
      <div className={`loader-container ${loaderWrapperClassName}`}>
        <ReactLoading
          type="spin"
          color="#000000"
          height={"100%"}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default Loader;
