import { ChangeEvent, useEffect, useState } from "react";
import {
  validateTwoTextsAreTheSame,
  validatePassword,
} from "../../../Functions/validateInputs";
import TextInputBox from "../../Shared/TextInputBox/TextInputBox";
import lodash from "lodash";
import Button from "../../Shared/Button/Button";
import apiRequest from "../../../Functions/apiRequest";
import Logo from "../../../Assets/Logo/logo.png";
import Layout from "../../Shared/Layout/Layout";
import { Link, useLocation } from "react-router-dom";
import FeedbackMessageText from "../../Shared/FeedbackMessageText/FeedbackMessageText";
import Loader from "../../Shared/Loader/Loader";
import "./ChangePasswordPage.scss";

const ChangePasswordPage = () => {
  const [changePasswordToken, setChangePasswordToken] = useState<string | null>(
    ""
  );
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [inputErrors, setInputErrors] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  );
  const location = useLocation();

  useEffect(() => {
    //Get change password token from location url
    const token = new URLSearchParams(location.search).get("token");
    setChangePasswordToken(token);
  }, []);

  //Update password input and set inputs state
  const handleInput = (event: ChangeEvent) => {
    setServerErrorMessage(null);
    const inputValue = (event.target as any).value;
    const inputName = (event.target as any).name;
    const copyOfInputs = lodash.cloneDeep(inputs);
    copyOfInputs[inputName] = inputValue;
    setInputs(copyOfInputs);
  };

  //Update password input errors and set state
  const handleInputError = (name: string, errorValue: boolean) => {
    const copyOfInputErrors = lodash.cloneDeep(inputErrors);
    copyOfInputErrors[name] = errorValue;
    setInputErrors(copyOfInputErrors);
  };

  //Change user password
  const handleChangeUserPassword = async (currentInputs: {
    [key: string]: string;
  }) => {
    setIsChangingPassword(true); //Starts loader
    setServerErrorMessage(null); //Clears error message if present

    //Check if password and confirm password are the same
    if (
      !validateTwoTextsAreTheSame(
        currentInputs.password,
        currentInputs.confirmPassword
      )
    ) {
      setServerErrorMessage("The passwords do not match");
      setIsChangingPassword(false); //Stops loader
      return;
    }

    //Add change password token to body object (currentInputs)
    if (changePasswordToken)
      currentInputs.changePasswordToken = changePasswordToken;

    const changePasswordResponse = await apiRequest(
      `/user/change-password`,
      "POST",
      currentInputs
    );

    if (!changePasswordResponse.success) {
      setServerErrorMessage(changePasswordResponse.message);
      setIsChangingPassword(false); //Stops loader
      return;
    }

    setIsChangingPassword(false); //Stops loader
  };

  return (
    <Layout includeNavBar={false}>
      <div className="change-password-page-wrapper">
        <img
          className="change-password-page-logo"
          src={Logo}
          alt="Webbed Feet Logo"
        />
        {serverErrorMessage && (
          <FeedbackMessageText
            feedbackMessageClassName="change-password-page-feedback-message"
            message={serverErrorMessage}
            type="error"
          />
        )}
        <form className="change-password-page-form">
          <TextInputBox
            inputBoxClassName="change-password-page-form-input"
            label="New Password"
            name="password"
            type="password"
            placeholder="New password"
            value={inputs.password}
            required={true}
            errorMessage="Please enter new password"
            errorFunction={validatePassword}
            onError={handleInputError}
            onChange={handleInput}
          />
          <hr className="change-password-page-form-line" />
          <TextInputBox
            inputBoxClassName="change-password-page-form-input"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={inputs.confirmPassword}
            required={true}
            errorMessage="Please confirm your password"
            errorFunction={validatePassword}
            onError={handleInputError}
            onChange={handleInput}
          />
          {!isChangingPassword && (
            <Button
              label="CHANGE PASSWORD"
              name="login"
              borderRadius={false}
              disabled={
                !Object.values(inputErrors).every(
                  (inputError) => inputError === false
                )
              }
              onClick={() => handleChangeUserPassword(inputs)}
            />
          )}
        </form>

        {isChangingPassword && (
          <Loader loaderWrapperClassName="change-password-page-loader" />
        )}
      </div>
    </Layout>
  );
};

export default ChangePasswordPage;
