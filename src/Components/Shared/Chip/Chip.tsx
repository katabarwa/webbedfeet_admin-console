import { FC } from "react";
import "./Chip.scss";

type Props = {
  label: string;
  onDelete?: (selectedLabels: string[]) => void;
};

const Chip: FC<Props> = ({ label, onDelete }) => {
  return (
    <div className="chip-wrapper">
      <p className="chip-label">{label}</p>
    </div>
  );
};

export default Chip;
