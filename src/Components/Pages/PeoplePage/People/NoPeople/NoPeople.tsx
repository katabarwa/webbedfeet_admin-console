import { FiUsers } from "react-icons/fi";
import { useHistory } from "react-router";
import Button from "../../../../Shared/Button/Button";
import "./NoPeople.scss";

const NoPeople = () => {
  const history = useHistory();

  return (
    <div className="no-people-wrapper">
      <div className="no-people-container">
        <FiUsers className="no-people-icon" />
        <p className="no-people-message">No people found</p>
        <Button
          label="Add Person"
          name="addPerson"
          maxWidth={false}
          onClick={() => history.push("/people?new=yes")}
        />
      </div>
    </div>
  );
};

export default NoPeople;
