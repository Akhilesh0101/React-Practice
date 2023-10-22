import { Outlet } from "react-router-dom";
import Profile from "./Profile";
import { useState } from "react";

const About = (props)=>{
    const[count, setCount] = useState("0");
    return(
        <div>
            <h2>Name:{props.name}</h2>
            <button onClick={()=>setCount(1)}>Count:{count}</button>
           <h1>This is functional </h1> 
            <Profile name={"Akhilesh"}/>

        </div>
    )
}
export default About;