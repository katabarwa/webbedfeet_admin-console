import { ChangeEvent, useState } from "react";
import { validateTextRequired } from "../../../Functions/validateInputs";
import TextInputBox from "../TextInputBox/TextInputBox";
import lodash from "lodash";
import "./AddOrUpdatePerson.scss";
import ListDropDown from "../ListDropDown/ListDropDown";
import Gap from "../Gap/Gap";
import Button from "../Button/Button";
import Chip from "../Chip/Chip";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../../../Functions/apiRequest";
import { useHistory } from "react-router";
import Loader from "../Loader/Loader";
import FeedbackMessageText from "../FeedbackMessageText/FeedbackMessageText";

type TReduxStateSelector = {
  people: any;
};

const AddOrUpdatePerson = () => {
  const people: any = useSelector<TReduxStateSelector>((state) => state.people);
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState<{ [key: string]: any }>({});
  const [inputErrors, setInputErrors] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isSubmittingPerson, setIsSubmittingPerson] = useState<boolean>(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  );

  //Update input and set inputs state
  const handleInput = (event: ChangeEvent) => {
    setServerErrorMessage(null);
    const inputValue = (event.target as any).value;
    const inputName = (event.target as any).name;
    const copyOfInputs = lodash.cloneDeep(inputs);
    copyOfInputs[inputName] = inputValue;
    setInputs(copyOfInputs);
  };

  //Update input errors and set state
  const handleInputError = (name: string, errorValue: boolean) => {
    const copyOfInputErrors = lodash.cloneDeep(inputErrors);
    copyOfInputErrors[name] = errorValue;
    setInputErrors(copyOfInputErrors);
  };

  //Update selected connections to person
  const onSelectConnections = (selectedConnections: string[]) => {
    const copyOfInputs = lodash.cloneDeep(inputs);
    copyOfInputs.connections = selectedConnections;
    setInputs(copyOfInputs);
  };

  const createPerson = async (currentInputs: { [key: string]: any }) => {
    setServerErrorMessage(null);
    setIsSubmittingPerson(true);

    let response = await apiRequest("/person/create", "POST", currentInputs);
    if (response.success) {
      let peopleResponse = await apiRequest("/people", "GET");
      if (peopleResponse.success) {
        dispatch({ type: "people", value: peopleResponse.data });
      }

      setIsSubmittingPerson(false);
      history.push("/people");
    } else {
      setServerErrorMessage(response.message);
      setIsSubmittingPerson(false);
    }
  };

  return (
    <div className="add-or-update-person-wrapper">
      <div className="add-or-update-person-top-section">
        <h1 className="add-or-update-person-header-title">New Person</h1>
        <div className="add-or-update-person-inputs">
          <TextInputBox
            inputBoxClassName="add-or-update-person-input"
            label="Name"
            name="name"
            type="text"
            placeholder="Enter name of person"
            value={inputs.name}
            required={true}
            errorMessage="Name of person is required"
            errorFunction={validateTextRequired}
            onError={handleInputError}
            onChange={handleInput}
          />

          {inputs?.connections && (
            <div className="add-or-update-person-connections-container">
              <Gap />
              <p className="add-or-update-person-connections-title">
                Connections
              </p>
              <div className="add-or-update-person-connections">
                {inputs?.connections?.map(
                  (connection: { [key: string]: any }) => (
                    <Chip label={connection.item} />
                  )
                )}
              </div>
            </div>
          )}
          <Gap height="5px" />
          {people?.length > 0 && (
            <ListDropDown
              labelPlaceholder="Add Connections"
              listItems={people.map((person: any) => person.name)}
              onSelectItem={onSelectConnections}
            />
          )}
        </div>
      </div>
      <div className="add-or-update-person-footer">
        {serverErrorMessage && (
          <FeedbackMessageText message={serverErrorMessage} type="error" />
        )}
        {!isSubmittingPerson ? (
          <Button
            label="ADD"
            name="add"
            borderRadius={false}
            disabled={
              !Object.values(inputErrors).every(
                (inputError) => inputError === false
              )
            }
            onClick={() => createPerson(inputs)}
          />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default AddOrUpdatePerson;
