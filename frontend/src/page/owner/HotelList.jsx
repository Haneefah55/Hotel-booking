
import { HousePlus } from 'lucide-react';
import { Link } from "react-router";

const HotelList = () =>{
  
  
  
  
  return(
  
    <div className="flex flex-col">
      <div className=" flex flex-col w-[300px] md:w-[600px] text-amber-900">
        <h3 className="text-3xl mb-5 font-semibold">My Hotel List</h3>
        <p className="mb-5">View, Update and Manage your listed hotels. Keep your hotel's infomation updated to provide ultimate experience to users</p>
        
        <p><strong>Total Hotels:</strong> 0</p>
      </div>
      
      <div className="w-full  overflow-x-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-amber-500 [&::-webkit-scrollbar-thumb]:bg-amber-800 ">
        <table className="border-collapse border-2 border-amber-800 mb-10 mt-5 ">
          <thead>
            <tr>
              <th class="border p-2 border-amber-800 bg-amber-700 text-gray-100">Name</th>
              <th class="border p-2 border-amber-800 bg-amber-700 text-gray-100 ">Amenities</th>
              <th class="border p-2 border-amber-800 bg-amber-700 text-gray-100">Ratings</th>
              <th class="border p-2 border-amber-800 bg-amber-700 text-gray-100">Reviews</th>
              <th class="border p-2 border-amber-800 bg-amber-700 text-gray-100">Approved</th>
            </tr>
          </thead>
          <tbody className="border-2 border-amber-800">
            
            <tr>
              <td class="border p-2 border-gray-300 text-center">Morgan Hotel</td>
              <td class="border p-2 border-gray-300 text-center">Gym, Pool, Spa, Resturant</td>
              <td class="border p-2 border-gray-300 text-center">4.5</td>
              <td class="border p-2 border-gray-300  text-center">10</td>
              <td class="border p-2 border-gray-300 text-center">Approved</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <Link to="/owner/add-hotel" className=" bg-amber-800 mt-10 w-[150px] text-gray-100 hover:bg-gray-100 hover:border-2 hover:border-amber-800 hover:bg-none hover:text-amber-800 hover:scale-0.85 transition-all duration-150 flex flex-row gap-2 p-4"><HousePlus />Add Hotel</Link>
      
    </div>
  
  )
}

export default HotelList