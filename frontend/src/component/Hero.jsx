import React from 'react'
import SearchForm from './SearchForm'

const Hero = () => {
  return (
    <div className="w-full min-h-screen bg-[url(./assets/images/home.jpg)] flex bg-no-repeat bg-cover relative ">
      <div className="w-full h-full flex flex-col bg-black/40 py-10 px-8 md:px-28 border-2 border-indigo-800 justify-center">
        <div className=" w-[300px] md:w-[700px] mt-24 text-gray-100">
            <h5 className="text-md font-thin mb-5">Unlock Unforgettable Experiences</h5>
            <h3 className=" text-2xl font-bold mb-6 " >Experience the World, One Stay at a Time</h3>
            <p className="  text-lg/7 ">Discover new destinations and unforgettable experiences. From city breaks to beach getaways, we've got you covered.</p>
        </div>
        <SearchForm />

      </div>

    </div>
  )
}

export default Hero