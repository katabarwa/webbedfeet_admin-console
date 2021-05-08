import { FiMicOff } from "react-icons/fi";
import { useHistory } from "react-router";
import Button from "../../../../Shared/Button/Button";
import "./NoShows.scss";

const NoShows = () => {
  const history = useHistory();

  return (
    <div className="no-shows-wrapper">
      <div className="no-shows-container">
        <FiMicOff className="no-shows-icon" />
        <p className="no-shows-message">No shows uploaded yet</p>
        <Button
          label="Add Show"
          name="addShow"
          maxWidth={false}
          onClick={() => history.push("/shows?new=yes")}
        />
      </div>
    </div>
  );
};

export default NoShows;
