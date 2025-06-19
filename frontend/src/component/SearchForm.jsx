
import { CalendarFold, Calendar1, Search } from 'lucide-react';

const SearchForm = () =>{
  
  
  return(
    <div className=" flex md:absolute md:top-[65%] items-center p-5 md:pl-10">
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
    
    
  )
}

export default SearchForm