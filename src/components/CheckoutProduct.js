import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct({
  id,
  title,
  price,
  description,
  image,
  category,
  rating,
  hasPrime,
}) {
  const dispatch = useDispatch();

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

  const removeItemFromBasket = () => {
    console.log("clicked");
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className='grid grid-cols-5 mb-5'>
      <Image src={image} height={200} width={200} objectFit='contain' />
      <div className='col-span-3 mx-5'>
        <p>{title}</p>
        <div className='flex'>
          {" "}
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className='h-5 text-yellow-500' />
            ))}{" "}
        </div>
        <p className='line-clamp-3 text-xs my-2 '>{description}</p>
        <div className='mb-5'>
          <Currency quantity={price} currency='USD' />
        </div>
        {hasPrime && (
          <div className='flex items-center space-x-2 -mt-5'>
            <img
              className='w-12'
              src='https://links.papareact.com/fdw'
              alt=''
            />
            <p className='text-xs text-gray-600'>Free Next-day Delivery</p>
          </div>
        )}
      </div>

      <div className='flex flex-col space-y-2'>
        <button onClick={addItemToBasket} className='mt-auto button'>
          Add to basket
        </button>
        <button onClick={removeItemFromBasket} className='mt-auto button'>
          Remove from basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
