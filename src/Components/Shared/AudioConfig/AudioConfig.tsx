import { ChangeEvent, FC, useCallback, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import timeInSecondsToHms from "../../../Functions/timeInSecondsToHms";
import Gap from "../Gap/Gap";
import "./AudioConfig.scss";
import ConfigDetails from "./ConfigDetails/ConfigDetails";

type TAudioConfigProps = {
  audioURL: string;
};

const AudioConfig: FC<TAudioConfigProps> = ({ audioURL }) => {
  const [playingAudio, setPlayingAudio] = useState<boolean>(false);
  const [
    currentAudioElement,
    setCurrentAudioElement,
  ] = useState<HTMLAudioElement | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);

  const audioRef = useCallback((audioElement) => {
    if (audioElement !== null) {
      setTimeout(() => {
        setAudioDuration(audioElement.duration);
        setAudioCurrentTime(audioElement.currentTime);
        setCurrentAudioElement(audioElement);
      }, 100);
    }
  }, []);

  const playAudio = () => {
    setPlayingAudio(true);
    currentAudioElement?.play();
  };

  const pauseAudio = () => {
    setPlayingAudio(false);
    currentAudioElement?.pause();
  };

  const handleAudioCurrentTime = () => {
    if (currentAudioElement !== null)
      setAudioCurrentTime(currentAudioElement.currentTime);
  };

  const handleSliderValue = (event: ChangeEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const currentAudioTime = (event.target as any).value;
    if (currentAudioElement !== null)
      currentAudioElement.currentTime = currentAudioTime;
    playAudio();
    setAudioCurrentTime(currentAudioTime);
  };

  const handleSliderPosition = () => {
    pauseAudio();
  };

  const handleConfigDetailsValue = (value: number) => {
    if (currentAudioElement !== null) currentAudioElement.currentTime = value;
    playAudio();
    setAudioCurrentTime(value);
  };

  return (
    <div className="audio-config-wrapper">
      <audio
        id="audio-config-id"
        ref={audioRef}
        onTimeUpdate={handleAudioCurrentTime}
        onEnded={pauseAudio}
      >
        <source src={audioURL} type="audio/mp3" />
      </audio>
      <div className="audio-config-section">
        <h5>{`${timeInSecondsToHms(audioCurrentTime)} / ${timeInSecondsToHms(
          audioDuration
        )}`}</h5>
        <div className="audio-config-audio-player">
          {!playingAudio && (
            <FaPlay
              className="audio-config-audio-play-pause-button"
              onClick={playAudio}
            />
          )}
          {playingAudio && (
            <FaPause
              className="audio-config-audio-play-pause-button"
              onClick={pauseAudio}
            />
          )}
          <input
            className="audio-config-audio-player-slider"
            type="range"
            min={0}
            max={audioDuration}
            value={audioCurrentTime}
            onChange={handleSliderValue}
            onDoubleClick={() => handleSliderPosition()}
          ></input>
        </div>
        <Gap />
        <ConfigDetails
          currenTime={audioCurrentTime}
          maxTime={audioDuration}
          minTime={0}
          onChangeTime={handleConfigDetailsValue}
        />
      </div>
    </div>
  );
};

export default AudioConfig;
