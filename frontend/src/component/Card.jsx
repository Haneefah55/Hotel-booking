
import { Bed } from 'lucide-react';



const Card = () =>{
  
  
  return(
    <div className=" w-[280px] h-[290px] bg-gray-100  rounded-lg shadow-md flex flex-col">
      <div className=" w-full h-[180px] rounded-t-lg bg-amber-500">
        
      </div>
      <div className="text-amber-900 p-4">
        <div className= "flex flex-col justify-between">
          <div className=" flex mb-2 justify-between font-semibold">Deluxe Room <span>4.5</span></div>
          
          <div className=" flex gap-2 items-center">
          
            <Bed className="size-4" /> 
            
            <h3>Vibez Hotel </h3>
          </div>
          
        </div>
        <div className=" flex mt-0.5 items-center justify-between">
          <span className="text-md font-semibold">$300/night</span>
          <button className=" border-2 p-2 rounded-sm border-amber-800 hover:bg-amber-800 hover:text-gray-100">Book now</button>
        </div>
      </div>
      
    </div>
    
    
    
  )
}
export default Card