
import { useHotelStore } from "../store/hotelStore.js"
import { useParams } from 'react-router'
import Rating from 'react-rating';
import React, { useEffect, useState } from 'react'

import { MapPin, Star, StarHalf } from 'lucide-react'
import { Link } from 'react-router'
import { useAuthStore } from "../store/authStore.js"


const SingleHotel = () =>{
    
 
  
  
 const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  
  const { hotels, getSingleHotel } = useHotelStore()
  
 const { user } = useAuthStore()
 

  const addressParts = [
    hotels?.address?.street,
    hotels?.address?.city,
    hotels?.address?.state,
    hotels?.address?.country,
    hotels?.address?.zipCode
    
  ].filter(Boolean); // Removes empty/null/undefined

  const address =  addressParts.join(', ')
  const images = Array.isArray(hotels?.images) ? hotels.images : [];
  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      getSingleHotel(id);
    }
  }, [id, getSingleHotel]); // Only run when ID changes
  
  return(
  
    <div className="w-screen bg-gray-200 h-auto flex gap-7 flex-col ">
      <div className="w-screen bg-[url(./assets/images/hero.png)] flex h-[200px] bg-no-repeat bg-cover items-center justify-center"></div>
            
      <div className="flex px-5 flex-col">
        <div className="flex items-center gap-5 mt-5">
          <h3 className="text-xl">{hotels?.name}</h3>
          <Rating
            initialRating={hotels?.rating}
            readonly
            emptySymbol={<Star className="w-5 h-5 stroke-amber-500" />}
            fullSymbol={<Star className="w-5 h-5 fill-amber-500 stroke-amber-500" />}
          />
        </div>
        
        <p className="font-semibold flex gap-1">
          <MapPin /> {address}</p>
      
      </div>
      <div className=" flex w-full h-[330px] md:h-[400px] px-5 relative mb-10 md:flex-row ">
        {images.map((imageUrl, index) => (
          <div key={index}  className={` absolute rounded-lg h-auto flex  shadow-xl overflow-hidden
        ${index === 0 ? 'md:w-3/6 w-[320px] ml-5 md:ml-0 h-full top-0 left-0' : ''}
        ${index === 1 ? 'w-[220px] h-full top-0 left-[51%]  hidden md:flex' : ''}
        ${index === 2 ? 'w-[230px] h-[300px] top-0 right-0 hidden md:flex ' : ''}
        ${index === 3 ? 'w-[230px] h-[300px] top-[50%] right-0 hidden md:flex ' : ''}`}
      >
            <img 
            
            src={imageUrl} 
            alt={`Hotel ${index + 1}`} 
            className="w-full h-full object-cover rounded-lg"
          />
          </div>
          
        ))}
       
      </div>

      <div className="w-[320px] p-4 md:w-[659px]">
        
        <h2 className=" text-2xl mb-3 text-amber-800 font-semibold" >Description</h2>
        <h3>{hotels?.description}</h3>
          
        <h3 className="mt-6 text-xl mb-1 text-amber-800 font-semibold" >Amenities</h3>
        <p>{hotels?.amenities?.join(', ')}</p>
        
        <h3 className="mt-6 text-xl mb-1 text-amber-800 font-semibold" >Reviews</h3>
        <p className="mt-2 text-gray-600 mb-1 ">No reviews</p>
            
      </div>
      
      
      { user?.role === 'owner' && <Link to="/owner/add-room" className="p-4 bg-amber-800 text-gray-100 ml-10 mb-10 hover:scale-89 w-[150px] hover:bg-amber-500">Add Room</Link>
        
      }

    </div>
  
  )
}

export default SingleHotel