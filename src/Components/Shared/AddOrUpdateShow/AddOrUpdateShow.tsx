import { ChangeEvent, useState } from "react";
import { validateTextRequired } from "../../../Functions/validateInputs";
import TextInputBox from "../TextInputBox/TextInputBox";
import lodash from "lodash";
import UploadButton from "../UploadButton/UploadButton";
import { AiOutlineClose } from "react-icons/ai";
import AudioIcon from "../../../Assets/Icons/audio.png";
import FeedbackMessageText from "../FeedbackMessageText/FeedbackMessageText";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import { useHistory } from "react-router";
import apiRequest from "../../../Functions/apiRequest";
import AudioConfig from "../AudioConfig/AudioConfig";
import "./AddOrUpdateShow.scss";

const AddOrUpdateShow = () => {
  const history = useHistory();
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [inputErrors, setInputErrors] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isSubmittingShow, setIsSubmittingShow] = useState<boolean>(false);
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

  //Update input with audio url in base64 and set inputs state
  const handleUploadedAudioURL = (base64Files: string[]) => {
    const copyOfInputs = lodash.cloneDeep(inputs);
    copyOfInputs.audioURL = base64Files[0];
    setInputs(copyOfInputs);
  };

  //Remove audio url from inputs
  const removeAudioURL = () => {
    const copyOfInputs = lodash.cloneDeep(inputs);
    delete copyOfInputs.audioURL;
    setInputs(copyOfInputs);
  };

  const createShow = async (currentInputs: { [key: string]: any }) => {
    setServerErrorMessage(null);
    setIsSubmittingShow(true);

    let response = await apiRequest("/show/create", "POST", currentInputs);
    if (response.success) {
      setIsSubmittingShow(false);
      history.push("/show");
    } else {
      setServerErrorMessage(response.message);
      setIsSubmittingShow(false);
    }
  };

  return (
    <div className="add-or-update-show-wrapper">
      <div className="add-or-update-show-top-section">
        <h1 className="add-or-update-show-header">New Show</h1>
        <div className="add-or-update-show-inputs">
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
          {!inputs?.audioURL && (
            <div className="add-or-update-audio-section-container">
              <div className="add-or-update-audio-upload-box">
                {inputs?.audioURL && (
                  <AiOutlineClose
                    className="add-or-update-audio-remove-button"
                    onClick={removeAudioURL}
                  />
                )}
                <UploadButton
                  allowedFileTypes=".mp3"
                  onSelect={handleUploadedAudioURL}
                />
                <img
                  className="add-or-update-audio-upload-icon"
                  src={AudioIcon}
                  alt="an icon for audio file upload"
                />
                <p className="add-or-update-audio-upload-label">
                  Upload audio file
                </p>
              </div>

              <p className="add-or-update-audio-input-demarcator">Or</p>

              <TextInputBox
                inputBoxWrapperClassName="add-or-update-show-input-wrapper"
                inputBoxClassName="add-or-update-show-input"
                label="Audio URL"
                name="audioURL"
                type="text"
                placeholder="Enter audio url"
                value={inputs?.audioURL}
                required={true}
                errorMessage="The audio url iss required or upload an audio file"
                errorFunction={validateTextRequired}
                onError={handleInputError}
                onChange={handleInput}
              />
            </div>
          )}
        </div>
      </div>
      {inputs?.audioURL && (
        <div className="add-or-update-show-audio-config">
          <AudioConfig audioURL={inputs?.audioURL} />
        </div>
      )}

      <div className="add-or-update-show-footer">
        {serverErrorMessage && (
          <FeedbackMessageText message={serverErrorMessage} type="error" />
        )}
        {!isSubmittingShow ? (
          <Button
            label="ADD"
            name="add"
            borderRadius={false}
            disabled={
              !Object.values(inputErrors).every(
                (inputError) => inputError === false
              )
            }
            onClick={() => createShow(inputs)}
          />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default AddOrUpdateShow;
