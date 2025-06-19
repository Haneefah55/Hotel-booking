import img1 from '../assets/images/romantic.jpeg'
import img2 from '../assets/images/family.jpeg'
import img3 from '../assets/images/well.jpeg'


const Offer = () =>{
  
  const offers = [
    {
      id: 1,
      discount: 20,
      img: img1,
      name: "Romantic Getaway",
      description: "Escape with your loved one to our luxurious hotel and enjoy a romantic getaway.",
      expires: "Sep 25",
    },
    {
      id: 2,
      discount: 25,
      img: img2,
      name: "Family Fun",
      description: "Bring your family together for a fun-filled stay at our hotel.",
      expires: "Sep 30",
    },
    {
      id: 3,
      discount: 30,
      img: img3,
      name: "Mindful Escape",
      destination: "Stay productive and comfortable at our hotel with our business package.",
      expires: "July 20",
    }
    
    
  ]
  
  
  return(
    
    <div className="w-full mt-10 h-auto flex gap-8 flex-wrap p-5 items-center justify-center" >
       { offers.map((offer, index) => (
          <div key={index} className=" w-[340px] h-[230px] md:w-[380px] bg-gray-100 rounded-xl shadow-md flex flex-col">
            
            <img src={offer.img}
            className="w-full h-full rounded-xl object-cover"
            
            />
            
            
          </div>
        
        ))}
    </div>
    
  )
}
export default Offer