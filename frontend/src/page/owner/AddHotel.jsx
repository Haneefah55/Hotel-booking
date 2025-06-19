import React, { useState, useRef } from 'react'
import { HousePlus, X, CloudUpload, Loader,  CircleCheckBig } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useHotelStore } from "../../store/hotelStore.js"
import { useAuthStore } from "../../store/authStore.js"



const AddHotel = () =>{
  
  const [uploadError, setUploadError] = useState("")
  
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)
  
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);
  
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
 
  const items = [
      { id: 1, name: 'Gym and Fitness' },
      { id: 2, name: 'Pool' },
      { id: 3, name: 'Spa' },
      { id: 4, name: 'Free Wifi' },
      { id: 5, name: 'Restaurant and Bar' },
      { id: 6, name: 'Transportation' },
      { id: 7, name: 'Guest Services' },
      { id: 8, name: 'Business Services' },
      
  ];
  
  const handleCheckboxChange = (event) => {
    const itemName= (event.target.value);
    if (event.target.checked) {
      setAmenities([...amenities, itemName]);
    } else {
      setAmenities(amenities.filter(name => name !== itemName));
    }
  };
  
  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setAddress({
      ...address,
      [name]: value,
    });
  };
  
  const handleImageChange = (e, setImage) => {
    
    const file = e.target.files?.[0];
    
    if (!file) return;
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];

    if (!ALLOWED_FORMATS.includes(file.type)) {
      setUploadError('Only JPG, PNG, and WEBP formats are allowed.');
      return;
    }
  
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setUploadError('File size must be less than 2MB.');
      return;
    }

    setImage(file); // Update the correct state
    setUploadError(null)
  };
  
  const handleRemoveImage = (setImage, fileInputRef) => {
    setImage(null); // Clear state
    if (fileInputRef.current) fileInputRef.current.value = ''; // Reset input
  };
  
  const [open, setOpen] = useState(false)
  
  
  const handleOpen = () =>{
    setOpen(true)
  }
  const handleClose = () =>{
    setOpen(false)
  }

  

  
  
  
  const uploadToCloudinary = async (file) => {

    
    const cloudName = "dnhttlxgv"; // Replace with yours
    const uploadPreset = "hotel-images"; // e.g., "unsigned_preset"
  
    try {
    
      if (!file) return

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      
      return data.secure_url // Store Cloudinary URL
    } catch (error) {
      
      alert("Upload failed:", error);
    }
  };
  
  const uploadAll = async () => {
    const urls = await Promise.all([
      image1 ? uploadToCloudinary(image1) : null,
      image2 ? uploadToCloudinary(image2) : null,
      image3 ? uploadToCloudinary(image3) : null,
      image4 ? uploadToCloudinary(image4) : null,
      // ...and so on
    ]);
    return urls
    alert('Uploaded URLs:', urls);
  };
  const navigate = useNavigate()
  const { user } = useAuthStore()
  
  const ownerId = user.id
  
  const { addHotel, isLoading, error } = useHotelStore()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    if (!name || !description || !address || !amenities) {
      alert("Please fill all required fields and upload at least one image.");
      return;
    }
  
    try {
      // Upload images to Cloudinary (only non-null files)
      const uploadedImageUrls = await uploadAll()
      
      // Save hotel data to backend
      await addHotel(
        name,
        description,
        address,
        amenities,
        uploadedImageUrls,
        ownerId
      );
  
      // Success: Show confirmation & redirect
      handleOpen(); // e.g., success modal
      setTimeout(() => navigate("/owner"), 3000);
  
    } catch (error) {
      // User-friendly error message
      const errorMessage = error.response?.data?.message || error.message || "Upload failed.";
      alert(`Error: ${errorMessage}`);
      console.error("Submission error:", error); // Log for debugging
    } finally {
      set({ isLoading: false }); // Reset loading state
    }
  };
  
  
  return(
  
    <div className="flex flex-col relative">
      <div className=" flex flex-col w-[300px] md:w-[600px] mb-5 text-amber-900">
        <h3 className="text-3xl mb-5 font-semibold">
          Add Hotel
        </h3>
        <p className="mb-5">List your hotel with us and ensure to provide detailed information about your hotel </p>
      </div>
    
      <h4 className="text-amber-800  font-semibold">Images</h4>
      <p className="mb-4 text-amber-800 mt-2">images must not be more that 2MB</p>

      <div className="flex gap-4 flex-wrap">
              
    
        <div className="relative w-[100px] h-[100px] border-2 border-dashed border-amber-600 rounded-md  flex items-center justify-center bg-gray-50 overflow-hidden">
           
          
          {image1 ? (
            <div className="flex relative">
              <img 
                src={URL.createObjectURL(image1)}
                alt="Preview 1" className="w-full h-full object-cover"  />
              
              <button className="absolute top-1 right-1 bg-amber-800 rounded-full text-gray-100 hover:bg-amber-600 text-sm flex items-center w-5 h-5 p-3 justify-center " 
                onClick={() => handleRemoveImage(setImage1, fileInputRef1)}
              >
                &times;
              </button>
            </div>
            ) : (
              <label className="w-full h-full cursor-pointer flex flex-col items-center justify-center text-sm text-gray-400 ">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef1}
                  onChange={(e) => handleImageChange(e, setImage1)}
                  
                />
                
                <CloudUpload />
                Upload
              </label>
            )
            
            
          }
          
                            
        </div>
        
        <div className="relative w-[100px] h-[100px] border-2 border-dashed border-amber-600 rounded-md  flex items-center justify-center bg-gray-50 overflow-hidden">
           
          
          {image2 ? (
            <div className="flex relative">
              <img 
                src={URL.createObjectURL(image2)}
                alt="Preview 2" className="w-full h-full object-cover"  />
              
              <button className="absolute top-1 right-1 bg-amber-800 rounded-full text-gray-100 hover:bg-amber-600 text-sm flex items-center w-5 h-5 p-3 justify-center " 
                onClick={() => handleRemoveImage(setImage2, fileInputRef2)}
              >
                &times;
              </button>
            </div>
            ) : (
              <label className="w-full h-full cursor-pointer flex flex-col items-center justify-center text-sm text-gray-400 ">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef2}
                  onChange={(e) => handleImageChange(e, setImage2)}
                  
                />
                
                <CloudUpload />
                Upload
              </label>
            )
            
            
          }
          
                            
        </div>
        
        <div className="relative w-[100px] h-[100px] border-2 border-dashed border-amber-600 rounded-md  flex items-center justify-center bg-gray-50 overflow-hidden">
           
          
          {image3 ? (
            <div className="flex relative">
              <img 
                src={URL.createObjectURL(image3)}
                alt="Preview 3" className="w-full h-full object-cover"  />
              
              <button className="absolute top-1 right-1 bg-amber-800 rounded-full text-gray-100 hover:bg-amber-600 text-sm flex items-center w-5 h-5 p-3 justify-center " 
                onClick={() => handleRemoveImage(setImage3, fileInputRef3)}
              >
                &times;
              </button>
            </div>
            ) : (
              <label className="w-full h-full cursor-pointer flex flex-col items-center justify-center text-sm text-gray-400 ">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef3}
                  onChange={(e) => handleImageChange(e, setImage3)}
                  
                />
                
                <CloudUpload />
                Upload
              </label>
            )
            
            
          }
          
                            
        </div>
        
        <div className="relative w-[100px] h-[100px] border-2 border-dashed border-amber-600 rounded-md  flex items-center justify-center bg-gray-50 overflow-hidden">
           
          
          {image4 ? (
            <div className="flex relative">
              <img 
                src={URL.createObjectURL(image4)}
                alt="Preview 4" className="w-full h-full object-cover"  />
              
              <button className="absolute top-1 right-1 bg-amber-800 rounded-full text-gray-100 hover:bg-amber-600 text-sm flex items-center w-5 h-5 p-3 justify-center " 
                onClick={() => handleRemoveImage(setImage4, fileInputRef4)}
              >
                &times;
              </button>
            </div>
            ) : (
              <label className="w-full h-full cursor-pointer flex flex-col items-center justify-center text-sm text-gray-400 ">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef4}
                  onChange={(e) => handleImageChange(e, setImage4)}
                  
                />
                
                <CloudUpload />
                Upload
              </label>
            )
            
            
          }
          
                            
        </div>
        

      
        
        
        { uploadError && <p className="text-sm text-red-600 mt-10">{uploadError}</p>}

      </div>
      
      
       <p className="mb-3 text-amber-800 font-semibold mt-5">Select Hotel Amenities</p>
      <div className=" mt-3 text-amber-800">
       
          {items.map(item => (
              <div key={item.id}>
                  <input
                      type="checkbox"
                      value={item.name}
                      onChange={handleCheckboxChange}
                      checked={amenities.includes(item.name)}
                  />
                  <label>{item.name}</label>
              </div>
          ))}
      </div>
      <form onSubmit={handleSubmit} className="w-[320px] h-auto mt-7 border-x-3 border-amber-800 p-5">
        <div className=" flex flex-col mb-5 gap-3 w-full">
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
        </div>
        
        <button type="submit" className="flex items-center mt-5 text-gray-100 justify-center gap-2 p-4 bg-amber-800 w-[150px] hover:scale-98 hover:bg-transparent hover:border-2 border-amber-800 hover:text-amber-800">
          {isLoading ? <Loader className="animate-spin h-15 text-gray-100 mx-auto"  /> : <div className="flex items-center justify-center gap-2"><HousePlus />Add Hotel</div>}
          
        </button>
        
       
        
      </form>
      
      { error && <p className="text-sm text-red-600 mt-6">{error}</p>}
      
      <div className={`bg-gray-100 ${open ? "flex" : "hidden"} space-x-3 p-3 text-sm rounded w-[300px] justify-between z-50 items-center absolute flex-row gap-4 top-[50%] border border-gray-300/60`}>
        <CircleCheckBig className="h-10 text-amber-800" />
      
        <h3 className="text-gray-700 font-medium">Hotel Added Successfully</h3>
          
      
        <button type="button" aria-label="close" className="inline-flex active:scale-95 transition" onClick={handleClose}>
          <X />
        </button>
      </div>
      
      
      

      
      
      
      

      
    
    </div>
  
  
  
  )
}
export default AddHotel