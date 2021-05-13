import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import timeInSecondsToHms from "../../../Functions/timeInSecondsToHms";
import Button from "../Button/Button";
import Gap from "../Gap/Gap";
import lodash from "lodash";
import ConfigDetails from "./ConfigDetails/ConfigDetails";
import "./AudioConfig.scss";

type TAudioConfigProps = {
  audioURL: string;
  audioConfigData: { [key: string]: any }[];
  audioLength?: number;
  onSubmitAudioDuration: (audioDuration: number) => void;
  onSubmitAudioConfigData: (audioConfigData: { [key: string]: any }[]) => void;
};

const AudioConfig: FC<TAudioConfigProps> = ({
  audioURL,
  audioConfigData,
  audioLength,
  onSubmitAudioDuration,
  onSubmitAudioConfigData,
}) => {
  const [newAudioData, setNewAudioData] = useState<boolean>(false);
  const [playingAudio, setPlayingAudio] = useState<boolean>(false);
  const [currentAudioElement, setCurrentAudioElement] =
    useState<HTMLAudioElement | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  const [playInterval, setPlayInterval] = useState<{ [key: string]: number }>({
    from: 0,
    to: 0,
  });
  const [activeConfigTabIndex, setActiveConfigTabIndex] = useState<number>(-1);
  const [activeConfigData, setActiveConfigData] =
    useState<{ [key: string]: any } | null>(null);

  useEffect(() => {
    if (!audioLength) {
      onSubmitAudioDuration(audioDuration);
    }
  }, [audioDuration]);

  const audioRef = useCallback((audioElement) => {
    if (audioElement !== null) {
      setTimeout(() => {
        setAudioDuration(audioElement.duration);
        setAudioCurrentTime(audioElement.currentTime);
        setCurrentAudioElement(audioElement);
        setPlayInterval({ from: 0, to: audioElement.duration });
      }, 100);
    }
  }, []);

  const playAudio = () => {
    if (currentAudioElement !== null)
      currentAudioElement.currentTime = playInterval.from;
    setAudioCurrentTime(playInterval.from);
    setPlayingAudio(true);
    currentAudioElement?.play();
  };

  const pauseAudio = () => {
    setPlayingAudio(false);
    currentAudioElement?.pause();
  };

  const handleAudioCurrentTime = () => {
    if (currentAudioElement !== null) {
      setAudioCurrentTime(currentAudioElement.currentTime);
      if (currentAudioElement.currentTime > playInterval.to) {
        pauseAudio();
        currentAudioElement.currentTime = playInterval.from;
        setAudioCurrentTime(playInterval.from);
      }
    }
  };

  const handleSliderValue = (event: ChangeEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const currentAudioTime = (event.target as any).value;
    if (currentAudioElement !== null)
      currentAudioElement.currentTime = currentAudioTime;
    pauseAudio();
    setAudioCurrentTime(currentAudioTime);
  };

  const handleSliderPosition = () => {
    pauseAudio();
  };

  const handleConfigDetailsValue = (value: number) => {
    if (currentAudioElement !== null) currentAudioElement.currentTime = value;
    pauseAudio();
    setAudioCurrentTime(value);
  };

  const handleSubmitAudioConfigData = (
    currentAudioData: { [key: string]: any },
    index: number = -1
  ) => {
    let copyOfAudioConfigData: { [key: string]: any }[] = [];
    if (index === -1) {
      if (audioConfigData)
        copyOfAudioConfigData = lodash.cloneDeep(audioConfigData);
      copyOfAudioConfigData.push(currentAudioData);
    }

    if (index !== -1) {
      copyOfAudioConfigData = lodash.cloneDeep(audioConfigData);
      copyOfAudioConfigData[index] = currentAudioData;
    }

    onSubmitAudioConfigData(copyOfAudioConfigData);
    setNewAudioData(false);
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
        <div className="audio-config-details-container">
          <div className="audio-config-details-container-left-section">
            {
              <Button
                className={`${newAudioData && "audio-config-tab-active"}`}
                label={newAudioData ? "New Audio Data" : "Add New Audio Data"}
                name="audioData"
                maxWidth={newAudioData}
                borderRadius={!newAudioData}
                onClick={() => {
                  setActiveConfigTabIndex(-1);
                  setNewAudioData(true);
                }}
              />
            }
            <Gap height="30px" />

            {audioConfigData?.map(
              (configData: { [key: string]: any }, index: number) => (
                <Button
                  key={index}
                  className={`audio-config-tab ${
                    activeConfigTabIndex === index && "audio-config-tab-active"
                  }`}
                  label={`Audio Configuration #${index + 1}`}
                  name={`AudioConfig#${index + 1}`}
                  borderRadius={false}
                  onClick={() => {
                    setNewAudioData(false);
                    setActiveConfigTabIndex(index);
                    setActiveConfigData(configData);
                  }}
                />
              )
            )}
          </div>
          <div className="audio-config-details-container-right-section">
            {audioDuration && (newAudioData || activeConfigTabIndex !== -1) && (
              <ConfigDetails
                activeConfigData={newAudioData ? {} : activeConfigData}
                activeConfigDataIndex={activeConfigTabIndex + 1}
                currenTime={audioCurrentTime}
                initialFromTime={
                  activeConfigData?.timeInterval?.from
                    ? activeConfigData.timeInterval.from
                    : 0
                }
                initialToTime={
                  activeConfigData?.timeInterval?.to
                    ? activeConfigData.timeInterval.to
                    : audioDuration
                }
                maxTime={audioDuration}
                minTime={0}
                playingAudio={playingAudio}
                onPlayAudio={playAudio}
                onPauseAudio={pauseAudio}
                onChangePlayInterval={(pi) => setPlayInterval(pi)}
                onChangeTime={handleConfigDetailsValue}
                onCancel={() => setNewAudioData(false)}
                onSubmit={(ad) =>
                  handleSubmitAudioConfigData(ad, activeConfigTabIndex)
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioConfig;
