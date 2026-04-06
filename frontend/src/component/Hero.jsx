import React from 'react'
import SearchForm from './SearchForm'

const Hero = () => {
  return (
    <div className="w-full h-screen bg-[url(./assets/images/home.jpg)] flex bg-no-repeat bg-cover relative ">
      <div className="w-full h-full flex flex-col bg-black/40 py-10 px-28 justify-center">
        <div className=" w-[300px] md:w-[700px] text-gray-100">
            <h5 className="text-lg font-thin mb-5">Unlock Unforgettable Experiences</h5>
            <h3 className=" text-3xl font-bold mb-6 " >Experience the World, One Stay at a Time</h3>
            <p className="  text-xl/8 ">Discover new destinations and unforgettable experiences. From city breaks to beach getaways, we've got you covered.</p>
        </div>
        <SearchForm />

      </div>

    </div>
  )
}

export default Hero