import { FC, useEffect, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import timeInSecondsToHms from "../../../Functions/timeInSecondsToHms";
import "./NumberBox.scss";

let intervalCount: any;
let intervalNumber = 0;

type TNumberBoxProps = {
  initialNumber?: number;
  maxNumber: number;
  minNumber?: number;
  onChange?: (value: number) => void;
};

const NumberBox: FC<TNumberBoxProps> = ({
  initialNumber = 0,
  maxNumber,
  minNumber = 0,
  onChange,
}) => {
  const [number, setNumber] = useState<number>(0);
  useEffect(() => {
    setNumber(initialNumber);
    intervalNumber = initialNumber;
  }, []);

  const updateNumber = (value: "inc" | "dec") => {
    if (value === "inc") {
      intervalCount = setInterval(incrementNumber, 50);
    }

    if (value === "dec") {
      intervalCount = setInterval(decrementNumber, 50);
    }
  };

  const incrementNumber = () => {
    if (intervalNumber < maxNumber) {
      intervalNumber = intervalNumber + 1;
      setNumber(intervalNumber);
      onChange && onChange(intervalNumber);
    }
  };

  const decrementNumber = () => {
    if (intervalNumber > minNumber) {
      intervalNumber = intervalNumber - 1;
      setNumber(intervalNumber);
      onChange && onChange(intervalNumber);
    }
  };

  const stopNumberUpdate = () => {
    clearInterval(intervalCount);
  };

  return (
    <div className="number-box-wrapper">
      <div className="number-box-inc-dec-container">
        <AiFillCaretUp
          className="number-box-inc-dec-icon"
          onMouseDown={() => updateNumber("inc")}
          onMouseUp={stopNumberUpdate}
        />
        <AiFillCaretDown
          className="number-box-inc-dec-icon"
          onMouseDown={() => updateNumber("dec")}
          onMouseUp={stopNumberUpdate}
        />
      </div>
      <div className="number-box-value">{timeInSecondsToHms(number)}</div>
    </div>
  );
};

export default NumberBox;
