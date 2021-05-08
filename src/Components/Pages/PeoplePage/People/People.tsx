import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../../../../Functions/apiRequest";
import Loader from "../../../Shared/Loader/Loader";
import NoPeople from "./NoPeople/NoPeople";
import "./People.scss";
import PeopleDetails from "./PeopleDetails/PeopleDetails";

type TReduxStateSelector = {
  people: any;
};

const People = () => {
  const people: any = useSelector<TReduxStateSelector>((state) => state.people);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!people) {
      setIsLoading(true);
      const retrieveShows = async () => {
        let response = await apiRequest("/people", "GET");
        if (response.success) {
          dispatch({ type: "people", value: response.data });
        }
        setIsLoading(false);
      };

      retrieveShows();
    }
  }, []);

  return isLoading ? (
    <Loader loaderWrapperClassName="people-loader" />
  ) : (
    <div>
      {!people && <NoPeople />}
      {people && <PeopleDetails />}
    </div>
  );
};

export default People;
