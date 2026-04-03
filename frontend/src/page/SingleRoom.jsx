

import { useHotelStore } from "../store/hotelStore.js"
import { useBookingStore } from "../store/bookingStore.js"
import { useParams } from 'react-router'
import Rating from 'react-rating';
import React, { useEffect, useState } from 'react'

import { Star, Loader, CircleCheckBig, Wifi, Wine, BriefcaseBusiness, HandPlatter, PlugZap, Utensils, X,  Airplay, SoapDispenserDroplet, Footprints, Fan, Calendar1 } from 'lucide-react'
import { Link } from 'react-router'
import { useAuthStore } from "../store/authStore.js"



const SingleRoom = () =>{

   const [checkIn, setCheckInDate] = useState("")
   const [checkOut, setCheckOutDate] = useState("")
   const [guests, setGuests] = useState("")
   const [specialRequests, setSpecialRequests] = useState("")
   //const [isLoadingBooking, setIsLoadingBooking] = useState(false)
   const [open, setOpen] = useState(false)
   const [isOpen, setIsOpen] = useState(false)

 
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
  const { error, createBooking, isLoadingBooking } = useBookingStore()
  
  const { user } = useAuthStore()
  const images = Array.isArray(rooms?.images) ? rooms.images : [];
  
  const { id } = useParams();
  const roomId = id
  const handleCancelBooking = async() =>{

    console.log("booking cancelled")
  }
  
  const handleBooking = async(e) =>{

    e.preventDefault()
    
    if(user.role !== "guest"){
      setOpen(true)
      return

    }
    //alert(`${id}, ${checkInDate}, ${checkOutDate}, ${guests}, ${specialRequests}`)
    
    try {
      await createBooking(roomId, checkIn, checkOut, guests, specialRequests)


      setIsOpen(true)
    } catch (error) {
      alert(error)
    }
  
    


    
    


  }
  
  
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
      
      <div className=" flex w-full h-[330px] md:h-[400px] md:ml-5 md:mr-5  mb-10 md:flex-row gap-3">
        
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

      <div className="flex flex-col md:flex-row items-center relative justify-around flex-wrap gap-10">
        <div>
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
        </div>

        <div className="w-[300px] h-[400px] p-4 bg-gray-100 text-amber-900 rounded-sm overflow-y-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-amber-500 [&::-webkit-scrollbar-thumb]:bg-amber-800 ">
          <h3 className="text-2xl font-semibold mb-4">Book Room</h3>
          <form onSubmit={handleBooking} className="flex flex-col">

            <div className=" flex flex-col mr-5 gap-4 mb-5">
              <label htmlFor="checkin" className=" flex gap-2">
                <Calendar1 />
                <h5>Check in</h5>
              </label>
              <input type="date" placeholder="dd-mm-yy" id="checkin" className="px-4 focus:outline-amber-800 py-2" onChange={(e) => (setCheckInDate(e.target.value))} />
              
            </div>
            <div className=" flex flex-col mr-5 gap-4 mb-5">
              <label htmlFor="checkout" className=" flex gap-2">
                <Calendar1 />
                <h5>Check out</h5>
              </label>
              <input type="date" id="checkout" className="px-4 py-2 focus:outline-amber-800" placeholder="dd-mm-yy" onChange={(e) => (setCheckOutDate(e.target.value))}/>
              
            </div>

            <div className=" flex flex-col gap-4 mb-5">
              <label htmlFor="guest">No of guests</label>
              <input type="number" min={1} max={4} id="guest" placeholder="0" className="px-4 py-2 focus:outline-amber-800" onChange={(e) => (setGuests(e.target.value))}/>
              
            </div>

            <div className=" flex flex-col gap-4 mb-5">
              <label htmlFor="request">Special Request</label>
              <textarea id="request" placeholder="Enter a request" className="px-4 py-2 focus:outline-amber-800 h-[150px]" onChange={(e) => (setSpecialRequests(e.target.value))}></textarea>
              
            </div>

            { error && <p className="mt-3 mb-3 text-red-600 text-sm">{error}</p>}
            

            <button 
              type="submit" 
              className="bg-amber-800 text-gray-100 p-3 mb-3 self-center w-[100px]"
              disabled={isLoadingBooking}
              >
              {isLoadingBooking ? <Loader className="animate-spin mx-auto" /> : "Book"}
              
              </button>
            


          </form>
        </div>
        <div className={`bg-gray-100 text-amber-800 p-5 space-x-3  rounded w-[300px] justify-between z-50 items-center absolute flex-row gap-5  text-md top-[50%] border border-gray-300/60 ${open ? "flex" : "hidden"}`} >
          <div className="text-center">
            <h3 className="text-gray-700 font-medium mb-5">Please login as guest to continue</h3>
            <Link to="/login" className="p-3 bg-gray-300 text-md text-amber-800 hover:bg-transparent ">Login</Link>
          </div>
      
          
          
      
          <button type="button" aria-label="close" className="flex  self-start active:scale-95 transition" onClick={(e) => (setOpen(false))}>
            <X />
          </button>
        </div>

        <div className={`bg-gray-100 text-amber-800 p-5 space-x-3 rounded w-[310px] justify-between z-50 items-center absolute flex gap-5 text-sm top-[50%] border border-gray-300/60 ${isOpen ? "flex" : "hidden"}`} >
          <div className="text-center">
            <h3 className="text-gray-700 font-medium mb-5">Your booking is confirmed<br />Continue to pay to complete your booking</h3>
            <div className="flex gap-2 items-center justify-center">
              <Link to="/payment" className="p-3 bg-gray-300 text-md text-amber-800 hover:bg-transparent ">Pay now!</Link>
              <button onClick={handleCancelBooking} className="p-3 bg-gray-300 text-md text-amber-800 hover:bg-transparent ">Cancel Booking</button>

            </div>
            
          </div>
          
      
          <button type="button" aria-label="close" className="flex self-start active:scale-95 transition" onClick={(e) => (setIsOpen(false))}>
            <X />
          </button>
        </div>

      </div>
    
      
    </div>
  
  
  )
}

export default SingleRoom