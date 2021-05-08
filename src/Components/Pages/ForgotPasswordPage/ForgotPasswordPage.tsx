import { ChangeEvent, useState } from "react";
import { validateEmailFormat } from "../../../Functions/validateInputs";
import TextInputBox from "../../Shared/TextInputBox/TextInputBox";
import lodash from "lodash";
import Button from "../../Shared/Button/Button";
import apiRequest from "../../../Functions/apiRequest";
import Logo from "../../../Assets/Logo/logo.png";
import Layout from "../../Shared/Layout/Layout";
import FeedbackMessageText from "../../Shared/FeedbackMessageText/FeedbackMessageText";
import Loader from "../../Shared/Loader/Loader";
import "./ForgotPasswordPage.scss";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<{ [key: string]: boolean }>({});
  const [
    isSendingChangePasswordLink,
    setIsSendingChangePasswordLink,
  ] = useState<boolean>(false);
  const [changePasswordLinkSent, setChangePasswordLinkSent] = useState<boolean>(
    false
  );
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  );

  //Update email input and set email state
  const handleInput = (event: ChangeEvent) => {
    setServerErrorMessage(null);
    const emailInputValue = (event.target as any).value;
    setEmail(emailInputValue);
  };

  //Update email input error and set state
  const handleEmailError = (name: string, errorValue: boolean) => {
    const copyOfEmailError = lodash.cloneDeep(emailError);
    copyOfEmailError[name] = errorValue;
    setEmailError(copyOfEmailError);
  };

  //Send change password link to user email
  const handleSendChangePasswordLinkToEmail = async (
    userEmail: string | undefined
  ) => {
    setIsSendingChangePasswordLink(true); //Starts loader
    setServerErrorMessage(null); //Clears error message if present
    const sendChangePasswordLinkResponse = await apiRequest(
      `/user/send-change-password-link-to-email`,
      "POST",
      { email: userEmail }
    );

    if (!sendChangePasswordLinkResponse.success) {
      setServerErrorMessage(sendChangePasswordLinkResponse.message);
      setIsSendingChangePasswordLink(false); //Stops loader
      return;
    }

    setIsSendingChangePasswordLink(false); //Stops loader
    setEmail(undefined); //Reset email value to undefined
    setChangePasswordLinkSent(true); //Display change password link success message
  };

  return (
    <Layout includeNavBar={false}>
      <div className="forgot-password-page-wrapper">
        <img
          className="forgot-password-page-logo"
          src={Logo}
          alt="Webbed Feet Logo"
        />
        {serverErrorMessage && (
          <FeedbackMessageText message={serverErrorMessage} type="error" />
        )}
        <form className="forgot-password-page-form">
          {!changePasswordLinkSent && (
            <TextInputBox
              inputBoxClassName="forgot-password-page-form-input"
              label="E-mail"
              name="email"
              type="email"
              placeholder="you@email.com"
              value={email}
              required={true}
              errorMessage="Please enter your email"
              errorFunction={validateEmailFormat}
              onError={handleEmailError}
              onChange={handleInput}
            />
          )}
          {changePasswordLinkSent && (
            <p className="forgot-password-page-link-sent-message">
              A change password link has been sent to your email. Click on the
              link to reset your password. Thank you.
            </p>
          )}
          {!isSendingChangePasswordLink && !changePasswordLinkSent && (
            <Button
              label="SEND PASSWORD RESET LINK"
              name="login"
              borderRadius={false}
              disabled={
                !Object.values(emailError).every(
                  (errorData) => errorData === false
                )
              }
              onClick={() => handleSendChangePasswordLinkToEmail(email)}
            />
          )}
        </form>

        {isSendingChangePasswordLink && (
          <Loader loaderWrapperClassName="forgot-password-sending-loader" />
        )}
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
