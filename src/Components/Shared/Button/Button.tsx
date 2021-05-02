import { MouseEvent, FC } from "react";
import "./Button.scss";

type TextInputProps = {
  label?: string;
  name?: string;
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
};

const Button: FC<TextInputProps> = ({
  label,
  name,
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
      className={`button ${className} ${disabled && "button-disabled"}`}
      disabled={disabled}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
