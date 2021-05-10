import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chip from "../../Chip/Chip";
import Gap from "../../Gap/Gap";
import ListDropDown from "../../ListDropDown/ListDropDown";
import apiRequest from "../../../../Functions/apiRequest";
import Loader from "../../Loader/Loader";
import lodash from "lodash";
import "./ConfigDetails.scss";
import TextInputBox from "../../TextInputBox/TextInputBox";

type TReduxStateSelector = {
  people: any;
};

interface TConfigDetailsProps {
  show?: boolean;
  onClose?: () => void;
}

const ConfigDetails: FC<TConfigDetailsProps> = ({ show, onClose }) => {
  const people: any = useSelector<TReduxStateSelector>((state) => state.people);
  const dispatch = useDispatch();
  const [audioData, setAudioData] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
  }, []);

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
              labelPlaceholder="Add Person"
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
        <TextInputBox
          inputBoxClassName="config-details-input"
          label="Music title"
          name="musicDetails"
          type="text"
          placeholder="Enter music details by comma"
          value={audioData?.links}
          onChange={handleInput}
        />
      </div>

      <div className="config-details-inputs-container">
        <TextInputBox
          inputBoxClassName="config-details-input"
          label="Links separated by comma"
          name="links"
          type="text"
          placeholder="Enter links separated by comma"
          value={audioData?.links}
          onChange={handleInput}
        />
      </div>
    </div>
  );
};

export default ConfigDetails;
