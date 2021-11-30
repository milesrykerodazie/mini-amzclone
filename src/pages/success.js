import Header from '../components/Header';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import Head from 'next/head';

function Success() {
   const router = useRouter();
   return (
      <div className='h-screen bg-gray-200'>
         <Head>
            <title>Success</title>
         </Head>
         <Header />

         <main className='max-w-screen-lg mx-auto'>
            <div className='flex flex-col p-10 bg-white'>
               <div className='flex items-center mb-5 space-x-2'>
                  <CheckCircleIcon className='h-10 text-green-500' />
                  <h1 className='text-3xl'>
                     Thank you, your order has been confirmed!!
                  </h1>
               </div>
               <p>Thank you message!!!</p>
               <button
                  onClick={() => router.push('/orders')}
                  className='mt-8 button'
               >
                  Go to my orders
               </button>
            </div>
         </main>
      </div>
   );
}

export default Success;
