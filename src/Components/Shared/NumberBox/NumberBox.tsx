import { FC, useEffect, useRef, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import timeInSecondsToHms from "../../../Functions/timeInSecondsToHms";
import "./NumberBox.scss";

let intervalCount: any;

type TNumberBoxProps = {
  name: string;
  initialNumber?: number;
  value?: number;
  maxNumber: number;
  minNumber?: number;
  makeActive?: boolean;
  disableActiveClass?: boolean;
  isActive?: () => void;
  onChange?: (value: number) => void;
};

const NumberBox: FC<TNumberBoxProps> = ({
  name,
  initialNumber = 0,
  value,
  maxNumber,
  minNumber = 0,
  makeActive = false,
  isActive,
  onChange,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(0);
  useEffect(() => {
    setNumber(initialNumber);
  }, []);

  useEffect(() => {
    if (active !== makeActive) setActive(makeActive);
  }, [makeActive]);

  const handleClick = () => {
    setActive(true);
    isActive && isActive();
  };

  const updateNumber = (value: "inc" | "dec") => {
    if (value === "inc") {
      intervalCount = setInterval(incrementNumber, 50);
    }

    if (value === "dec") {
      intervalCount = setInterval(decrementNumber, 50);
    }
  };

  const incrementNumber = () => {
    setNumber((state) => {
      let currentNumber = state;
      console.log("inc", currentNumber, maxNumber);
      if (currentNumber < maxNumber) {
        currentNumber = currentNumber + 1;
        if (currentNumber > maxNumber) currentNumber = maxNumber;
        onChange && onChange(currentNumber);
      }
      return currentNumber;
    });
  };

  const decrementNumber = () => {
    setNumber((state) => {
      let currentNumber = state;
      console.log("dec", currentNumber, minNumber);
      if (currentNumber > minNumber) {
        currentNumber = currentNumber - 1;
        if (currentNumber < minNumber) currentNumber = minNumber;
        onChange && onChange(currentNumber);
      }
      return currentNumber;
    });
  };

  const stopNumberUpdate = () => {
    clearInterval(intervalCount);
  };

  return (
    <div
      id={name}
      className={`number-box-wrapper ${active && "number-box-wrapper-active"}`}
      onClick={handleClick}
    >
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
      <div className="number-box-value">
        {timeInSecondsToHms(value ? value : number)}
      </div>
    </div>
  );
};

export default NumberBox;
