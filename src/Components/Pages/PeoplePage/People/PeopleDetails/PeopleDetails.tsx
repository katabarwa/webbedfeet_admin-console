import { useSelector } from "react-redux";
import "./PeopleDetails.scss";

type TReduxStateSelector = {
  people: any;
};

const PeopleDetails = () => {
  const people: any = useSelector<TReduxStateSelector>((state) => state.people);

  return <div>PeopleDetails</div>;
};

export default PeopleDetails;
