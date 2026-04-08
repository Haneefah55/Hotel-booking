
import Rating from 'react-rating';
import { CalendarFold, Calendar1, Search, Star, StarHalf } from 'lucide-react';
import { Link } from 'react-router'
import React, { useEffect }from 'react'
import { useHotelStore } from "../store/hotelStore.js"
import Offer from '../component/Offer.jsx'
import SearchForm from '../component/SearchForm.jsx'
import Hero from '../component/Hero.jsx';
import cat1 from '../assets/images/hero.png'
import cat2 from '../assets/images/cat2.jpg'
import cat3 from '../assets/images/family.jpeg'
import cat4 from '../assets/images/romantic.jpeg'


const Homepage = () => {
  
  const { getAllRooms, rooms } = useHotelStore()
  type Cats = {
    name: string,
    link: string,
    img: string,
  }

  const categories: Cats[] = [
    { name: "Budget Hotels", link: "budget-hotels", img: cat1 },
    { name: "Luxury Hotels", link: "luxury-hotels", img: cat2 },
    { name: "Short Stay", link: "short-stay", img: cat3 },
    { name: "Apartment", link: "budget-hotels", img: cat4 },
  ]
  
  
  useEffect(() => {
    getAllRooms()
    
  }, []) 
  
  
  return(
    <div className="w-screen  ">
      <Hero />
      
      <div className='flex md:hidden items-center justify-center mb-6'>
        <SearchForm />

      </div>

      <div className='flex w-full py-10 px-10 flex-col bg-gray-100 justify-center'>
        <h3 className='text-2xl font-semibold'>Explore Categories</h3>
      
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-5 '>

          
         {
            categories.map((cat) => (
              <Link to={`/categories/${cat.link}`} key={cat.name} className='flex'>
                <div className={`w-[250px] h-[200px] flex  p-2 bg-cover relative`} style={{ backgroundImage: `url(${cat.img})`}}>
                  <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
                    <h4 className='text-xl font-medium text-white'>{cat.name}</h4>
                  </div>
                </div>


                
              </Link>

            ))
          } 


        </div>


      </div>
      
   
      
      {/* <div className=" w-screen md:h-screen h-auto bg-gray-200 flex flex-col items-center pb-5  justify-center">
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
      </div> */}
      
      <div className=" w-screen md:h-screen h-auto bg-gray-300 flex flex-col items-center pb-5 mb-5">
        
        <div className=" flex items-center flex-col justify-self-center p-5 md:w-[700px] mt-10 mb-1 text-gray-900">
          <h2 className=" text-3xl text-amber-800 mb-5  font-bold">Exclusive Offers</h2>
          <p className="text-xl/7 text-center ">Take advantage of our exclusive time-limited offers and special packages to enhance your stay and create unforgettable memories</p>
        </div>
        
        <Offer />
      </div>
      
  
      
    </div>
  
  
  
  )
}
export default Homepage