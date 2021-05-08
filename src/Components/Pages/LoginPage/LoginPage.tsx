import { ChangeEvent, useState } from "react";
import {
  validateEmailFormat,
  validatePassword,
} from "../../../Functions/validateInputs";
import TextInputBox from "../../Shared/TextInputBox/TextInputBox";
import lodash from "lodash";
import Button from "../../Shared/Button/Button";
import apiRequest from "../../../Functions/apiRequest";
import Logo from "../../../Assets/Logo/logo.png";
import Layout from "../../Shared/Layout/Layout";
import { Link, useHistory } from "react-router-dom";
import FeedbackMessageText from "../../Shared/FeedbackMessageText/FeedbackMessageText";
import Loader from "../../Shared/Loader/Loader";
import { useDispatch } from "react-redux";
import "./LoginPage.scss";

const LoginPage = () => {
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [inputErrors, setInputErrors] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isLoginInUser, setIsLoginInUser] = useState<boolean>(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  );
  const history = useHistory();
  const dispatch = useDispatch();

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

  //Login user by email
  const handleLoginByEmail = async (currentInputs: {
    [key: string]: string;
  }) => {
    setIsLoginInUser(true); //Starts loader
    setServerErrorMessage(null); //Clears error message if present
    const loginByEmailResponse = await apiRequest(
      `/user/login/email`,
      "POST",
      currentInputs
    );

    if (!loginByEmailResponse.success) {
      setServerErrorMessage(loginByEmailResponse.message);
      setIsLoginInUser(false); //Stops loader
      return;
    }

    dispatch({ type: "user", value: loginByEmailResponse.data });
    setIsLoginInUser(false); //Stops loader
    history.push("/shows");
  };

  return (
    <Layout includeNavBar={false}>
      <div className="login-page-wrapper">
        <img className="login-page-logo" src={Logo} alt="Webbed Feet Logo" />
        {serverErrorMessage && (
          <FeedbackMessageText message={serverErrorMessage} type="error" />
        )}
        <form className="login-page-form">
          <TextInputBox
            inputBoxClassName="login-page-form-input"
            label="E-mail"
            name="email"
            type="email"
            placeholder="you@email.com"
            value={inputs.email}
            required={true}
            errorMessage="Please enter your email"
            errorFunction={validateEmailFormat}
            onError={handleInputError}
            onChange={handleInput}
          />
          <hr className="login-page-form-line" />
          <TextInputBox
            inputBoxClassName="login-page-form-input"
            label="Password"
            name="password"
            type="password"
            placeholder="Your password"
            value={inputs.password}
            required={true}
            errorMessage="Please enter your password"
            errorFunction={validatePassword}
            onError={handleInputError}
            onChange={handleInput}
          />
          {!isLoginInUser && (
            <Button
              label="LOGIN"
              name="login"
              borderRadius={false}
              disabled={
                !Object.values(inputErrors).every(
                  (inputError) => inputError === false
                )
              }
              onClick={() => handleLoginByEmail(inputs)}
            />
          )}
        </form>

        <Link className="login-page-form-cta" to={`/forgot-password`}>
          {isLoginInUser ? <Loader /> : "Forgot Password"}
        </Link>
      </div>
    </Layout>
  );
};

export default LoginPage;
