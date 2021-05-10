import React, { useState, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import "./CheckBox.scss";

type Props = {
  value: boolean;
  label: string;
  checkBoxWrapperClass?: string;
  onClick?: (label: string, value: boolean) => void;
};

const CheckBox: React.FC<Props> = ({
  value,
  label,
  checkBoxWrapperClass,
  onClick,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(value);
  }, [value]);

  const handleCheckBox = () => {
    const currentCheckValue = checked;
    setChecked(!currentCheckValue);
    onClick && onClick(label, !currentCheckValue);
  };

  return (
    <div
      className={`checkbox-wrapper ${
        checkBoxWrapperClass && checkBoxWrapperClass
      }`}
    >
      <div
        className={`checkbox ${checked && "checkbox-checked"}`}
        onClick={handleCheckBox}
      >
        {checked && <FiCheck className="checkbox-icon" />}
      </div>
      <p
        className="checkbox-label"
        style={{ fontWeight: checked ? 600 : "normal" }}
      >
        {label}
      </p>
    </div>
  );
};

export default CheckBox;
