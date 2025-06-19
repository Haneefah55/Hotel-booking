
import { HousePlus, Trash2 } from 'lucide-react';
import { Link, useNavigate } from "react-router";
import { useHotelStore } from "../../store/hotelStore.js"
import { useAuthStore } from "../../store/authStore.js"
import React, { useEffect }from 'react'




const HotelList = () =>{
  
  const { user } = useAuthStore()
  const id = user.id
  const { hotels, count, getOwnerHotel } = useHotelStore()
  const navigate = useNavigate()
 // alert(JSON.stringify(hotels))
  
  
  const handleRowClick = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };
  
  useEffect(() => {
    getOwnerHotel(id)
    //window.alert(JSON.stringify(user))
  }, []) 

  return(
  
    <div className="flex flex-col">
      <div className=" flex flex-col w-[300px] md:w-[600px] text-amber-900">
        <h3 className="text-3xl mb-5 font-semibold">My Hotel List</h3>
        <p className="mb-5">View, Update and Manage your listed hotels. Keep your hotel's infomation updated to provide ultimate experience to users</p>
        
        <p><strong>Total Hotels:</strong> {count}</p>
      </div>
      
      <div className="w-full  overflow-x-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-amber-500 [&::-webkit-scrollbar-thumb]:bg-amber-800 ">
        <table className="border-collapse border-2 border-amber-800 w-[600px] mb-10 mt-5 ">
          <thead>
            <tr>
              <th class="border p-2 border-amber-800 bg-amber-700 text-gray-100">Name</th>
              <th class="border p-2 border-amber-800 bg-amber-700 text-gray-100 ">Amenities</th>
              <th class="border p-2 border-amber-800 bg-amber-700 text-gray-100">Ratings</th>
              
              <th class="border p-2 border-amber-800 bg-amber-700 text-gray-100">Approved</th>
            </tr>
          </thead>
          
          <tbody 
            className="border-2 border-amber-800"
          >
            {hotels.map((hotel) =>(
                
              <tr className="cursor-pointer"
                key={hotel._id} onClick={() => handleRowClick(hotel._id)} >
                <td class="border p-2 border-gray-300 text-center">{hotel.name}</td>
                <td class="border p-2 border-gray-300 text-center">{hotel.amenities.slice(0, 3).join(", ")}</td>
                <td class="border p-2 border-gray-300 text-center">{hotel.rating}</td>
              
                <td class="border p-2 border-gray-300 text-center">{hotel.approved  ? "Yes" : "No"}</td>
                <td className="w-[50px] text-center p-2 border-b hover:text-amber-900 text-amber-800 border-gray-300">
                  <button>
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>  
            
            
    
            
            ))}
              
          
            
          </tbody>
        </table>
      </div>
      
      <Link to="/owner/add-hotel" className=" bg-amber-800 mt-10 w-[150px] text-gray-100 hover:bg-gray-100 hover:border-2 hover:border-amber-800 hover:bg-none hover:text-amber-800 hover:scale-0.85 transition-all duration-150 flex flex-row gap-2 p-4"><HousePlus />Add Hotel</Link>
      
    </div>
  
  )
}

export default HotelList