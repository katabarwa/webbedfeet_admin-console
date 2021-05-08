import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import AddOrUpdatePerson from "../../Shared/AddOrUpdatePerson/AddOrUpdatePerson";
import Layout from "../../Shared/Layout/Layout";
import People from "./People/People";
import "./PeoplePage.scss";

const PeoplePage = () => {
  const [addNewPerson, setAddNewPerson] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const addNewShowURL = new URLSearchParams(location.search).get("new");
    if (addNewShowURL === "yes") {
      setAddNewPerson(true);
    }
    if (addNewShowURL !== "yes") {
      setAddNewPerson(false);
    }
  }, [location]);

  return (
    <Layout>
      <div className="people-page-wrapper">
        {addNewPerson && <AddOrUpdatePerson />}
        {!addNewPerson && <People />}
      </div>
    </Layout>
  );
};

export default PeoplePage;
