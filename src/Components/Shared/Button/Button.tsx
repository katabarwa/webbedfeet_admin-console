import { MouseEvent, FC } from "react";
import "./Button.scss";

type TextInputProps = {
  label?: string;
  name?: string;
  borderRadius?: boolean;
  maxWidth?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
};

const Button: FC<TextInputProps> = ({
  label,
  name,
  borderRadius = true,
  maxWidth = true,
  className,
  disabled = false,
  onClick,
}) => {
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onClick && onClick(event);
  };

  return (
    <button
      name={name}
      className={`button ${className} ${disabled && "button-disabled"} ${
        borderRadius && "button-borderRadius"
      } ${maxWidth && "button-maxWidth"}`}
      disabled={disabled}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
