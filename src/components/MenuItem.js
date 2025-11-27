import { CDN_URL } from "../../utils/constant";

const MenuItem = ({ menuInfo }) => {
  const { name, price, defaultPrice, description, imageId } = menuInfo;
  return (
    <li className="flex items-star mb-6">
      <div className="ml-6 flex-1">
        <h4 className="font-medium">{name}</h4>
        {price && <span> Rs {(price / 100).toFixed(2)}</span>}
        {defaultPrice && <span> Rs {(defaultPrice / 100).toFixed(2)}</span>}
        {description && <p>{description}</p>}
      </div>
      {imageId && (
        <img
          src={CDN_URL + imageId}
          alt={name}
          className="w-24 h-24 object-cover rounded-lg ml-6 flex-shrink-0 "
        />
      )}
    </li>
  );
};

export default MenuItem;
