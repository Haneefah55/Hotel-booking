
import Rating from 'react-rating';
import { CalendarFold, Calendar1, Search, Star, StarHalf } from 'lucide-react';
import { Link } from 'react-router'
import React, { useEffect }from 'react'
import { useHotelStore } from "../store/hotelStore.js"



const HotelPage = () =>{
  
  const { getAllRooms, rooms, error } = useHotelStore()
  
  useEffect(() => {
    getAllRooms()
    if(error){
      alert(error)
    }
  }, []) 
  
  return(
    <div className="w-screen ">
      <div className="w-screen h-[250px] bg-[url(./assets/images/home.jpg)] md:h-[400px] flex bg-no-repeat bg-cover flex-col items-center justify-center relative ">
        <div className="w-full h-full flex flex-col justify-center relative text-gray-100 items-center  pl-5 md:pl-15 bg-black/40">
          <h2 className="text-3xl mt-20 md:mt-0 font-semibold">Hotels</h2>
          <Link to="/home" className="text-md font-light absolute top-20 left-2 md:left-20 ">Back to Home</Link>
        </div>
        
      </div>
     
      <div className=" flex md:absolute md:top-[25%] items-center p-5 md:pl-10">
        <form className="flex flex-col md:flex-row bg-gray-200 w-full md:w-[850px] text-amber-900 rounded-md shadow-sm justify-between md:ml-5 md:backdrop-blur-lg text-md p-5">
          <div className=" flex flex-col w-[230px] gap-4 mb-5">
            <label htmlFor="destination" className=" flex gap-2">
              <CalendarFold />
              <h5>Destination</h5>
            </label>
            <input type="text" placeholder="Type here" name="destination" className="px-4 py-2 focus:outline-amber-800"/>
          </div>
          <div className=" flex flex-col w-[120px] mr-5 gap-4 mb-5">
            <label htmlFor="checkin" className=" flex gap-2">
              <Calendar1 />
              <h5>Check in</h5>
            </label>
            <input type="date" placeholder="dd-mm-yy" name="checkin" className="px-4 focus:outline-amber-800 py-2"/>
            
          </div>
          <div className=" flex flex-col w-[120px]  mr-5 gap-4 mb-5">
            <label htmlFor="checkout" className=" flex gap-2">
              <Calendar1 />
              <h5>Check out</h5>
            </label>
            <input type="date" name="checkout" className="px-4 py-2 focus:outline-amber-800" placeholder="dd-mm-yy" />
            
          </div>
          <div className=" flex flex-col w-[80px] gap-4 mb-5">
            <label htmlFor="guest">Guest</label>
            <input type="number" min={1} max={4} name="guest" placeholder="0" className="px-4 py-2 focus:outline-amber-800" />
            
          </div>
          <button type="submit" className="p-4 bg-amber-800 w-[110px] flex items-center justify-center gap-2 md:self-center text-gray-100 font-semibold hover:bg-transparent hover:text-amber-800 hover:border-2 hover:border-amber-800">
            <Search />
            Search
          </button>
          
        </form>
            
            
    
      </div>
      
      <div className="w-full mt-10 flex gap-8 flex-wrap p-10 items-center justify-center">
        { rooms.map((room, index) => (
          <div key={index} className=" w-[280px] h-[290px] bg-gray-100  rounded-lg shadow-md flex flex-col">
            <img 
            
              src={room.images[0]} 
              alt={`Room ${index + 1}`} 
              className="w-full h-[180px] object-cover rounded-lg"
            />
            <div className="text-amber-900 w-full p-3 flex flex-col ">
              <div className= "flex mb-2 justify-between">
                <h3 className=" flex  font-semibold">{room.name} </h3>
                <span className="flex gap-2 font-semibold">{room?.rating}<Rating initialRating={room?.rating} readonly
                  emptySymbol={<Star className="w-3 h-3 stroke-amber-500" />}
                  fullSymbol={<Star className="w-3 h-3 fill-amber-500 stroke-amber-500" />}
                  /></span>
              </div>
              <div className=" flex justify-between ">
                <div className=" flex gap-2 flex-col ">
                  <p>{room.hotel.name}</p>
                  
                  <p className="text-md font-semibold">${room.price}/night</p>
                </div>
                <Link to={`/room/${room._id}`} className="border-2 p-2 rounded-sm border-amber-800 h-10 flex justify-center items-center hover:bg-amber-800 hover:text-gray-100">
                  Book Now
                </Link>
                
              </div>
              
            </div>
            
          </div>
        
        ))}
        
      </div>
      
      
    </div>
  
  
  
  )
}

export default HotelPage