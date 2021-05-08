import { ChangeEvent, useState } from "react";
import { validateTextRequired } from "../../../Functions/validateInputs";
import TextInputBox from "../TextInputBox/TextInputBox";
import lodash from "lodash";
import "./AddOrUpdateShow.scss";

const AddOrUpdateShow = () => {
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
    <div className="add-or-update-show-wrapper">
      <h1 className="add-or-update-show-header">New Show</h1>
      <TextInputBox
        inputBoxClassName="add-or-update-show-input"
        label="Title"
        name="title"
        type="text"
        placeholder="Enter title of the show"
        value={inputs.title}
        required={true}
        errorMessage="The title of the show is required"
        errorFunction={validateTextRequired}
        onError={handleInputError}
        onChange={handleInput}
      />
    </div>
  );
};

export default AddOrUpdateShow;
