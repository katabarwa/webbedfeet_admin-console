import { ChangeEvent, FC, useEffect, useState } from "react";
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

interface TAddOrUpdatePersonProps {
  person?: any;
  onUpdate?: () => void;
}

const AddOrUpdatePerson: FC<TAddOrUpdatePersonProps> = ({
  person,
  onUpdate,
}) => {
  const people: any = useSelector<TReduxStateSelector>((state) => state.people);
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState<{ [key: string]: any }>({});
  const [inputErrors, setInputErrors] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isSubmittingPerson, setIsSubmittingPerson] = useState<boolean>(false);
  const [serverErrorMessage, setServerErrorMessage] =
    useState<string | null>(null);

  useEffect(() => {
    if (person) {
      const copyOfInputs = lodash.cloneDeep(inputs);
      copyOfInputs.name = person.name;
      handleInputError(person.name, false);
      copyOfInputs.connections = person.personConnections.map(
        (person: any) => person.name
      );
      setInputs(copyOfInputs);
    }
  }, []);

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

  //Delete person from connections
  const handleDeleteConnection = (currentPersonIndex: number) => {
    const copyOfInputs = lodash.cloneDeep(inputs);
    const currentConnections = lodash.cloneDeep(copyOfInputs.connections);
    currentConnections.splice(currentPersonIndex, 1);
    copyOfInputs.connections = currentConnections;
    setInputs(copyOfInputs);
  };

  const createOrUpdatePerson = async (
    currentInputs: { [key: string]: any },
    action: "create" | "update"
  ) => {
    setServerErrorMessage(null);
    setIsSubmittingPerson(true);
    const copyOfCurrentInputs = lodash.cloneDeep(currentInputs);
    if (currentInputs.connections) {
      let connectionIDs: string[] = [];
      const copyOfConnections = lodash.cloneDeep(currentInputs.connections);
      copyOfConnections.forEach((connectionName: string) => {
        people.forEach((connectionPerson: any) => {
          if (connectionPerson.name === connectionName) {
            connectionIDs.push(connectionPerson._id);
          }
        });
      });
      copyOfCurrentInputs.connections = connectionIDs;
    }

    let response: any;
    if (action === "create")
      response = await apiRequest(
        "/person/create",
        "POST",
        copyOfCurrentInputs
      );
    if (action === "update")
      response = await apiRequest(
        `/person/update/${person._id}`,
        "PATCH",
        copyOfCurrentInputs
      );
    if (response?.success) {
      let peopleResponse = await apiRequest("/people", "GET");
      if (peopleResponse.success) {
        dispatch({ type: "people", value: peopleResponse.data });
      }

      setIsSubmittingPerson(false);
      if (action === "update") onUpdate && onUpdate();
      history.push("/people");
      return;
    }

    setServerErrorMessage(response.message);
    setIsSubmittingPerson(false);
  };

  return (
    <div className="add-or-update-person-wrapper">
      <div className="add-or-update-person-top-section">
        <h1 className="add-or-update-person-header-title">
          {person ? "Update Person" : "New Person"}
        </h1>
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
                {inputs?.connections?.map((person: string, index: number) => (
                  <Chip
                    key={index}
                    label={person}
                    onDelete={() => handleDeleteConnection(index)}
                  />
                ))}
              </div>
            </div>
          )}
          <Gap height="5px" />
          {people?.length > 0 && (
            <ListDropDown
              labelPlaceholder="Add Connections"
              listItems={people
                .filter((person: any) => person.name !== inputs.name)
                .map((person: any) => person.name)}
              selectedListItems={inputs?.connections?.map(
                (person: any) => person
              )}
              multipleSelect={true}
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
            label={person ? "UPDATE" : "ADD"}
            name="add"
            borderRadius={false}
            disabled={
              !Object.values(inputErrors).every(
                (inputError) => inputError === false
              )
            }
            onClick={() =>
              createOrUpdatePerson(inputs, person ? "update" : "create")
            }
          />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default AddOrUpdatePerson;
