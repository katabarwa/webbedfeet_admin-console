import { ChangeEvent, useState } from "react";
import { validateTextRequired } from "../../../Functions/validateInputs";
import TextInputBox from "../TextInputBox/TextInputBox";
import lodash from "lodash";
import "./AddOrUpdatePerson.scss";

const AddOrUpdatePerson = () => {
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [inputErrors, setInputErrors] = useState<{ [key: string]: boolean }>(
    {}
  );
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

  return (
    <div className="add-or-update-person-wrapper">
      <h1 className="add-or-update-person-header">New Person</h1>
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
    </div>
  );
};

export default AddOrUpdatePerson;
