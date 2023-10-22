import React from "react"; 
import { UserContext } from "../utils.js/UserContext";
class Profile extends React.Component{
    
    //constructor is use for initialization
   
    constructor(props){
        super(props);
    // use state
    
        this.state ={
            UserInfo:{
            name:"dummy",
            location:"dei",
            }, 
        };
        console.log("constructor");
    };
       async componentDidMount(){
            const res = await fetch("https://api.github.com/users/Akhilesh0101");
            const data =await res.json();
            this.setState({
                UserInfo:data,
            })
            console.log("componentDidMount");
        }
    
    render(){
        console.log("render")
        
        return(
            <div>
                
               <h1>This is class based  component</h1>
               <img src="https://avatars.githubusercontent.com/u/112152867?v=4"/>
               <h2>Name:{this.state.UserInfo.name}</h2>
               <h2>Location:{this.state.UserInfo.location}</h2>
               <UserContext.Consumer>
                {({user})=><h4>{user.email}</h4>}
               </UserContext.Consumer>
               
               
            </div>
        
    )}
}
export default Profile;