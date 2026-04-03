import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

axios.defaults.withCredentials = true

const API_URL= import.meta.env.MODE === "development" ? "http://localhost:5000/api/booking" : "/api/booking"

export const useBookingStore = create(persist((set) => ({

    isLoadingBooking: false,
    error: null,
    bookings: [],
    count: 0,

    createBooking: async(roomId, checkIn, checkOut, guests, specialRequests) =>{

      set({ error: null })

      const checkInDate = new Date(checkIn)
      const checkOutDate = new Date(checkOut)

      try {
        
        const response = await axios.post(`${API_URL}/book`, { roomId, checkInDate, checkOutDate, guests, specialRequests })

        const booking = response.data.booking
  
        set({ error: null, isLoadingBooking: false })


      } catch (error) {

        const errorMessage = error.response.data.message || "Error booking room";
        set({ error: errorMessage, isLoadingBooking: false });

        throw error
        
      }


    }





  }),
  {
    name: 'booking-storage', // 🔒 key in localStorage
    partialize: (state) => ({
      
      bookings: state.bookings
      
      
    }),
  }
))