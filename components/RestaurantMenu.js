import { useContext, useEffect, useState } from "react";
import { restaurant_menu_data } from "../src/config";
import { IMG_CDN_URL } from "../src/config";
import { UserContext } from "../utils.js/UserContext";
import { addItems } from "../utils.js/CartSlice";
import { useDispatch } from "react-redux";

const RestaurantMenu = () => {
  const [restaurant, setRestaurant] = useState([]);

  async function filterData() {
    const res = await fetch(restaurant_menu_data);
    const data = await res.json();
    console.log(data);
    setRestaurant(data?.data?.cards[0]?.card.card?.info);
  }

  useEffect(() => {
    filterData();
  }, []);
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const clickHandler = () => {
    dispatch(addItems("graps"));
  };

  return (
    <div key={restaurant.id}>
      <h1>{restaurant.name}</h1>
      <img src={IMG_CDN_URL + restaurant.cloudinaryImageId} />
      <h2>{restaurant.areaName}</h2>
      <h2>{restaurant.costForTwoMessage}</h2>

      <button className="m-2 p-2 bg-slate-700" onClick={() => clickHandler()}>
        addItems
      </button>
      <h2>{restaurant.avgRating}</h2>
      <span>
        This is designed by {user.name} - {user.email}
      </span>
    </div>
  );
};
export default RestaurantMenu;
