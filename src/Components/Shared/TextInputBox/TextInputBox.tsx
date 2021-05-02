import { ChangeEvent, FocusEvent, FC, useState, useEffect } from "react";
import { validateTextRequired } from "../../../Functions/validateInputs";
import FeedbackMessageText from "../FeedbackMessageText/FeedbackMessageText";
import "./TextInputBox.scss";

type TextInputProps = {
  label?: string;
  name: string;
  inputBoxClassName?: string;
  inputBoxWrapperClassName?: string;
  type?: "email" | "text" | "number" | "password";
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string;
  errorFunction?: Function;
  onError?: (name: string, error: boolean) => void;
  onBlur?: (event: FocusEvent) => void;
  onChange?: (event: ChangeEvent) => void;
};

const TextInputBox: FC<TextInputProps> = ({
  label,
  name,
  inputBoxClassName,
  inputBoxWrapperClassName,
  type = "text",
  placeholder,
  value,
  disabled = false,
  required = false,
  errorMessage = "",
  errorFunction = validateTextRequired,
  onError,
  onBlur,
  onChange,
}) => {
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    handleError(value);
  }, []);

  const handleOnChange = (event: ChangeEvent) => {
    event.stopPropagation();
    handleError((event.target as any).value);
    onChange && onChange(event);
  };

  //Detects when typing is done and checks if the the input is valid or has error
  const handleOnBlur = (event: FocusEvent) => {
    const inputError = handleError((event.target as any).value);
    setError(inputError);
    onBlur && onBlur(event);
  };

  const handleError = (value: any) => {
    const inputError = required && !errorFunction(value);
    onError && onError(name, inputError);
    return inputError;
  };

  return (
    <div className={`text-input-box-wrapper ${inputBoxWrapperClassName}`}>
      {label && value && value !== "" && (
        <label className="text-input-box-label">{`${label} ${
          required ? "*" : ""
        }`}</label>
      )}
      <input
        name={name}
        className={`text-input-box ${inputBoxClassName} ${
          value && value !== "" && "text-input-box-active"
        } ${error && "text-input-box-error"}`}
        type={type}
        placeholder={value && value !== "" ? placeholder : label}
        value={value}
        disabled={disabled}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
      />
      {error && <FeedbackMessageText message={errorMessage} type="error" />}
    </div>
  );
};

export default TextInputBox;
