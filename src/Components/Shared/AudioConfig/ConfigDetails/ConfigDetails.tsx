import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TSelectedItemsList } from "../../../../TypescriptUtils/types";
import Chip from "../../Chip/Chip";
import Gap from "../../Gap/Gap";
import ListDropDown from "../../ListDropDown/ListDropDown";
import apiRequest from "../../../../Functions/apiRequest";
import Loader from "../../Loader/Loader";
import lodash from "lodash";
import "./ConfigDetails.scss";

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
  const onSelectPeople = (selectedConnections: TSelectedItemsList) => {
    const copyOfAudioData = lodash.cloneDeep(audioData);
    copyOfAudioData.people = selectedConnections;
    setAudioData(copyOfAudioData);
  };

  return isLoading ? (
    <Loader loaderWrapperClassName="config-popup-loader" />
  ) : (
    <div className="config-popup-wrapper">
      <div className="config-popup-person-inputs">
        {audioData?.people && (
          <div className="config-popup-person-audio-data-container">
            <Gap />
            <p className="config-popup-person-audio-data-title">People</p>
            <div className="config-popup-person-audio-data">
              {audioData?.people?.map((person: { [key: string]: any }) => (
                <Chip label={person.item} />
              ))}
            </div>
          </div>
        )}
        <Gap height="5px" />
        {people?.length > 0 && (
          <ListDropDown
            labelPlaceholder="Add Person"
            listItems={people.map((person: any) => person.name)}
            onSelectItem={onSelectPeople}
          />
        )}
      </div>
    </div>
  );
};

export default ConfigDetails;
