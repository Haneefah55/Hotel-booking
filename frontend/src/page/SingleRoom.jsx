

import { useHotelStore } from "../store/hotelStore.js"
import { useParams } from 'react-router'
import Rating from 'react-rating';
import React, { useEffect, useState } from 'react'

import { Star, Loader, StarHalf, Wifi, Wine, BriefcaseBusiness, HandPlatter, PlugZap, Utensils, Bubbles,  Airplay, SoapDispenserDroplet, Footprints, Fan, Check } from 'lucide-react'
import { Link } from 'react-router'
import { useAuthStore } from "../store/authStore.js"



const SingleRoom = () =>{
  
 
  const amenityIcon ={
    'Entertainment': <Airplay size={20} />,
    'Free Wifi': <Wifi size={20}  />,
    'WorkSpace': <BriefcaseBusiness size={20}  />,
    'Mini-bar': <Wine size={20} />,
    'Room Services': <HandPlatter  size={20} />,
    'USB Charging Points': <PlugZap  size={20} />,
    'Bathrobes & Slippers': <Footprints size={20}  />,
    'Toiletries': <SoapDispenserDroplet size={20}  />,
    'Breakfast': <Utensils size={20} />,
    'Air Conditioner': <Fan size={20}  />,
      
  }


  
  
  const { rooms, getSingleRoom, isLoading } = useHotelStore()
  
  const { user } = useAuthStore()
  const images = Array.isArray(rooms?.images) ? rooms.images : [];
  
  const { id } = useParams();
  
  
  
  
  useEffect(() => {
    if (id) {
      getSingleRoom(id);
    }
  }, [])
  
  if(isLoading || !rooms){
    return <div className="w-screen bg-gray-200 h-screen flex items-center justify-center"><Loader className="animate-spin m-auto text-3xl text-amber-800" /></div>
  }
  
  return(
  
  
    <div className="w-screen bg-gray-200 h-auto flex gap-7 flex-col pb-10 ">
      <div className="w-screen bg-[url(./assets/images/hero.png)] flex h-[200px] bg-no-repeat bg-cover items-center justify-center">
        <Link to="/" className="mt-10 text-gray-200">Back to Home</Link>
      </div>
      <div className="flex px-5 flex-col">
        <div className="flex items-center gap-5 mt-5">
          <h3 className="text-xl font-semibold">{rooms?.name}</h3>
          <Rating
            initialRating={rooms?.rating}
            readonly
            emptySymbol={<Star className="w-5 h-5 stroke-amber-500" />}
            fullSymbol={<Star className="w-5 h-5 fill-amber-500 stroke-amber-500" />}
          />
        </div>
        <p className="text-xl mt-2">{rooms?.hotel?.name}</p>
        
      
      </div>
      
      <div className=" flex w-full h-[330px] md:h-[400px] md:ml-5 md:mr-5 relative mb-10 md:flex-row gap-3">
        
        {images.map((imageUrl, index) => (
          <div key={index}  className={`rounded-lg h-auto flex  shadow-xl overflow-hidden
          ${index === 0 ? 'md:w-3/6 w-[320px] ml-5 md:ml-0 h-full ' : ''}
          ${index === 1 ? 'w-[220px] h-full hidden md:flex' : ''}
          ${index === 2 ? 'w-[230px] h-full hidden md:flex ' : ''}`}
      >
            <img 
            
            src={imageUrl} 
            alt={`Room ${index + 1}`} 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
          
        ))}
       
      </div>
      
      <div className="flex flex-wrap gap-10 px-6 mb-5 ">
        
        <div className="flex flex-col text-amber-800 gap-1">
          <h4 className="font-semibold text-xl">Price</h4>
          <p>${rooms.price} /night</p>
        </div>
        <div className="flex flex-col text-amber-800 gap-1">
          <h4 className="font-semibold text-xl ">Max Guest</h4>
          <p>{rooms.maxGuests}</p>
        </div>
        <div className="flex flex-col text-amber-800 gap-1">
          <h4 className="font-semibold text-xl ">Room Type</h4>
          <p>{rooms.roomType}</p>
        </div>
      
      </div>
      
      <div className="flex px-6 flex-col mb-5" >
        <h4 className="font-semibold text-amber-800 text-xl mb-4">Room Amenities</h4>
        <ul className="grid grid-cols-2 w-[350px]">
        
          
          {rooms?.amenities?.map((amenity) =>{
            const icon = amenityIcon[amenity]
            return(
              <li key={amenity} className="text-amber-800 flex gap-3 mb-3">
                {icon}
                <span className="text-sm" >{amenity}</span>
              </li>
            )
          
          }
          )} 
        </ul>
        
      </div>
      
      <Link to="/book" className="mx-6 p-3 bg-amber-800 text-gray-200 w-[100px] flex items-center justify-center font-semibold">
        Book
      </Link>
      
    </div>
  
  
  )
}

export default SingleRoom