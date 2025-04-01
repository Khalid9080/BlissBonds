// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import React, { useEffect, useState } from 'react';
// import useAxiosSecure from '../Hooks/useAxiosSecure';
// import useCard from '../Hooks/useCard';
// import useAuth from '../Hooks/useAuth';


// const CheckOut_Form = () => {

//     const stripe = useStripe();
//     const elements = useElements();
//     const [error,setError] = useState('');
//     const axiosSecure = useAxiosSecure();
//     const[card]=useCard();
//     const {user} = useAuth(); 
//     const [clientSecret, setClientSecret] = useState('');

//     const totalPrice = card.reduce((total,item)=>total+item.price,0);
   

//     useEffect( () => {
//         axiosSecure.post('/create-payment-intent',{price:totalPrice})
//         .then(res=>{
//             console.log(res.data.clientSecret);
//             setClientSecret(res.data.clientSecret);
//         })
//     }, [axiosSecure, totalPrice]);

    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Form Submitted!");

//         if (!stripe || !elements) {
//             return;
//         }
//         const card = elements.getElement(CardElement);

//         if (card == null) {
//             return;
//         }

//         // Use your card Element with other Stripe.js APIs
//         const { error, paymentMethod } = await stripe.createPaymentMethod({
//             type: 'card',
//             card,
//         });

//         if (error) {
//             console.log('[error]', error);
//             setError(error.message);
//         } else {
//             console.log('[PaymentMethod]', paymentMethod);
//             setError('');
//         }

//         // confirm payment
//         const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(clientSecret,{
//             payment_method: {
//                 card: card,
//                 billing_details: {
//                     email: user.email || 'Annonyomus',
//                     name:user?.displayName || 'Annonyomus',
//                 },
//             }

//         }) 

//         if(confirmError){
//             console.log('[error]', confirmError);
           
//         }
//         else{
//             console.log('[PaymentIntent]', paymentIntent);
            
//         }
//     }
//     return (
//         <form onSubmit={handleSubmit} className="w-full max-w-[24rem] mx-auto mt-20">
//             <CardElement
//                 options={{
//                     style: {
//                         base: {
//                             fontSize: '16px',
//                             color: '#424770',
//                             '::placeholder': {
//                                 color: '#aab7c4',
//                             },
//                         },
//                         invalid: {
//                             color: '#9e2146',
//                         },
//                     },
//                 }}
//             />
//             <button type="submit" disabled={!stripe || !clientSecret}>
//                 Pay
//             </button>
//             <p className='text-red-700'>{error}</p>
//         </form>
//     );
// };

// export default CheckOut_Form;






