import React, { useState } from 'react'
import { HousePlus, X, CloudUpload } from 'lucide-react'




const AddHotel = () =>{
  
  const [uploadError, setUploadError] = useState("")
  const [images, setImages] = useState([null, null, null, null])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });
  const [amenities, setAmenities] = useState([])
  
  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setAddress({
      ...address,
      [name]: value,
    });
  };
  
  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };
  
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];
  
  const handleSingleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // Validate file type
    if (!ALLOWED_FORMATS.includes(file.type)) {
      setUploadError('Only JPG, PNG, and WEBP formats are allowed.')
      return;
    }
  
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setUploadError('File size must be less than 2MB.');
      return;
    }
  
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImages = [...images];
      newImages[index] = reader.result;
      setImages(newImages);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    
    
    
  }
  
  
  return(
  
    <div className="flex flex-col">
      <div className=" flex flex-col w-[300px] md:w-[600px] mb-5 text-amber-900">
        <h3 className="text-3xl mb-5 font-semibold">
          Add Hotel
        </h3>
        <p className="mb-5">List your hotel with us and ensure to provide detailed information about your hotel </p>
      </div>
    
      <h4 className="text-amber-800 mb-4 font-semibold">Images</h4>

      <div className="flex gap-4 flex-wrap">
              
        {images.map((img, index) =>(
          <div key={index} className="relative w-[100px] h-[100px] border-2 border-dashed border-amber-600 rounded-md  flex items-center justify-center bg-gray-50 overflow-hidden">
             
            
            {img ? (
              <div className="flex relative">
                <img src={img} className="w-full h-full object-cover"  />
                
                <button className="absolute top-1 right-1 bg-amber-800 rounded-full text-gray-100 hover:bg-amber-600 text-sm flex items-center w-5 h-5 p-3 justify-center " 
                  onClick={() => handleRemoveImage(index)}>
                  &times;
                </button>
              </div>
              ) : (
                <label className="w-full h-full cursor-pointer flex flex-col items-center justify-center text-sm text-gray-400 ">
                  <input 
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleSingleImageUpload(e, index)}
                  
                  />
                  
                  <CloudUpload />
                  Upload
                </label>
              )
              
              
            }
            
                              
          </div>
        ))
          
        }
        
        
        { uploadError && <p className="text-sm text-red-600 mt-10">{uploadError}</p>}

      </div>
      
      <form onSubmit={handleSubmit} className="w-[320px] h-auto mt-7 border-x-3 border-amber-800 p-5">
        <input className="w-full outline-none bg-transparent px-1.5 border-b-2 border-amber-800" type="text" placeholder="Hotel Name" required onChange={(e) => (setName(e.target.value))} />
        
        <textarea 
          className="w-full outline-none bg-transparent px-1.5  border-b-2 border-amber-800" 
          placeholder="Hotel description" 
          onChange={(e) => (setDescription(e.target.value))}  
        />
        
        <input
          type="text"
          className="w-full outline-none bg-transparent px-1.5 border-b-2 border-amber-800"
          name="street"
          placeholder="Street"
          value={address.street}
          onChange={handleAddressChange}
        />
        
        <input
          type="text"
          name="city"
          className="w-full outline-none bg-transparent px-1.5  border-b-2 border-amber-800"
          placeholder="City"
          value={address.city}
          onChange={handleAddressChange}
        />
        
        <input
          type="text"
          name="state"
          className="w-full outline-none bg-transparent px-1.5  border-b-2 border-amber-800"
          placeholder="State"
          value={address.state}
          onChange={handleAddressChange}
        />
        
        <input
          type="text"
          name="zip"
          className="w-full outline-none bg-transparent px-1.5 border-b-2 border-amber-800"
          placeholder="ZIP Code"
          value={address.zip}
          onChange={handleAddressChange}
        />
        
        <input
          type="text"
          name="country"
          className="w-full outline-none bg-transparent px-1.5 border-b-2 border-amber-800"
          placeholder="Country"
          value={address.country}
          onChange={handleAddressChange}
        />
      </form>
      

      
      
      
      

      
    
    </div>
  
  
  
  )
}
export default AddHotel