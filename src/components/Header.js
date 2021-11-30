import Image from 'next/image';
import {
   MenuIcon,
   SearchIcon,
   ShoppingCartIcon,
} from '@heroicons/react/outline';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';

function Header() {
   const [session] = useSession();
   const router = useRouter();
   const items = useSelector(selectItems);

   return (
      <header className='sticky top-0 z-50'>
         <div className='flex items-center flex-grow p-1 py-2 bg-amazon_blue'>
            <div className='flex items-center flex-grow mt-2 sm:flex-grow-0'>
               <Image
                  onClick={() => router.push('/')}
                  src='https://links.papareact.com/f90'
                  width={150}
                  height={40}
                  objectFit='contain'
                  className='cursor-pointer'
               />
            </div>
            {/* search */}
            <div className='items-center flex-grow hidden h-10 bg-yellow-400 rounded-lg cursor-pointer hover:bg-yellow-500 sm:flex'>
               <input
                  type='text'
                  className='flex-grow flex-shrink w-6 h-full p-2 px-4 rounded-l-md focus:outline-none'
               />
               <SearchIcon className='h-12 p-4' />
            </div>
            {/* nav icons */}
            <div className='flex items-center mx-6 space-x-6 text-xs text-white whitespace-nowrap'>
               <div onClick={!session ? signIn : signOut} className='link'>
                  <p>{session ? `Hello, ${session.user.name}` : 'Sign In'}</p>
                  <p className='font-extrabold md:text-sm'>Accounts & Lists</p>
               </div>
               <div onClick={() => router.push('/orders')} className='link'>
                  <p>Returns</p>
                  <p className='font-extrabold md:text-sm'>Orders</p>
               </div>
               <div
                  className='relative flex items-center link'
                  onClick={() => router.push('/checkout')}
               >
                  <span className='absolute top-0 right-0 w-4 h-4 font-bold text-center text-black bg-yellow-400 rounded-full md:right-10'>
                     {items.length}
                  </span>
                  <ShoppingCartIcon className='h-10' />
                  <p className='hidden mt-2 font-extrabold md:text-sm md:inline'>
                     Basket
                  </p>
               </div>
            </div>
         </div>

         {/* bottom menu */}
         <div className='flex items-center p-2 pl-6 space-x-3 text-sm text-white bg-amazon_blue-light'>
            <p className='flex link'>
               <MenuIcon className='h-5 mr-1' />
               All
            </p>
            <p className='link whitespace-nowrap'>Prime Video</p>
            <p className='link whitespace-nowrap'>Amazon Business</p>
            <p className='link whitespace-nowrap'>Todays Deals</p>
            <p className='inline space-x-0 link whitespace-nowrap lg:hidden'>
               ...
            </p>
            <p className='hidden link whitespace-nowrap lg:inline-flex'>
               Electronics
            </p>
            <p className='hidden link whitespace-nowrap lg:inline-flex'>
               Food & Grocery
            </p>
            <p className='hidden link whitespace-nowrap lg:inline-flex'>
               Prime
            </p>
            <p className='hidden link whitespace-nowrap lg:inline-flex'>
               Buy Again
            </p>
            <p className='hidden link whitespace-nowrap lg:inline-flex'>
               Shopper Toolkit
            </p>
            <p className='hidden link whitespace-nowrap lg:inline-flex'>
               Health & Personal Care
            </p>
         </div>
      </header>
   );
}

export default Header;
