import RestoCard, { PromotedLabelCard } from "./RestoCard";
import resList from "../../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setlistOfRestaurants] = useState([]);
  const [filteredRestaurant, setfilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const RestaurantCardPromoted = PromotedLabelCard(RestoCard);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=17.406498&lng=78.47724389999999&carousel=true&third_party_vendor=1"
      );
      const json = await response.json();
      console.log(json?.data);

      const restaurantData =
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      setlistOfRestaurants(restaurantData);
      setfilteredRestaurant(
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      console.log(restaurantData);
    } catch (err) {
      console.error("Fetch Error:", err); // Shows full error object
    }
  };
  console.log(listOfRestaurants);

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return <h1>Please check your internet conenction.</h1>;

  return (
    <div className="body">
      <div className="Filter flex justify-between items-center">
        <div className="search m-2 p-2">
          <input
            type="text"
            className="border border-solid border-black rounded-sm w-150 value autofocus maxlength=200"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              console.log(searchText);
            }}
          />
          <button
            className="p-2  bg-yellow-100 m-2 rounded-lg"
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter((resData) =>
                resData.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              );
              setfilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div>
          <button
            className="p-2 m-2 bg-yellow-100 flex w-auto rounded-lg "
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (resData) => resData.info.avgRating >= 4.5
              );
              console.log(filteredList);
              setfilteredRestaurant(filteredList);
            }}
          >
            Top rated
          </button>
        </div>
        <div>
          <button>
            onclick={()=>{
              const

            }}
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {listOfRestaurants && listOfRestaurants.length > 0 ? (
          filteredRestaurant.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
            >
              {restaurant.info.promoted ? (
                <RestaurantCardPromoted resData={restaurant} />
              ) : (
                <RestoCard resData={restaurant} />
              )}
            </Link>
            //conditional rendering
          ))
        ) : (
          <Shimmer /> // Placeholder or Loader Component
        )}
      </div>
    </div>
  );
};

export default Body;
