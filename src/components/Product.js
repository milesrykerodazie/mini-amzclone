import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';

//declaration of variables
const MAX_RATING = 5;
const MIN_RATING = 2;

function Product({ id, title, price, description, image, category }) {
   const dispatch = useDispatch();
   const [rating] = useState(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING,
   );

   const [hasPrime] = useState(Math.random() < 0.5);

   const addItemToBasket = () => {
      const product = {
         id,
         title,
         price,
         description,
         image,
         category,
         rating,
         hasPrime,
      };

      //sending the product as an action to the redux store
      dispatch(addToBasket(product));
   };

   return (
      <div className='relative z-30 flex flex-col p-10 m-5 bg-white rounded-md'>
         <p className='absolute text-xs italic text-gray-400 top-2 right-2'>
            {category}
         </p>

         <Image src={image} height={200} width={200} objectFit='contain' />
         <h4 className='my-3'>{title}</h4>
         <div className='flex'>
            {Array(rating)
               .fill()
               .map((_, i) => (
                  <StarIcon key={i} className='h-5 text-yellow-500' />
               ))}
         </div>
         <p className='my-2 text-xs line-clamp-3'>{description}</p>
         <div className='mb-5'>
            <Currency quantity={price} currency='USD' />
         </div>

         {hasPrime && (
            <div className='flex items-center -mt-5 space-x-2'>
               <img
                  className='w-12'
                  src='https://links.papareact.com/fdw'
                  alt=''
               />
               <p className='text-xs text-gray-600'>Free Next-day Delivery</p>
            </div>
         )}
         <button onClick={addItemToBasket} className='mt-auto button'>
            Add to basket
         </button>
      </div>
   );
}

export default Product;
