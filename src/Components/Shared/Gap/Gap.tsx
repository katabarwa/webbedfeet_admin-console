import { FC } from "react";

interface IGapProps {
  width?: string;
  height?: string;
}

const Gap: FC<IGapProps> = ({ width = "15px", height = "15px" }) => {
  return (
    <div
      style={{
        minWidth: width,
        minHeight: height,
      }}
    ></div>
  );
};

export default Gap;
