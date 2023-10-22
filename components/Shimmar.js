
const Shimmar =()=>{
  return(
    <div className="body">
  {
     Array(10).fill("").map( (e,index)=><div  key={index} className="Shimmar-height"></div>)
  }
   </div>
  )
}
export default Shimmar;