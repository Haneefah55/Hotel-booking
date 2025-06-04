

import SearchForm from '../component/SearchForm.jsx'
import Card from '../component/Card.jsx'

const Homepage = () => {
  
  
  
  
  
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
      <div className=" w-screen md:h-screen h-auto bg-gray-200 flex flex-col items-center justify-center pb-5 mb-20">
        <div className=" flex items-center flex-col justify-self-center md:w-[700px] mt-10 mb-10 text-gray-900">
          <h2 className=" text-3xl text-amber-800 mb-5  font-bold">Featured Destination</h2>
          <p className="text-xl/7 text-center ">Discover our carefully selected exceptional properties around the world, offering unrivaled luxury and unforgettable experiences.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-7 pb-15 mt-10">
          <Card />
          <Card />
          <Card />
          <Card />
          
        </div>
        
      </div>
      
  
      
    </div>
  
  
  
  )
}
export default Homepage