import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TSelectedItemsList } from "../../../../TypescriptUtils/types";
import Chip from "../../Chip/Chip";
import Gap from "../../Gap/Gap";
import ListDropDown from "../../ListDropDown/ListDropDown";
import Popup from "../../Popup/Popup";
import lodash from "lodash";
import "./ConfigPopup.scss";

type TReduxStateSelector = {
  people: any;
};

interface TConfigPopupProps {
  show: boolean;
  onClose: () => void;
}

const ConfigPopup: FC<TConfigPopupProps> = ({ show, onClose }) => {
  const people: any = useSelector<TReduxStateSelector>((state) => state.people);
  const [displayPopup, setDisplayPopup] = useState<boolean>(false);
  const [audioData, setAudioData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    setDisplayPopup(show);
  }, [show]);

  const closePopup = () => {
    setDisplayPopup(false);
    onClose();
  };

  //Update audio data with to person
  const onSelectPeople = (selectedConnections: TSelectedItemsList) => {
    const copyOfAudioData = lodash.cloneDeep(audioData);
    copyOfAudioData.people = selectedConnections;
    setAudioData(copyOfAudioData);
  };

  return (
    <Popup
      display={displayPopup}
      justify="center"
      align="center"
      onClose={() => closePopup()}
    >
      <div className="config-popup-wrapper">
        <div className="config-popup-person-inputs">
          {audioData?.people && (
            <div className="config-popup-person-audio-data-container">
              <Gap />
              <p className="config-popup-person-audio-data-title">
                Connections
              </p>
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
    </Popup>
  );
};

export default ConfigPopup;
