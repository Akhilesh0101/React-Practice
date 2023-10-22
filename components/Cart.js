import { useContext } from "react";
import { IMG_CDN_URL } from "../src/Config";
import { UserContext } from "../utils.js/UserContext";
import { addItems } from "../utils.js/CartSlice";
import { useDispatch } from "react-redux";

const Cart = ({ name, cloudinaryImageId, cuisines, locality /*,user*/}) => {
  const {user}=useContext(UserContext);

  const dispatch= useDispatch();
  const handleAddItem=()=>{
    dispatch(addItems({name}));
  
  }
  return (
  
    <div className=" w-60 baseline- p-2 m-2 shadow-lg bg-pink-50  overflow-hidden" >
      <div className="">
      <img src={IMG_CDN_URL + cloudinaryImageId} width="250px" height="250px" />
      </div>
      <h2 className="font-bold">{name}</h2>
      <h3 className="">{cuisines.join(",")}</h3>
      <h4 className="font-bold">{locality}</h4>
      {/* <h4>{user.name}</h4> */}
      <h4>{user.name}</h4>
      <h4>{user.email}</h4>
      <button className="p-2 m-2 bg-blue-500" onClick={()=>handleAddItem()}>+</button>
    </div>
  );
};

export default Cart;
