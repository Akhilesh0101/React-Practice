import { useContext, useState } from "react";
import Logo from "../assets/image/logo.jpg" 
import { Link } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import useOnline from "../utils.js/useOnline";
import { UserContext } from "../utils.js/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../utils.js/CartSlice";

const Header = () => {

  const [isLogin, setIsLogin]= useState(false);

  const isOnline=useOnline();

  const {user}=useContext(UserContext);

  const cartItems=useSelector(store=>store.cart.items);
  console.log("hello")
  console.log(cartItems);
  const dispatch=useDispatch();

  const changeHandler =()=>{
      dispatch(addItems("graps"));
  }
  return (
    <div className=" flex justify-between bg-slate-200 ">
      <div className="img">
        <img 
          className="h-28 ml-5"
          src={Logo}
        />
      </div>

    

      <div className="right flex gap-8 py-10">
        <h2 className="font-bold"><Link to="/">Home</Link></h2>
        <h2><Link to="./About">About</Link></h2>
        <h2><Link to="./Contact">Contact</Link></h2>
        <h2><Link to="./instaMart">InstaMart</Link></h2>
        <h2>Cart- {cartItems.length}</h2>
        <button className="p-2 m-2 bg-blue-500 rounded" onClick={()=>changeHandler()}>AddItem</button>
        <h2><Link to="./Star">Star</Link></h2>
        
      
      </div>
      <h4 className="font-bold text-fuchsia-600">{user.name}</h4>
      <div>{isOnline?"Online":"Offline"}</div>
       {
        isLogin?(<button onClick={()=>setIsLogin(false)}>LogOut</button>):(<button onClick={()=>setIsLogin(true)}>LogIn</button>)
       }

    </div>
  );
};
export default Header;
