import { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./AudioConfig.scss";

type Props = {
  audioURL: string;
  onClose?: () => void;
};

const AudioConfig: FC<Props> = ({ audioURL, onClose }) => {
  return (
    <div className="audio-config-wrapper">
      <audio id="audio-config-id">
        <source src={audioURL} type="audio/mp3" />
      </audio>
      <div className="audio-config-container">
        <AiOutlineClose
          className="audio-config-close-button"
          onClick={onClose && onClose}
        />
        <div className="audio-config-section">
          <h5>12:34</h5>
        </div>
      </div>
    </div>
  );
};

export default AudioConfig;
