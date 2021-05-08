import { useSelector } from "react-redux";
import "./ShowsDetails.scss";

type TReduxStateSelector = {
  shows: any;
};

const ShowsDetails = () => {
  const shows: any = useSelector<TReduxStateSelector>((state) => state.shows);

  return <div>ShowsDetails</div>;
};

export default ShowsDetails;
