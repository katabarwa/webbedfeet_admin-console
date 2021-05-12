import React, { useState, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import "./CheckBox.scss";

type Props = {
  value?: boolean | null;
  label?: string;
  checkBoxWrapperClass?: string;
  onClick?: (label: string, value: boolean) => void;
};

const CheckBox: React.FC<Props> = ({
  value = null,
  label = "",
  checkBoxWrapperClass,
  onClick,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (value !== null) setChecked(value);
  }, [value]);

  const handleCheckBox = () => {
    const currentCheckValue = checked;
    if (value === null) setChecked(!currentCheckValue);
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
      {label && (
        <p
          className="checkbox-label"
          style={{ fontWeight: checked ? 600 : "normal" }}
        >
          {label}
        </p>
      )}
    </div>
  );
};

export default CheckBox;
