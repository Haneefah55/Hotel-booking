import { config } from "dotenv"
import { Paystack } from 'paystack-sdk';


config()
const PAYSTACK_KEY = process.env.PAYSTACK_TEST_KEY


const paystack = new Paystack(PAYSTACK_KEY)



export const initializeTransaction = async(email, amount, metadata) => {
    try {
        const response = await paystack.transaction.initialize({
            email,
            amount: amount * 100,
            metadata,
        })
        console.log(response.data)
        return response.data
       
    } catch (error) {
        throw new Error(`Paystack initialization error: ${error.message}`);
        
        
    }
}


export const verifyTransaction = async(reference) => {
    try {
        const response = await paystack.transaction.verify(reference)
 
        console.log(response.data)
        return response.data
       
    } catch (error) {
        throw new Error(`Paystack verification error: ${error.message}`);
        
        
    }
}



/** 

export const paystack = axios.create({
    baseURL: 'https://api.paystack.co',
    headers: {
        Authorization: `Bearer ${PAYSTACK_KEY}`,
        'Content-Type': 'application/json',
    },


})
**/

