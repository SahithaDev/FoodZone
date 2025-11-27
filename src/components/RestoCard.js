import { CDN_URL } from "../../utils/constant.js";
import resList from "../../utils/mockData.js";
const RestoCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, avgRating, cuisines, costForTwo, sla } =
    resData?.info; /**optional chaining is used to ,  even any of  resdata is not found
  , it wont throw an  error , it will just give undefined**/

  return (
    <div className="p-4 m-4 w-[250px] rounded-lg duration-100 ease-out hover:scale-110">
      <img
        className="rounded-lg"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="font-bold py-2 ">{name}</h3>
      <h4>{avgRating}stars</h4>
      <h4 className="text-slate-500">{cuisines.join(", ")}</h4>

      <h4>{costForTwo}</h4>
      <h4>{sla?.deliveryTime}minutes</h4>
    </div>
  );
};
export const PromotedLabelCard = (Component) => {
  return (props) => {
    return (
      <div>
        <label>Promoted</label>
        <Component {...props} />
      </div>
    );
  };
};
export default RestoCard;
