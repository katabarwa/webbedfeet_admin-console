import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chip from "../../Chip/Chip";
import Gap from "../../Gap/Gap";
import ListDropDown from "../../ListDropDown/ListDropDown";
import apiRequest from "../../../../Functions/apiRequest";
import Loader from "../../Loader/Loader";
import lodash from "lodash";
import TextAreaBox from "../../TextAreaBox/TextAreaBox";
import NumberBox from "../../NumberBox/NumberBox";
import Button from "../../Button/Button";
import { FaPause, FaPlay } from "react-icons/fa";
import "./ConfigDetails.scss";

type TReduxStateSelector = {
  people: any;
};

interface TConfigDetailsProps {
  currenTime: number;
  initialFromTime: number;
  initialToTime: number;
  maxTime: number;
  minTime?: number;
  playingAudio: boolean;
  onPlayAudio: () => void;
  onPauseAudio: () => void;
  onChangeTime?: (time: number) => void;
}

const ConfigDetails: FC<TConfigDetailsProps> = ({
  currenTime,
  initialFromTime,
  initialToTime,
  maxTime,
  minTime = 0,
  playingAudio,
  onPlayAudio,
  onPauseAudio,
  onChangeTime,
}) => {
  const people: any = useSelector<TReduxStateSelector>((state) => state.people);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioData, setAudioData] = useState<{ [key: string]: any }>({});
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [startTimeActive, setStartTimeActive] = useState<boolean>(false);
  const [endTimeActive, setEndTimeActive] = useState<boolean>(false);

  useEffect(() => {
    if (!people) {
      setIsLoading(true);
      const retrieveShows = async () => {
        let response = await apiRequest("/people", "GET");
        if (response.success) {
          dispatch({ type: "people", value: response.data });
        }
        setIsLoading(false);
      };

      retrieveShows();
    }

    setStartTime(initialFromTime);
    setEndTime(initialToTime);
  }, []);

  useEffect(() => {
    if (startTimeActive) setStartTime(currenTime);
    if (endTimeActive) setEndTime(currenTime);
  }, [currenTime]);

  //Update audio data with to person
  const onSelectPeople = (selectedConnections: string[]) => {
    const copyOfAudioData = lodash.cloneDeep(audioData);
    copyOfAudioData.people = selectedConnections;
    setAudioData(copyOfAudioData);
  };

  //Delete person from audio data
  const handleDeletePerson = (currentPersonIndex: number) => {
    const copyOfAudioData = lodash.cloneDeep(audioData);
    const currentPeople = lodash.cloneDeep(copyOfAudioData.people);
    currentPeople.splice(currentPersonIndex, 1);
    copyOfAudioData.people = currentPeople;
    setAudioData(copyOfAudioData);
  };

  //Update audio data with links
  const handleInput = (event: ChangeEvent) => {
    const inputValue = (event.target as any).value;
    const inputName = (event.target as any).name;
    const copyOfAudioData = lodash.cloneDeep(audioData);
    copyOfAudioData[inputName] = inputValue;
    setAudioData(copyOfAudioData);
  };

  return isLoading ? (
    <Loader loaderWrapperClassName="config-details-loader" />
  ) : (
    <div className="config-details-wrapper">
      <h5>Map Audio Data</h5>

      <div className="config-details-time-container">
        <div className="config-details-audio-control">
          <p className="config-details-person-audio-data-title">.</p>
          {!playingAudio && (
            <FaPlay
              className="config-details-audio-play-pause-button"
              onClick={onPlayAudio}
            />
          )}
          {playingAudio && (
            <FaPause
              className="config-details-audio-play-pause-button"
              onClick={onPauseAudio}
            />
          )}
        </div>

        <div className="config-details-time-input">
          <p className="config-details-person-audio-data-title">Start</p>
          <NumberBox
            name="start"
            initialNumber={startTime}
            value={startTime}
            minNumber={minTime}
            maxNumber={endTime}
            isActive={(v) => setStartTimeActive(v)}
            onChange={(v) => onChangeTime && onChangeTime(v)}
          />
        </div>
        <div className="config-details-time-input">
          <p className="config-details-person-audio-data-title">End</p>
          <NumberBox
            name="end"
            initialNumber={endTime}
            value={endTime}
            minNumber={startTime}
            maxNumber={maxTime}
            isActive={(v) => setEndTimeActive(v)}
            onChange={(v) => onChangeTime && onChangeTime(v)}
          />
        </div>
      </div>

      <div className="config-details-inputs-container">
        <div className="config-details-person-inputs">
          {audioData?.people && (
            <div className="config-details-person-audio-data-container">
              <Gap />
              <p className="config-details-person-audio-data-title">People</p>
              <div className="config-details-person-audio-data">
                {audioData?.people?.map((person: string, index: number) => (
                  <Chip
                    key={index}
                    label={person}
                    onDelete={() => handleDeletePerson(index)}
                  />
                ))}
              </div>
            </div>
          )}
          <Gap height="5px" />
          {people?.length > 0 && (
            <ListDropDown
              labelPlaceholder="Add People"
              listItems={people?.map((person: any) => person.name)}
              selectedListItems={audioData?.people?.map(
                (person: any) => person
              )}
              multipleSelect={true}
              onSelectItem={onSelectPeople}
            />
          )}
        </div>
      </div>

      <div className="config-details-inputs-container">
        <TextAreaBox
          textAreaBoxClassName="config-details-input"
          label="Links separated by comma"
          name="links"
          placeholder="Enter links separated by comma"
          hint="e.g. https://willamagi.com, https://instagram.com/dinas"
          value={audioData?.links}
          onChange={handleInput}
        />
      </div>

      <div className="config-details-inputs-submit">
        <Button
          label="Done"
          name="audioMap"
          onClick={() => console.log("/shows?new=yes")}
        />
      </div>
    </div>
  );
};

export default ConfigDetails;
