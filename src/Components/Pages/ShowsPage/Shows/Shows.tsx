import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiRequest from "../../../../Functions/apiRequest";
import Loader from "../../../Shared/Loader/Loader";
import NoShows from "./NoShows/NoShows";
import "./Shows.scss";
import ShowsDetails from "./ShowsDetails/ShowsDetails";

type TReduxStateSelector = {
  shows: any;
};

const Shows = () => {
  const shows: any = useSelector<TReduxStateSelector>((state) => state.shows);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!shows) {
      setIsLoading(true);
      const retrieveShows = async () => {
        let response = await apiRequest("/shows", "GET");
        if (response.success) {
          dispatch({ type: "shows", value: response.data });
        }
        setIsLoading(false);
      };

      retrieveShows();
    }
  }, []);

  return isLoading ? (
    <Loader loaderWrapperClassName="shows-loader" />
  ) : (
    <div>
      {!shows && <NoShows />}
      {shows && <ShowsDetails />}
    </div>
  );
};

export default Shows;
