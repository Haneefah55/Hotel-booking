
import Rating from 'react-rating';
import { CalendarFold, Calendar1, Search, Star, StarHalf } from 'lucide-react';
import { Link } from 'react-router'
import React, { useEffect }from 'react'
import { useHotelStore } from "../store/hotelStore.js"
import Offer from '../component/Offer.jsx'
import SearchForm from '../component/SearchForm.jsx'


const Homepage = () => {
  
  const { getAllRooms, rooms, error } = useHotelStore()
  
  
  useEffect(() => {
    getAllRooms()
    if(error){
      alert(error)
    }
  }, []) 
  
  
  return(
    <div className="w-screen ">
      <div className="w-screen h-screen bg-[url(./assets/images/home.jpg)] flex bg-no-repeat bg-cover items-center justify-center relative ">
        <div className="w-full h-full flex flex-col justify-center items-center md:items-start pl-5 md:pl-15 bg-black/40">
          <div className="mt-10  w-[300px] md:w-[700px] md:pl-20 text-gray-100">
            <h5 className="text-lg font-thin mb-10">Unlock Unforgettable Experiences</h5>
            <h3 className=" text-3xl font-bold mb-6 " >Experience the World, One Stay at a Time</h3>
            <p className="  text-xl/8 ">Discover new destinations and unforgettable experiences. From city breaks to beach getaways, we've got you covered.</p>
          </div>
          
          
        </div>
        
      </div>
      <SearchForm />
      <div className=" w-screen md:h-screen h-auto bg-gray-200 flex flex-col items-center pb-5  justify-center">
        <div className=" flex items-center flex-col justify-self-center p-5 md:w-[700px] mt-10 mb-1 text-gray-900">
          <h2 className=" text-3xl text-amber-800 mb-5  font-bold">Featured Destination</h2>
          <p className="text-xl/7 text-center ">Discover our carefully selected exceptional properties around the world, offering unrivaled luxury and unforgettable experiences.</p>
        </div>
        <div className="w-full flex gap-8 flex-wrap p-5 items-center justify-center">
          { rooms.slice(0, 3).map((room, index) => (
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
      
      <div className=" w-screen md:h-screen h-auto bg-gray-300 flex flex-col items-center pb-5 mb-5">
        
        <div className=" flex items-center flex-col justify-self-center p-5 md:w-[700px] mt-10 mb-1 text-gray-900">
          <h2 className=" text-3xl text-amber-800 mb-5  font-bold">Exclusive Offers</h2>
          <p className="text-xl/7 text-center ">Take advantage of our exclusive time-limited offers and special packages .</p>
        </div>
        
        <Offer />
      </div>
      
  
      
    </div>
  
  
  
  )
}
export default Homepage