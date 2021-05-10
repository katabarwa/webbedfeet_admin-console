import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import AddOrUpdateShow from "../../Shared/AddOrUpdateShow/AddOrUpdateShow";
import Layout from "../../Shared/Layout/Layout";
import Shows from "./Shows/Shows";
import "./ShowsPage.scss";

const ShowsPage = () => {
  const [addNewShow, setAddNewShow] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const addNewShowURL = new URLSearchParams(location.search).get("new");
    if (addNewShowURL === "yes") {
      setAddNewShow(true);
    }
    if (addNewShowURL !== "yes") {
      setAddNewShow(false);
    }
  }, [location]);

  return (
    <Layout includeFooter={!addNewShow} childrenFixedHeight={addNewShow}>
      <div className="shows-page-wrapper">
        {addNewShow && <AddOrUpdateShow />}
        {!addNewShow && <Shows />}
      </div>
    </Layout>
  );
};

export default ShowsPage;
