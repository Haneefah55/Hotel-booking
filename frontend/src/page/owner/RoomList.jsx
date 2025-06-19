


import { HousePlus } from 'lucide-react';
import { Link } from "react-router";

const RoomList = () =>{
  
  
  
  
  return(
  
    <div className="flex flex-col">
      <div className=" flex flex-col w-[300px] md:w-[600px] text-amber-900">
        <h3 className="text-3xl mb-5 font-semibold">My Room List</h3>
        <p className="mb-5">View, Update and Manage the rooms in your listed hotels. Keep your room's infomation updated to provide ultimate experience to users</p>
        
        <p><strong>Total Rooms:</strong> 0</p>
      </div>
      
      <div className="w-full  overflow-x-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-amber-500 [&::-webkit-scrollbar-thumb]:bg-amber-800 ">
        <table className="border-collapse border-2 border-amber-800 mb-10 mt-5 ">
          <thead>
            <tr>
              <th class="border p-2 border-amber-800 bg-amber-700 text-gray-100">Name</th>
              <th class="border p-2 border-amber-800 bg-amber-700 text-gray-100 ">Number</th>
              <th class="border p-2 border-amber-800 bg-amber-700 text-gray-100">Price</th>
              <th class="border p-2 border-amber-800 bg-amber-700 text-gray-100">Guest</th>
              <th class="border p-2 border-amber-800 bg-amber-700 text-gray-100">Ratings</th>
              <th class="border p-2 border-amber-800 bg-amber-700 text-gray-100">Available</th>
            </tr>
          </thead>
          <tbody className="border-2 border-amber-800">
            
            <tr>
              <td class="border p-2 border-gray-300 text-center">Deluxe Suite</td>
              <td class="border p-2 border-gray-300 text-center">104</td>
              <td class="border p-2 border-gray-300 text-center">$300</td>
              <td class="border p-2 border-gray-300  text-center">2</td>
              <td class="border p-2 border-gray-300 text-center">4.5</td>
              <td class="border p-2 border-gray-300 text-center">Available</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <Link to="/owner/add-room" className=" bg-amber-800 mt-10 w-[150px] text-gray-100 hover:bg-gray-100 hover:border-2 hover:border-amber-800 hover:bg-none hover:text-amber-800 hover:scale-0.85 transition-all duration-150 flex flex-row gap-2 p-4"><HousePlus />Add Room</Link>
      
    </div>
  
  )
}

export default RoomList