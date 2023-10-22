import Cart from "./Cart";
import { restaurantList } from "../src/Config";
import { useState, useEffect, useContext } from "react";
import Shimmar from "./Shimmar";
import { API_URL } from "../src/Config";
import RestaurantMenu from "./RestaurantMenu";
import { Link } from "react-router-dom";
import useOnline from "../utils.js/useOnline";
import { UserContext } from "../utils.js/UserContext";


function filterData(searchText, restaurants) {
  const filterData = restaurants.filter((restaurant) =>
    restaurant.data.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return filterData;
}

const Body = () => {
  const [searchText, setSearchText] = useState("Burger");
  const [filterRestaurant, setFilterRestaurant] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const { user, setUser } = useContext(UserContext);

  async function getData() {
    const res = await fetch(API_URL);
    const data = await res.json();
    setFilterRestaurant(data?.data?.cards[2]?.data?.data?.cards);
    setAllRestaurants(data?.data?.cards[2]?.data?.data?.cards);
    console.log(data);
  }

  useEffect(() => {
    getData();
    console.log("useEffect");
  }, []);

  console.log("render");

  const isOnline = useOnline();
  if (!isOnline) {
    return <h1>You are offline now,Check Your Internet Connection</h1>;
  }

  if (!allRestaurants) return null;

  return allRestaurants.length === 0 ? (
    <Shimmar />
  ) : (
    <div>
      <div className="inline mt-4 ml-1 bg-gray-400 p-2 rounded-sm ">
        <input
          className="outline"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />

        <button
          onClick={() => {
            const data = filterData(searchText, allRestaurants);
            console.log(data);
            if (searchText === "") {
              setFilterRestaurant(restaurantList);
            } else if (filterRestaurant?.length === 0) {
              console.log("not found");
              return <h1 className="not-found">Not found</h1>;
            } else {
              setFilterRestaurant(data);
            }
          }}
          className="bg-gray-500 rounded ml-2 p-1"
        >
          Search
        </button>  
      </div>

      <input
        value={user.name}
        onChange={e =>
          setUser({
            name: e.target.value,
            email: "m@gmail.com",
          })
        }
      ></input>

<input
        value={user.email}
        onChange={e =>
          setUser({
            name:"Akhil",
            email:  e.target.value,
          })
        }
      ></input>

      <div
        className="flex flex-wrap gap-10 mt-4 w-full
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px "
      >
        {filterRestaurant?.map((restaurant) => {
          return (
            <Link
              to={"/restaurant/" + restaurant.data.id}
              key={restaurant.data.id}
            >
              <div className="">
                <Cart {...restaurant.data} user={user} />
            
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
