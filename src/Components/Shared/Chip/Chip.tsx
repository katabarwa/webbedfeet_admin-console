import { FC } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import "./Chip.scss";

type Props = {
  label: string;
  onDelete?: () => void;
};

const Chip: FC<Props> = ({ label, onDelete }) => {
  return (
    <div className="chip-wrapper">
      <p className="chip-label">{label}</p>
      <AiFillCloseCircle className="chip-remove-button" onClick={onDelete} />
    </div>
  );
};

export default Chip;
