import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { MENU_URL } from "../../utils/constant";
import AccordionCategory from "./AccordionCategory";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [resMenu, setResMenu] = useState([]); // Menu categories
  const [activeIndex, setActiveIndex] = useState(null); // Accordion state
  const { resId } = useParams();

  useEffect(() => {
    const fetchRestaurantMenu = async () => {
      try {
        const response = await fetch(MENU_URL + resId);
        const json = await response.json();

        // Debug logs to inspect data
        console.log("Full API Response:", json);

        // Extract restaurant info safely
        const infoData = json?.data?.cards?.find(
          (card) => card?.card?.card?.info
        )?.card?.card?.info;

        console.log("Extracted Restaurant Info:", infoData);

        setResInfo(infoData || null);

        // Extract menu categories/group cards
        const menuData =
          json?.data?.cards
            ?.find((obj) => obj?.groupedCard)
            ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
              (obj) =>
                obj?.card?.card["@type"]?.includes("ItemCategory") ||
                obj?.card?.card["@type"]?.includes("NestedItemCategory")
            )
            ?.map((item) => {
              const title = item?.card?.card?.title;
              const itemCards = item?.card?.card?.itemCards || [];
              const categories = item?.card?.card?.categories || [];
              const type = item?.card?.card["@type"];

              if (type?.includes("NestedItemCategory")) {
                return {
                  title,
                  type: "nested",
                  categories: categories?.map((subcategory) => ({
                    title: subcategory?.title,
                    itemCards: subcategory?.itemCards,
                    type: "item",
                  })),
                };
              } else {
                return {
                  title,
                  itemCards,
                  type: "item",
                };
              }
            }) || [];

        setResMenu(menuData);
      } catch (err) {
        console.error("Fetching error:", err);
      }
    };

    fetchRestaurantMenu();
  }, [resId]);

  if (resInfo === null) return <Shimmer />;
  if (!resInfo) return <div>No restaurant info found.</div>;

  const { name, locality, avgRating } = resInfo;

  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="container mx-auto my-auto ">
      <div className=" text-center mb-10 mr-10">
        <h2 className="text-3xl font-bold">{name}</h2>
        <p>{locality}</p>
        <p>Rating: {avgRating}</p>
      </div>

      {/* Accordion List */}
      {resMenu.map((category, idx) => (
        <AccordionCategory
          key={category.title || idx}
          data={category}
          isActive={activeIndex === idx}
          onClick={() => handleAccordionClick(idx)}
        />
      ))}
    </div>
  );
};

const MenuItem = ({ menuInfo }) => {
  const { name, price, defaultPrice, description } = menuInfo;
  return (
    <li className="mb-3">
      <h4 className="font-medium">{name}</h4>
      {price && <span> Rs {(price / 100).toFixed(2)}</span>}
      {defaultPrice && <span> Rs {(defaultPrice / 100).toFixed(2)}</span>}
      {description && <p>{description}</p>}
    </li>
  );
};

export default RestaurantMenu;
