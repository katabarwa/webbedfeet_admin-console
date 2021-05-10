import { ChangeEvent, FC, useCallback, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
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

  const padNumber = (number: number, size: number) => {
    let numberAsString = number.toString();
    while (numberAsString.length < size) numberAsString = `0${numberAsString}`;
    return numberAsString;
  };

  const timeInSecondsToHms = (timeInSeconds: number | undefined) => {
    let currentTimeInSecondsToHms = "00:00";
    if (timeInSeconds) {
      const timeInSecondsAsNumber = Number(timeInSeconds);

      const hour = Math.floor(timeInSecondsAsNumber / 3600);
      const minute = Math.floor((timeInSecondsAsNumber % 3600) / 60);
      const second = Math.floor((timeInSecondsAsNumber % 3600) % 60);
      const paddedHour = padNumber(hour, 2);
      const paddedMinute = padNumber(minute, 2);
      const paddedSecond = padNumber(second, 2);

      if (hour && hour > 0) {
        currentTimeInSecondsToHms = `${paddedHour}:${paddedMinute}:${paddedSecond}`;
      }

      if (!hour || hour <= 0) {
        currentTimeInSecondsToHms = `${paddedMinute}:${paddedSecond}`;
      }
    }

    return currentTimeInSecondsToHms;
  };

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
        <ConfigDetails />
      </div>
    </div>
  );
};

export default AudioConfig;
