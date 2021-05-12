import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Button from "../../../../Shared/Button/Button";
import { parseISO, format } from "date-fns";
import "./PeopleDetails.scss";
import CheckBox from "../../../../Shared/CheckBox/CheckBox";
import ListDropDown from "../../../../Shared/ListDropDown/ListDropDown";
import { Fragment, useState } from "react";
import AddOrUpdatePerson from "../../../../Shared/AddOrUpdatePerson/AddOrUpdatePerson";
import Popup from "../../../../Shared/Popup/Popup";
import { AiOutlineClose } from "react-icons/ai";

type TReduxStateSelector = {
  people: any;
};

const PeopleDetails = () => {
  const people: any = useSelector<TReduxStateSelector>((state) => state.people);
  const history = useHistory();
  const [activePersonIDs, setActivePersonIDs] = useState<string[]>([]);
  const [showEditPersonPopup, setShowEditPersonPopup] =
    useState<boolean>(false);

  //Get selected menu
  const handleSelectedMenu = (selectedMenus: string[], personID: string) => {
    setActivePersonIDs([personID]);
    if (selectedMenus[0] === "Edit") setShowEditPersonPopup(true);
  };

  //Get active person details
  const getActivePerson = (personID: string) => {
    const personDetails = people.filter(
      (person: any) => person._id === personID
    );
    return personDetails[0];
  };

  //Close edit person popup
  const handleCloseEditPersonPopup = () => {
    setShowEditPersonPopup(false);
  };

  return (
    <Fragment>
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
            <th className="people-details-table-no-padding">
              <CheckBox />
            </th>
            <th>Person</th>
            <th>Connections</th>
            <th>Created On</th>
            <th>Created By</th>
            <th>Updated By</th>
            <th className="people-details-table-no-padding"></th>
          </tr>
          {people?.map((person: any, index: number) => (
            <tr key={index}>
              <td className="people-details-table-no-padding">
                <CheckBox />
              </td>
              <td>{person.name}</td>
              <td>
                {person.connections?.length > 0
                  ? person.connections
                      .map((connection: any) => connection.name)
                      .join(", ")
                  : "No Connections"}
              </td>
              <td>{format(parseISO(person.createdAt), "dd MMM yyyy")}</td>
              <td>{person.createdBy.fullName}</td>
              <td>{person.updatedBy.fullName}</td>
              <td className="people-details-table-no-padding">
                <ListDropDown
                  LabelWrapperClass="people-details-table-menu-icon"
                  dropdownFloatDirection="left"
                  menuIcon="vertical"
                  listItems={["Edit", "Delete"]}
                  listItemContainerClass="people-details-table-menu-list-container"
                  listItemClass="people-details-table-menu-list-item"
                  onSelectItem={(menus) =>
                    handleSelectedMenu(menus, person._id)
                  }
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
      {showEditPersonPopup && (
        <Popup
          display={showEditPersonPopup}
          align="flex-start"
          justify="flex-end"
          onClose={handleCloseEditPersonPopup}
        >
          <div className="people-details-edit-person-container">
            <AiOutlineClose
              className="people-details-edit-person-container-close-button"
              onClick={handleCloseEditPersonPopup}
            />
            <AddOrUpdatePerson
              person={getActivePerson(activePersonIDs[0])}
              onUpdate={handleCloseEditPersonPopup}
            />
          </div>
        </Popup>
      )}
    </Fragment>
  );
};

export default PeopleDetails;
