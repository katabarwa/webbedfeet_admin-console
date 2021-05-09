import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Button from "../../../../Shared/Button/Button";
import { parseISO, format } from "date-fns";
import "./PeopleDetails.scss";

type TReduxStateSelector = {
  people: any;
};

const PeopleDetails = () => {
  const people: any = useSelector<TReduxStateSelector>((state) => state.people);
  const history = useHistory();

  return (
    <div className="people-details-wrapper">
      <div className="people-details-top-section">
        <h1 className="people-details-header-title">People</h1>
        <Button
          label="Add Person"
          name="addPerson"
          maxWidth={false}
          onClick={() => history.push("/people?new=yes")}
        />
      </div>

      <table className="people-details-table">
        <tr>
          <th>Person</th>
          <th>Connections</th>
          <th>Created On</th>
          <th>Created By</th>
          <th>Updated By</th>
        </tr>
        {people?.map((person: any) => (
          <tr>
            <td>{person.name}</td>
            <td>
              {person.connections?.length > 0
                ? person.connections.join(", ")
                : "No Connections"}
            </td>
            <td>{format(parseISO(person.createdAt), "dd MMM yyyy")}</td>
            <td>{person.createdBy.fullName}</td>
            <td>{person.updatedBy.fullName}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default PeopleDetails;
